import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Brain, 
  Zap, 
  Shield, 
  Users, 
  Link, 
  TrendingUp, 
  BarChart3, 
  Cog, 
  Globe,
  Check,
  Star,
  ArrowRight,
  Play,
  Mail,
  Phone,
  MapPin,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { user, subscription } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [subscriptionPlans, setSubscriptionPlans] = useState<any[]>([]);
  const [isYearly, setIsYearly] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    fetchSubscriptionPlans();
  }, []);

  const fetchSubscriptionPlans = async () => {
    const { data } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .order('price_monthly', { ascending: true });
    
    if (data) {
      setSubscriptionPlans(data);
    }
  };

  const handleSubscribe = (planId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    // TODO: Implement Stripe checkout
    toast({
      title: "Wkrótce dostępne!",
      description: "Integracja Stripe będzie dodana w następnym kroku.",
    });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    toast({
      title: "Wiadomość wysłana!",
      description: "Dziękujemy za kontakt. Odpowiemy wkrótce.",
    });
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-nextai-dark/20">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-nextai-cyan/10 to-transparent animate-pulse"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-foreground">Next</span>
              <span className="text-primary">AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Twój cyfrowy partner – teraz jeszcze mądrzejszy!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => user ? navigate('/courses') : navigate('/auth')}
              >
                Poznaj możliwości
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2 h-5 w-5" />
                Zobacz film
              </Button>
            </div>
          </div>

          {/* Video Section */}
          <div id="video" className="mt-16 max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Poznaj nas bliżej – zobacz film!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why AI Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Dlaczego AI?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Poznaj zalety sztucznej inteligencji i zobacz, jak może zmienić Twój biznes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Brain className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">🧠 Inteligencja</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>- rozumie Twoje potrzeby i kontekst</li>
                <li>- analizuje dane i wyciąga wnioski</li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Zap className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">⚡ Szybkość</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>- reaguje natychmiast i precyzyjnie</li>
                <li>- automatyzuje powtarzalne zadania</li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">🔒 Bezpieczeństwo</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>- działa lokalnie lub chmurowo z pełnym szyfrowaniem</li>
                <li>- chroni Twoje dane i prywatność</li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">🤝 Wsparcie</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>- zawsze możesz liczyć na pomoc ekspertów NextAI</li>
                <li>- dedykowany opiekun klienta</li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Link className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">🔗 Integracje</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>- łatwo łączysz AI z innymi systemami i narzędziami</li>
                <li>- szybka integracja z API, ERP, CRM</li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">📈 Rozwój</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li>- Twoje AI uczy się i rozwija razem z Twoją firmą</li>
                <li>- skalowalność i elastyczność rozwiązań</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Co dają Agenci AI?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Analiza i Wnioskowanie</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Agent NextAI przetwarza dane szybciej niż człowiek</p>
                <p>Wyciąga wnioski, które mogą umknąć Twojej uwadze.</p>
                <p className="font-semibold text-primary">Nie musisz się martwić o błędy!</p>
              </div>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <Cog className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">W pełni zautomatyzowane procesy</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Bez klikania, bez stresu</p>
                <p>NextAI wykonuje powtarzalne zadania za Ciebie.</p>
                <p className="font-semibold text-primary">Nie tracisz czasu na nudne rzeczy!</p>
              </div>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Integracja bez granic</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Z systemami ERP, CRM, API</p>
                <p>NextAI pasuje wszędzie, gdzie tylko chcesz.</p>
                <p className="font-semibold text-primary">Nie musisz się martwić o problemy z integracją!</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="packages" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Rodzaje pakietów</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Wybierz pakiet, który najlepiej odpowiada Twoim potrzebom. 
              Każdy z nich oferuje różne funkcjonalności i wsparcie.
            </p>
            
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`${!isYearly ? 'text-primary' : 'text-muted-foreground'}`}>Miesięcznie</span>
              <Button
                variant="outline"
                onClick={() => setIsYearly(!isYearly)}
                className="relative"
              >
                <div className={`w-12 h-6 rounded-full transition-colors ${isYearly ? 'bg-primary' : 'bg-muted'}`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${isYearly ? 'translate-x-6' : ''}`} />
                </div>
              </Button>
              <span className={`${isYearly ? 'text-primary' : 'text-muted-foreground'}`}>Rocznie</span>
              {isYearly && <Badge variant="secondary">Oszczędzasz do 20%</Badge>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subscriptionPlans.map((plan, index) => (
              <Card key={plan.id} className={`relative p-8 ${index === 1 ? 'border-primary shadow-lg scale-105' : ''}`}>
                {index === 1 && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Najczęściej wybierany pakiet
                  </Badge>
                )}
                {plan.name === 'Enterprise' && (
                  <div className="absolute -top-3 right-4">
                    <span className="text-2xl">👑</span>
                  </div>
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
                          {Math.floor((isYearly ? plan.price_yearly : plan.price_monthly) / 100)} PLN
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
                    variant={index === 1 ? "default" : "outline"}
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    {plan.name === 'Enterprise' ? 'Skontaktuj się z nami' : 'Wybierz subskrypcję'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Nie wiesz, który pakiet będzie najlepszy lub masz inne pytania?
            </p>
            <p className="text-foreground">
              🤖 <strong>Zapytaj naszego chatbota</strong> klikając ikonę 💬 w prawym dolnym rogu 
              lub <strong>skontaktuj się z nami</strong> w formularzu poniżej!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Skontaktuj się z nami</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Masz pytania? Chcesz dowiedzieć się więcej? Napisz do nas!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Imię
                  </label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Twoje imię"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="twoj@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Wiadomość
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Opisz swoje potrzeby..."
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Wyślij wiadomość
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <Mail className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">hello@next-ai.pl</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <Phone className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Telefon</h3>
                    <p className="text-muted-foreground">+48 123 456 789</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <MapPin className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Adres</h3>
                    <p className="text-muted-foreground">
                      ul. Przykładowa 123<br />
                      00-001 Warszawa
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <MessageCircle className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Chatbot</h3>
                    <p className="text-muted-foreground">
                      Kliknij ikonę 💬 w prawym dolnym rogu, aby porozmawiać z naszym AI
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-shadow"
          onClick={() => toast({
            title: "NextAI Asystent",
            description: "Chatbot będzie dostępny wkrótce!",
          })}
        >
          💬
        </Button>
      </div>
    </div>
  );
};

export default Index;
