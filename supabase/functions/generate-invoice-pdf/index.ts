import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { DOMParser, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GENERATE-INVOICE-PDF] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Initialize Supabase client with service role key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");

    const { invoiceId } = await req.json();
    if (!invoiceId) throw new Error("Invoice ID is required");

    logStep("Fetching invoice data", { invoiceId });

    // Fetch invoice data
    const { data: invoice, error: invoiceError } = await supabaseClient
      .from("invoices")
      .select(`
        *,
        profiles!invoices_user_id_fkey(full_name, email)
      `)
      .eq("id", invoiceId)
      .single();

    if (invoiceError) throw new Error(`Failed to fetch invoice: ${invoiceError.message}`);
    if (!invoice) throw new Error("Invoice not found");

    // Check if user owns this invoice or is admin
    const { data: profile } = await supabaseClient
      .from("profiles")
      .select("is_admin")
      .eq("user_id", user.id)
      .single();

    if (invoice.user_id !== user.id && !profile?.is_admin) {
      throw new Error("Unauthorized access to invoice");
    }

    logStep("Generating PDF content");

    // Generate HTML for PDF conversion
    const htmlContent = generateInvoiceHTML(invoice);
    
    // Simple PDF generation using HTML
    const pdfResponse = await generatePDFFromHTML(htmlContent);
    
    // Save PDF URL back to invoice
    const pdfUrl = `data:application/pdf;base64,${btoa(pdfResponse)}`;
    
    await supabaseClient
      .from("invoices")
      .update({ pdf_url: pdfUrl })
      .eq("id", invoiceId);

    logStep("PDF generated successfully");

    return new Response(JSON.stringify({ 
      success: true, 
      pdf_url: pdfUrl,
      invoice_number: invoice.invoice_number 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in generate-invoice-pdf", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

function generateInvoiceHTML(invoice: any): string {
  const lineItems = Array.isArray(invoice.line_items) ? invoice.line_items : [];
  const customerName = invoice.profiles?.full_name || 'N/A';
  const customerEmail = invoice.profiles?.email || 'N/A';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Faktura ${invoice.invoice_number}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        .header { text-align: center; margin-bottom: 40px; }
        .company-info { margin-bottom: 30px; }
        .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .customer-info { margin-bottom: 30px; }
        .line-items { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .line-items th, .line-items td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .line-items th { background-color: #f5f5f5; font-weight: bold; }
        .totals { text-align: right; margin-bottom: 30px; }
        .total-row { margin: 5px 0; }
        .final-total { font-weight: bold; font-size: 1.2em; }
        .footer { margin-top: 40px; font-size: 0.9em; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>FAKTURA</h1>
        <h2>${invoice.invoice_number}</h2>
      </div>
      
      <div class="company-info">
        <strong>Twoja Firma</strong><br>
        ul. Przykładowa 123<br>
        00-000 Warszawa<br>
        NIP: 123-456-78-90
      </div>
      
      <div class="invoice-details">
        <div>
          <strong>Data wystawienia:</strong> ${new Date(invoice.issue_date).toLocaleDateString('pl-PL')}<br>
          <strong>Termin płatności:</strong> ${new Date(invoice.due_date).toLocaleDateString('pl-PL')}<br>
          <strong>Status:</strong> ${invoice.status.toUpperCase()}
        </div>
      </div>
      
      <div class="customer-info">
        <strong>Nabywca:</strong><br>
        ${customerName}<br>
        ${customerEmail}
        ${invoice.billing_address ? `<br>${JSON.stringify(invoice.billing_address)}` : ''}
      </div>
      
      <table class="line-items">
        <thead>
          <tr>
            <th>Opis</th>
            <th>Ilość</th>
            <th>Cena jednostkowa</th>
            <th>Wartość netto</th>
            <th>VAT</th>
            <th>Wartość brutto</th>
          </tr>
        </thead>
        <tbody>
          ${lineItems.map((item: any) => `
            <tr>
              <td>${item.description || 'Subskrypcja'}</td>
              <td>${item.quantity || 1}</td>
              <td>${((item.unit_price || invoice.net_amount) / 100).toFixed(2)} PLN</td>
              <td>${(invoice.net_amount / 100).toFixed(2)} PLN</td>
              <td>${(invoice.tax_amount / 100).toFixed(2)} PLN</td>
              <td>${(invoice.amount / 100).toFixed(2)} PLN</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="totals">
        <div class="total-row">Suma netto: ${(invoice.net_amount / 100).toFixed(2)} PLN</div>
        <div class="total-row">VAT (23%): ${(invoice.tax_amount / 100).toFixed(2)} PLN</div>
        <div class="total-row final-total">Do zapłaty: ${(invoice.amount / 100).toFixed(2)} PLN</div>
      </div>
      
      <div class="footer">
        <p>Dziękujemy za skorzystanie z naszych usług!</p>
        ${invoice.notes ? `<p><strong>Uwagi:</strong> ${invoice.notes}</p>` : ''}
      </div>
    </body>
    </html>
  `;
}

async function generatePDFFromHTML(html: string): Promise<string> {
  // For a simple implementation, we'll return base64 encoded HTML
  // In production, you'd use a proper PDF generation service like Puppeteer
  const encoder = new TextEncoder();
  const data = encoder.encode(html);
  return btoa(String.fromCharCode.apply(null, Array.from(data)));
}