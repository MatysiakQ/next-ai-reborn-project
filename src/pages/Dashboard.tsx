import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { LogOut, Settings, BookOpen, User, CreditCard, Receipt, FileText, Crown, Calendar } from "lucide-react";

const Dashboard = () => {
  const { user, profile, subscription, loading, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [portalLoading, setPortalLoading] = useState(false);

  // Redirect if not logged in
  if (!user && !loading) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się otworzyć portalu zarządzania subskrypcją",
        variant: "destructive",
      });
    } finally {
      setPortalLoading(false);
    }
  };

  const getSubscriptionStatus = () => {
    if (!subscription || !subscription.is_subscribed) {
      return { status: 'Brak subskrypcji', color: 'secondary', description: 'Wykup plan aby uzyskać dostęp do kursów' };
    }
    
    if (subscription.status === 'active') {
      return { 
        status: subscription.subscription_plan?.name || 'Aktywna', 
        color: 'default', 
        description: `Aktywna do ${subscription.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString('pl-PL') : 'N/A'}` 
      };
    }
    
    return { status: 'Nieaktywna', color: 'destructive', description: 'Subskrypcja wymaga odnowienia' };
  };

  const subscriptionInfo = getSubscriptionStatus();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Witaj, {profile?.full_name || user?.email}</h1>
              <p className="text-muted-foreground">Zarządzaj swoim uczeniem</p>
            </div>
          </div>
          
          <Button variant="outline" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Wyloguj
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subscription Status */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Crown className="h-5 w-5 text-primary" />
                    <CardTitle>Status subskrypcji</CardTitle>
                  </div>
                  <Badge variant={subscriptionInfo.color as any}>
                    {subscriptionInfo.status}
                  </Badge>
                </div>
                <CardDescription>{subscriptionInfo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscription?.is_subscribed ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Plan: {subscription.subscription_plan?.name}</span>
                        <span>{subscription.subscription_plan?.price_monthly}zł/miesiąc</span>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={handleManageSubscription}
                        disabled={portalLoading}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        {portalLoading ? 'Ładowanie...' : 'Zarządzaj subskrypcją'}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Wykup plan aby uzyskać dostęp do wszystkich kursów AI
                      </p>
                      <Link to="/#packages">
                        <Button>
                          <Crown className="mr-2 h-4 w-4" />
                          Wybierz plan
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Postęp</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Ukończone kursy</span>
                  <span>0/10</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Czas nauki</span>
                  <span>0h</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Kontynuuj naukę aby poprawić swoje statystyki
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Ostatnie aktywności</span>
              </CardTitle>
              <CardDescription>Twoja historia nauki</CardDescription>
            </CardHeader>
            <CardContent>
              {subscription?.is_subscribed ? (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Zacznij swoją przygodę z AI</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      onClick={() => navigate('/courses')}
                      className="w-full"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Przeglądaj kursy
                    </Button>

                    <Button
                      onClick={() => navigate('/payment-history')}
                      variant="outline"
                      className="w-full"
                    >
                      <Receipt className="mr-2 h-4 w-4" />
                      Historia płatności
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Crown className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Wykup plan aby rozpocząć naukę
                  </p>
                  <Link to="/#packages">
                    <Button>
                      Zobacz plany
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Szybkie akcje</CardTitle>
              <CardDescription>Najczęściej używane funkcje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => navigate('/payment-history')}
                  variant="outline"
                  className="flex items-center justify-center gap-2 h-16"
                >
                  <FileText className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Faktury</div>
                    <div className="text-sm text-muted-foreground">Pobierz faktury</div>
                  </div>
                </Button>
                
                <Button
                  onClick={() => navigate('/courses')}
                  variant="outline"
                  className="flex items-center justify-center gap-2 h-16"
                >
                  <BookOpen className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Kursy</div>
                    <div className="text-sm text-muted-foreground">Kontynuuj naukę</div>
                  </div>
                </Button>

                {profile?.is_admin && (
                  <Button
                    onClick={() => navigate('/admin')}
                    variant="outline"
                    className="flex items-center justify-center gap-2 h-16"
                  >
                    <Settings className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Admin</div>
                      <div className="text-sm text-muted-foreground">Panel administracyjny</div>
                    </div>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;