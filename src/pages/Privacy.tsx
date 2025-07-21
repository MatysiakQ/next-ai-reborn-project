import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Cookie, Database, Mail, Lock } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Polityka Prywatności</h1>
          <p className="text-lg text-muted-foreground">
            Ostatnia aktualizacja: 21 lipca 2024
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Wprowadzenie</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none dark:prose-invert">
            <p>
              W NextAI szanujemy Twoją prywatność i zobowiązujemy się do ochrony Twoich danych osobowych. 
              Niniejsza Polityka Prywatności wyjaśnia, jak zbieramy, używamy, przechowujemy i chronimy Twoje informacje 
              podczas korzystania z naszej platformy edukacyjnej.
            </p>
            <p>
              Korzystając z naszych usług, wyrażasz zgodę na zbieranie i wykorzystywanie informacji zgodnie z niniejszą polityką.
            </p>
          </CardContent>
        </Card>

        {/* Data Collection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Jakie dane zbieramy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Dane identyfikacyjne:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Imię i nazwisko</li>
                <li>Adres email</li>
                <li>Numer telefonu (opcjonalnie)</li>
                <li>Informacje o profilu użytkownika</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Dane techniczne:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Adres IP</li>
                <li>Typ przeglądarki i system operacyjny</li>
                <li>Dane o aktywności na platformie</li>
                <li>Preferencje użytkownika</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Dane płatności:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Informacje o transakcjach (poprzez Stripe)</li>
                <li>Historia płatności</li>
                <li>Status subskrypcji</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Data */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <span>Jak wykorzystujemy Twoje dane</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Świadczenie usług:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Tworzenie i zarządzanie kontem użytkownika</li>
                  <li>Dostęp do kursów i materiałów edukacyjnych</li>
                  <li>Śledzenie postępów w nauce</li>
                  <li>Przetwarzanie płatności</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Komunikacja:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Wysyłanie powiadomień o kursach</li>
                  <li>Wsparcie techniczne</li>
                  <li>Informacje o nowych funkcjach</li>
                  <li>Newsletter (za zgodą)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Ulepszanie usług:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Analiza korzystania z platformy</li>
                  <li>Personalizacja treści</li>
                  <li>Rozwijanie nowych funkcji</li>
                  <li>Zapewnienie bezpieczeństwa</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Cookie className="h-5 w-5" />
              <span>Cookies i technologie śledzące</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Używamy cookies i podobnych technologii do poprawy funkcjonalności naszej platformy:
            </p>
            <div className="space-y-3">
              <div>
                <strong>Cookies niezbędne:</strong> Potrzebne do podstawowego działania strony (logowanie, preferencje)
              </div>
              <div>
                <strong>Cookies analityczne:</strong> Pomagają nam zrozumieć, jak użytkownicy korzystają z platformy
              </div>
              <div>
                <strong>Cookies funkcjonalne:</strong> Zapisują Twoje preferencje i ustawienia
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Sharing */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Udostępnianie danych</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Nie sprzedajemy ani nie wynajmujemy Twoich danych osobowych. Możemy udostępniać dane jedynie w następujących przypadkach:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Dostawcom usług (np. Stripe do przetwarzania płatności)</li>
              <li>Gdy wymagane jest to prawem</li>
              <li>Za Twoją wyraźną zgodą</li>
              <li>W celu ochrony naszych praw i bezpieczeństwa</li>
            </ul>
          </CardContent>
        </Card>

        {/* User Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Twoje prawa</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Zgodnie z RODO masz prawo do:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Dostępu do swoich danych</li>
                <li>Sprostowania danych</li>
                <li>Usunięcia danych</li>
                <li>Ograniczenia przetwarzania</li>
              </ul>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Przenoszenia danych</li>
                <li>Sprzeciwu wobec przetwarzania</li>
                <li>Wycofania zgody</li>
                <li>Złożenia skargi do UODO</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Bezpieczeństwo danych</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Implementujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Szyfrowanie danych podczas przesyłania (SSL/TLS)</li>
              <li>Szyfrowanie danych wrażliwych w bazie danych</li>
              <li>Regularne kopie zapasowe</li>
              <li>Kontrola dostępu do danych</li>
              <li>Monitorowanie bezpieczeństwa</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Kontakt</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Jeśli masz pytania dotyczące niniejszej Polityki Prywatności lub chcesz skorzystać ze swoich praw, skontaktuj się z nami:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Email:</strong> privacy@next-ai.pl</p>
              <p><strong>Adres:</strong> ul. Przykładowa 123, 00-001 Warszawa</p>
              <p><strong>Telefon:</strong> +48 123 456 789</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;