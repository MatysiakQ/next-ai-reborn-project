import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeLanguage } from "@/contexts/ThemeLanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Download, Eye, RefreshCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingSpinner from '@/components/ui/loading-spinner';
import ErrorMessage from '@/components/ui/error-message';
import EmptyState from '@/components/ui/empty-state';
import { useAsyncOperation } from '@/hooks/useAsyncOperation';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  payment_type: string;
  description: string;
  invoice_number: string;
  invoice_url: string;
  created_at: string;
}

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  currency: string;
  status: string;
  issue_date: string;
  due_date: string;
  pdf_url: string;
  created_at: string;
}

export default function PaymentHistory() {
  const { user } = useAuth();
  const { t } = useThemeLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [activeTab, setActiveTab] = useState<'payments' | 'invoices'>('payments');

  const { execute: fetchData, loading, error } = useAsyncOperation(
    async () => {
      // Fetch payments
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (paymentsError) throw paymentsError;

      // Fetch invoices
      const { data: invoicesData, error: invoicesError } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (invoicesError) throw invoicesError;

      setPayments(paymentsData || []);
      setInvoices(invoicesData || []);
    },
    {
      errorMessage: "Nie udało się pobrać historii płatności"
    }
  );

  const { execute: generatePDF, loading: pdfLoading } = useAsyncOperation(
    async (invoiceId: string) => {
      const { data, error } = await supabase.functions.invoke('generate-invoice-pdf', {
        body: { invoiceId }
      });

      if (error) throw error;

      toast({
        title: "Sukces",
        description: "Faktura PDF została wygenerowana",
      });

      // Refresh data to get updated PDF URL
      await fetchData();
    },
    {
      successMessage: "Faktura PDF została wygenerowana",
      errorMessage: "Nie udało się wygenerować faktury PDF"
    }
  );

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const downloadInvoice = (invoiceUrl: string, invoiceNumber: string) => {
    if (invoiceUrl.startsWith('data:')) {
      // Create download link for base64 data
      const link = document.createElement('a');
      link.href = invoiceUrl;
      link.download = `faktura-${invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Open URL in new tab
      window.open(invoiceUrl, '_blank');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      succeeded: { label: "Opłacone", variant: "default" as const },
      pending: { label: "Oczekujące", variant: "secondary" as const },
      failed: { label: "Nieudane", variant: "destructive" as const },
      canceled: { label: "Anulowane", variant: "outline" as const },
      paid: { label: "Opłacone", variant: "default" as const },
      draft: { label: "Szkic", variant: "secondary" as const },
      sent: { label: "Wysłane", variant: "outline" as const },
      overdue: { label: "Przeterminowane", variant: "destructive" as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: "outline" as const };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatAmount = (amount: number, currency: string = 'PLN') => {
    return `${(amount / 100).toFixed(2)} ${currency}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL');
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót do Dashboard
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Historia Płatności</h1>
              <p className="text-muted-foreground">
                Przejrzyj historię swoich płatności i pobierz faktury
              </p>
            </div>
            <Button onClick={fetchData} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Odśwież
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === 'payments' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('payments')}
            >
              Płatności ({payments.length})
            </Button>
            <Button
              variant={activeTab === 'invoices' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('invoices')}
            >
              Faktury ({invoices.length})
            </Button>
          </div>
        </div>

        {loading ? (
          <Card>
            <CardContent className="flex items-center justify-center py-8">
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Ładowanie...
            </CardContent>
          </Card>
        ) : (
          <>
            {activeTab === 'payments' && (
              <Card>
                <CardHeader>
                  <CardTitle>Historia Płatności</CardTitle>
                  <CardDescription>
                    Wszystkie Twoje płatności i transakcje
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {payments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Nie znaleziono żadnych płatności
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Opis</TableHead>
                          <TableHead>Typ</TableHead>
                          <TableHead>Kwota</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Faktura</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell>{formatDate(payment.created_at)}</TableCell>
                            <TableCell>{payment.description || 'Płatność'}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {payment.payment_type === 'subscription' ? 'Subskrypcja' : 
                                 payment.payment_type === 'one_time' ? 'Jednorazowa' : 
                                 payment.payment_type}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatAmount(payment.amount, payment.currency)}</TableCell>
                            <TableCell>{getStatusBadge(payment.status)}</TableCell>
                            <TableCell>
                              {payment.invoice_number && (
                                <span className="text-sm text-muted-foreground">
                                  {payment.invoice_number}
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === 'invoices' && (
              <Card>
                <CardHeader>
                  <CardTitle>Faktury</CardTitle>
                  <CardDescription>
                    Pobierz i zarządzaj swoimi fakturami
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {invoices.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Nie znaleziono żadnych faktur
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Numer faktury</TableHead>
                          <TableHead>Data wystawienia</TableHead>
                          <TableHead>Termin płatności</TableHead>
                          <TableHead>Kwota</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Akcje</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">
                              {invoice.invoice_number}
                            </TableCell>
                            <TableCell>{formatDate(invoice.issue_date)}</TableCell>
                            <TableCell>{formatDate(invoice.due_date)}</TableCell>
                            <TableCell>{formatAmount(invoice.amount, invoice.currency)}</TableCell>
                            <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                {invoice.pdf_url ? (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => downloadInvoice(invoice.pdf_url, invoice.invoice_number)}
                                  >
                                    <Download className="h-4 w-4 mr-1" />
                                    PDF
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => generatePDF(invoice.id)}
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    Generuj PDF
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}