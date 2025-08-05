import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeLanguage } from '@/contexts/ThemeLanguageContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly?: number;
  features: any;
  stripe_price_id_monthly?: string;
  stripe_price_id_yearly?: string;
}

const SubscriptionPlans = () => {
  const { user, subscription } = useAuth();
  const { t } = useThemeLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly', { ascending: true });

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się załadować planów subskrypcji",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Check if user already has this subscription
    if (subscription?.is_subscribed && subscription.subscription_plan_id === plan.id) {
      toast({
        title: "Już masz tę subskrypcję",
        description: "Przejdź do panelu użytkownika aby zarządzać swoją subskrypcją",
      });
      navigate('/dashboard');
      return;
    }

    if (plan.name === 'Enterprise') {
      // Scroll to contact form for Enterprise plan
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const priceId = isYearly ? plan.stripe_price_id_yearly : plan.stripe_price_id_monthly;
    if (!priceId) {
      toast({
        title: "Błąd",
        description: "Ten plan nie ma skonfigurowanej ceny",
        variant: "destructive"
      });
      return;
    }

    setCheckoutLoading(plan.id);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Błąd płatności",
        description: "Nie udało się utworzyć sesji płatności. Spróbuj ponownie.",
        variant: "destructive"
      });
    } finally {
      setCheckoutLoading(null);
    }
  };

  const getCurrentUserPlan = () => {
    if (!subscription?.is_subscribed) return null;
    return plans.find(plan => plan.id === subscription.subscription_plan_id);
  };

  const currentPlan = getCurrentUserPlan();

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className={`font-mono transition-colors ${!isYearly ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
          {t('pricing.monthly')}
        </span>
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-14 h-7 p-0 border-2 transition-all ${
              isYearly ? 'border-primary bg-primary/10' : 'border-muted-foreground bg-muted/50'
            }`}
          >
            <div 
              className={`absolute w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
                isYearly ? 'translate-x-3.5' : 'translate-x-0.5'
              }`} 
            />
          </Button>
        </div>
        <span className={`font-mono transition-colors ${isYearly ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
          {t('pricing.yearly')}
        </span>
        {isYearly && (
          <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700 border-green-200">
            {t('pricing.save')}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const isCurrentPlan = currentPlan?.id === plan.id;
          const isPopular = index === 1;
          const price = isYearly ? plan.price_yearly : plan.price_monthly;
          
          return (
            <Card 
              key={plan.id} 
              className={`relative p-8 transition-all duration-300 hover:scale-105 ${
                isPopular ? 'border-primary shadow-lg scale-105' : ''
              } ${isCurrentPlan ? 'ring-2 ring-primary' : ''}`}
            >
              {isPopular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  {t('pricing.popular')}
                </Badge>
              )}
              
              {plan.name === 'Enterprise' && (
                <div className="absolute -top-3 right-4">
                  <span className="text-2xl">👑</span>
                </div>
              )}

              {isCurrentPlan && (
                <Badge variant="secondary" className="absolute -top-3 right-4">
                  {t('pricing.current')}
                </Badge>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold">
                    {plan.name === 'Enterprise' ? (
                      'Indywidualna wycena'
                    ) : (
                      <>
                        {Math.floor((price || 0) / 100)} PLN
                        <span className="text-lg font-normal text-muted-foreground">/msc</span>
                      </>
                    )}
                  </div>
                  {isYearly && plan.price_yearly && plan.name !== 'Enterprise' && (
                    <div className="text-sm text-muted-foreground">
                      Oszczędzasz {Math.floor(((plan.price_monthly * 12 - plan.price_yearly) / 100))} PLN rocznie
                    </div>
                  )}
                </div>

                <ul className="space-y-3">
                  {(plan.features as string[]).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={isPopular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan)}
                  disabled={checkoutLoading === plan.id || isCurrentPlan}
                >
                  {checkoutLoading === plan.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('pricing.redirecting')}
                    </>
                  ) : isCurrentPlan ? (
                    t('pricing.current')
                  ) : plan.name === 'Enterprise' ? (
                    t('pricing.contact')
                  ) : (
                    t('pricing.choose')
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPlans;