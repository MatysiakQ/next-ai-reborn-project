import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, AlertTriangle, CreditCard, Shield, BookOpen, Users } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Regulamin</h1>
          <p className="text-lg text-muted-foreground">
            Ostatnia aktualizacja: 21 lipca 2024
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Postanowienia ogólne</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Niniejszy Regulamin określa zasady korzystania z platformy NextAI, dostępnej pod adresem next-ai.pl, 
              świadczącej usługi edukacyjne w zakresie sztucznej inteligencji.
            </p>
            <p className="text-muted-foreground">
              Korzystając z naszej platformy, akceptujesz niniejszy Regulamin w całości. 
              Jeśli nie zgadzasz się z którymikolwiek z postanowień, nie korzystaj z naszych usług.
            </p>
          </CardContent>
        </Card>

        {/* Definitions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Definicje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <strong>Platforma:</strong> Serwis internetowy NextAI dostępny pod adresem next-ai.pl
              </div>
              <div>
                <strong>Usługodawca:</strong> NextAI Sp. z o.o. z siedzibą w Warszawie
              </div>
              <div>
                <strong>Użytkownik:</strong> Osoba fizyczna lub prawna korzystająca z Platformy
              </div>
              <div>
                <strong>Konto:</strong> Zbiór danych i ustawień utworzony dla Użytkownika
              </div>
              <div>
                <strong>Kurs:</strong> Materiały edukacyjne dostępne na Platformie
              </div>
              <div>
                <strong>Subskrypcja:</strong> Płatny dostęp do premium funkcji Platformy
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Registration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Rejestracja i konto użytkownika</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Warunki rejestracji:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Użytkownik musi być pełnoletni lub posiadać zgodę opiekuna prawnego</li>
                <li>Podane dane muszą być prawdziwe i aktualne</li>
                <li>Jeden Użytkownik może posiadać tylko jedno konto</li>
                <li>Hasło musi spełniać wymagania bezpieczeństwa</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Odpowiedzialność Użytkownika:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Zachowanie poufności danych logowania</li>
                <li>Natychmiastowe zgłaszanie nieautoryzowanego dostępu</li>
                <li>Aktualizowanie danych kontaktowych</li>
                <li>Odpowiedzialność za działania na swoim koncie</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Zakres usług</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Usługi bezpłatne:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Dostęp do wybranych kursów podstawowych</li>
                <li>Podstawowe materiały edukacyjne</li>
                <li>Utworzenie konta użytkownika</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Usługi płatne (subskrypcja):</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Dostęp do wszystkich kursów premium</li>
                <li>Zaawansowane narzędzia AI</li>
                <li>Certyfikaty ukończenia</li>
                <li>Wsparcie priorytetowe</li>
                <li>Materiały do pobrania</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Payment Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Płatności i subskrypcje</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Zasady płatności:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Płatności przetwarzane są przez Stripe</li>
                <li>Ceny podane są w złotych polskich (PLN) brutto</li>
                <li>Subskrypcja odnawia się automatycznie</li>
                <li>Możliwość anulowania w każdej chwili</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Prawo odstąpienia:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>14 dni na odstąpienie od umowy (konsumenci)</li>
                <li>Zwrot pełnej kwoty przy anulowaniu w okresie próbnym</li>
                <li>Proporcjonalny zwrot przy anulowaniu w trakcie okresu</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Własność intelektualna</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Prawa Usługodawcy:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Wszystkie materiały na Platformie są chronione prawem autorskim</li>
                <li>Znaki towarowe NextAI są własnością Usługodawcy</li>
                <li>Zabronione jest kopiowanie, dystrybucja bez zgody</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Dozwolone użycie:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Osobiste, niekomercyjne korzystanie z materiałów</li>
                <li>Pobieranie w ramach funkcji platformy</li>
                <li>Udostępnianie linków do kursów (nie materiałów)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Prohibited Activities */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Zakazane działania</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Użytkownik zobowiązuje się nie podejmować następujących działań:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Naruszanie praw autorskich i własności intelektualnej</li>
              <li>Próby włamania lub naruszenia bezpieczeństwa</li>
              <li>Dystrybucja złośliwego oprogramowania</li>
              <li>Udostępnianie danych logowania osobom trzecim</li>
              <li>Tworzenie fałszywych kont</li>
              <li>Spam i niechciane komunikaty</li>
              <li>Działania niezgodne z prawem</li>
            </ul>
          </CardContent>
        </Card>

        {/* Liability */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Odpowiedzialność</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Ograniczenie odpowiedzialności:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Usługodawca nie gwarantuje nieprzerwanego działania Platformy</li>
                <li>Nie ponosimy odpowiedzialności za działania użytkowników</li>
                <li>Odpowiedzialność ograniczona do wysokości opłat za subskrypcję</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Siła wyższa:</h3>
              <p className="text-muted-foreground">
                Usługodawca nie ponosi odpowiedzialności za niewykonanie zobowiązań z powodu siły wyższej, 
                w tym awarii systemów, problemów z internetem, działań władz publicznych.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Changes and Termination */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Zmiany i rozwiązanie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Zmiany Regulaminu:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Usługodawca może zmieniać Regulamin z ważnych przyczyn</li>
                <li>O zmianach informujemy z 30-dniowym wyprzedzeniem</li>
                <li>Brak sprzeciwu oznacza akceptację zmian</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Rozwiązanie umowy:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Użytkownik może usunąć konto w każdej chwili</li>
                <li>Usługodawca może zawiesić konto za naruszenie Regulaminu</li>
                <li>Po rozwiązaniu dane mogą być przechowywane zgodnie z prawem</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Final Provisions */}
        <Card>
          <CardHeader>
            <CardTitle>Postanowienia końcowe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Prawo właściwe:</h3>
              <p className="text-muted-foreground">
                Do niniejszego Regulaminu stosuje się prawo polskie. 
                Sądem właściwym dla rozstrzygania sporów jest sąd właściwy dla siedziby Usługodawcy.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Kontakt:</h3>
              <div className="space-y-1 text-muted-foreground">
                <p><strong>NextAI Sp. z o.o.</strong></p>
                <p>ul. Przykładowa 123, 00-001 Warszawa</p>
                <p>Email: legal@next-ai.pl</p>
                <p>Telefon: +48 123 456 789</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;