import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Webhook started");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const signature = req.headers.get("stripe-signature");
    const body = await req.text();
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    if (!signature || !webhookSecret) {
      throw new Error("Missing signature or webhook secret");
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    logStep("Event verified", { type: event.type, id: event.id });

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        logStep("Processing subscription event", { 
          subscriptionId: subscription.id, 
          customerId: subscription.customer,
          status: subscription.status 
        });

        // Get customer email
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        if (!customer || customer.deleted) {
          throw new Error("Customer not found");
        }

        const customerEmail = (customer as Stripe.Customer).email;
        if (!customerEmail) {
          throw new Error("Customer email not found");
        }

        // Find user by email
        const { data: profiles, error: profileError } = await supabaseClient
          .from('profiles')
          .select('user_id')
          .eq('email', customerEmail)
          .single();

        if (profileError || !profiles) {
          logStep("Profile not found", { email: customerEmail });
          throw new Error("User profile not found");
        }

        // Get subscription plan by price ID
        const priceId = subscription.items.data[0].price.id;
        const { data: plans, error: planError } = await supabaseClient
          .from('subscription_plans')
          .select('id')
          .or(`stripe_price_id_monthly.eq.${priceId},stripe_price_id_yearly.eq.${priceId}`)
          .single();

        if (planError || !plans) {
          logStep("Subscription plan not found", { priceId });
          throw new Error("Subscription plan not found");
        }

        // Upsert user subscription
        const { error: upsertError } = await supabaseClient
          .from('user_subscriptions')
          .upsert({
            user_id: profiles.user_id,
            subscription_plan_id: plans.id,
            stripe_customer_id: subscription.customer as string,
            stripe_subscription_id: subscription.id,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            is_subscribed: subscription.status === 'active',
          }, {
            onConflict: 'user_id'
          });

        if (upsertError) {
          logStep("Error upserting subscription", { error: upsertError });
          throw upsertError;
        }

        logStep("Subscription updated successfully", { 
          userId: profiles.user_id, 
          status: subscription.status 
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        logStep("Processing subscription deletion", { subscriptionId: subscription.id });

        // Mark subscription as inactive
        const { error: updateError } = await supabaseClient
          .from('user_subscriptions')
          .update({
            status: 'cancelled',
            is_subscribed: false,
          })
          .eq('stripe_subscription_id', subscription.id);

        if (updateError) {
          logStep("Error updating subscription", { error: updateError });
          throw updateError;
        }

        logStep("Subscription cancelled successfully", { subscriptionId: subscription.id });
        break;
      }

      default:
        logStep("Unhandled event type", { type: event.type });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in webhook", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});