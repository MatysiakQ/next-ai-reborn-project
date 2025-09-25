import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeLanguage } from '@/contexts/ThemeLanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Settings as SettingsIcon, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageToggle } from '@/components/ui/language-toggle';

const Settings = () => {
  const { user, profile, loading, refreshProfile } = useAuth();
  const { t } = useThemeLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    email: profile?.email || user?.email || ''
  });
  const [updating, setUpdating] = useState(false);

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

  const handleSave = async () => {
    if (!profile) return;
    
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName
        })
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: "Sukces",
        description: "Ustawienia zostały zapisane",
      });

      await refreshProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się zapisać ustawień",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót do Dashboard
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <SettingsIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Ustawienia</h1>
              <p className="text-muted-foreground">Zarządzaj swoim kontem i preferencjami</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <CardTitle>Profil użytkownika</CardTitle>
              </div>
              <CardDescription>
                Zarządzaj podstawowymi informacjami o swoim koncie
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Imię i nazwisko</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Wprowadź swoje imię i nazwisko"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={formData.email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Email nie może być zmieniony
                </p>
              </div>

              <Button 
                onClick={handleSave}
                disabled={updating}
                className="w-full sm:w-auto"
              >
                <Save className="mr-2 h-4 w-4" />
                {updating ? 'Zapisywanie...' : 'Zapisz zmiany'}
              </Button>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Wygląd i język</CardTitle>
              <CardDescription>
                Dostosuj wygląd aplikacji i wybierz preferowany język
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Motyw</p>
                    <p className="text-sm text-muted-foreground">Przełącz między jasnym a ciemnym motywem</p>
                  </div>
                  <ThemeToggle />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Język</p>
                    <p className="text-sm text-muted-foreground">Wybierz język interfejsu</p>
                  </div>
                  <LanguageToggle />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informacje o koncie</CardTitle>
              <CardDescription>
                Szczegóły twojego konta i subskrypcji
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Data utworzenia</p>
                  <p className="font-medium">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('pl-PL') : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">ID użytkownika</p>
                  <p className="font-medium font-mono text-xs">
                    {user?.id.slice(0, 8)}...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;