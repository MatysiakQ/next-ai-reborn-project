import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  Zap, 
  Clock, 
  DollarSign, 
  BarChart3, 
  Mail, 
  MessageSquare, 
  Calendar,
  Database,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useThemeLanguage } from "@/contexts/ThemeLanguageContext";

const Automations = () => {
  const navigate = useNavigate();
  const { t } = useThemeLanguage();

  const automationCategories = [
    {
      title: "Automatyzacja Sprzedaży",
      icon: <DollarSign className="h-8 w-8" />,
      description: "Zautomatyzuj proces sprzedaży od leada do konwersji",
      bots: [
        {
          name: "Lead Qualifier Bot",
          description: "Automatycznie kwalifikuje leady i przypisuje punkty jakości",
          features: ["Scoring leadów", "Automatyczna segmentacja", "Integracja z CRM"]
        },
        {
          name: "Follow-up Automation",
          description: "Automatyczne follow-up z potencjalnymi klientami",
          features: ["Personalizowane wiadomości", "Timing optymalny", "A/B testing"]
        }
      ]
    },
    {
      title: "Automatyzacja Marketingu",
      icon: <BarChart3 className="h-8 w-8" />,
      description: "Zoptymalizuj kampanie marketingowe z pomocą AI",
      bots: [
        {
          name: "Content Generator Bot",
          description: "Generuje treści marketingowe dopasowane do Twojej marki",
          features: ["Posty na social media", "Treści blogowe", "Kampanie email"]
        },
        {
          name: "Ad Optimizer Bot",
          description: "Optymalizuje reklamy w czasie rzeczywistym",
          features: ["Optymalizacja budżetu", "Targeting audiencji", "ROI tracking"]
        }
      ]
    },
    {
      title: "Automatyzacja Obsługi Klienta",
      icon: <MessageSquare className="h-8 w-8" />,
      description: "24/7 wsparcie klientów z AI chatbotami",
      bots: [
        {
          name: "Customer Support Bot",
          description: "Inteligentny chatbot obsługujący zapytania klientów",
          features: ["Natural Language Processing", "Integracja z bazą wiedzy", "Eskalacja do człowieka"]
        },
        {
          name: "Feedback Collector Bot",
          description: "Zbiera i analizuje opinie klientów automatycznie",
          features: ["Analiza sentymentu", "Kategoryzacja opinii", "Raporty insights"]
        }
      ]
    },
    {
      title: "Automatyzacja Procesów",
      icon: <Zap className="h-8 w-8" />,
      description: "Zautomatyzuj powtarzalne zadania biznesowe",
      bots: [
        {
          name: "Data Processing Bot",
          description: "Automatyczne przetwarzanie i analiza danych",
          features: ["ETL procesy", "Raportowanie", "Integracje API"]
        },
        {
          name: "Workflow Automation Bot",
          description: "Automatyzuje złożone procesy biznesowe",
          features: ["Approval workflows", "Task assignment", "Progress tracking"]
        }
      ]
    }
  ];

  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Oszczędność Czasu",
      description: "Automatyzacja pozwala zaoszczędzić do 80% czasu na powtarzalnych zadaniach"
    },
    {
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      title: "Redukcja Kosztów",
      description: "Zmniejsz koszty operacyjne poprzez automatyzację procesów"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Wzrost Wydajności",
      description: "Zwiększ produktywność zespołu o 300% dzięki AI"
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Bezpieczeństwo",
      description: "Zminimalizuj ryzyko błędów ludzkich w krytycznych procesach"
    }
  ];

  const industries = [
    { name: "E-commerce", icon: "🛒" },
    { name: "Fintech", icon: "💳" },
    { name: "Healthcare", icon: "🏥" },
    { name: "Real Estate", icon: "🏠" },
    { name: "SaaS", icon: "💻" },
    { name: "Manufacturing", icon: "🏭" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent)] opacity-50" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 font-mono">
              AI AUTOMATION SOLUTIONS
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
              Zautomatyzuj Swój Biznes z AI
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Odkryj moc inteligentnej automatyzacji. Nasze boty AI pracują 24/7, 
              optymalizując procesy, zwiększając sprzedaż i redukując koszty operacyjne.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button size="lg" className="font-mono w-full sm:w-auto" onClick={() => navigate('/#packages')}>
                <Bot className="mr-2 h-5 w-5" />
                {t('hero.start')}
              </Button>
              <Button size="lg" variant="outline" className="font-mono w-full sm:w-auto" onClick={() => navigate('/contact')}>
                Darmowa Konsultacja
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Dlaczego Automatyzacja z NextAI?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nasze rozwiązania AI transformują sposób działania firm na całym świecie
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-primary/10 hover:border-primary/30 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nasze Rozwiązania Automatyzacji</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kompleksowe boty AI dla każdego aspektu Twojego biznesu
            </p>
          </div>
          
          <div className="space-y-12">
            {automationCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {category.bots.map((bot, botIndex) => (
                    <Card key={botIndex} className="border-l-4 border-l-primary hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Bot className="h-5 w-5 text-primary" />
                          {bot.name}
                        </CardTitle>
                        <CardDescription>{bot.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Kluczowe funkcje:</h4>
                          <ul className="space-y-1">
                            {bot.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Branże, które Obsługujemy</h2>
            <p className="text-lg text-muted-foreground">
              Nasze rozwiązania AI działają w każdej branży
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-2">{industry.icon}</div>
                  <p className="font-medium">{industry.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Gotowy na Automatyzację?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Dołącz do tysięcy firm, które już zautomatyzowały swoje procesy z NextAI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button size="lg" className="font-mono w-full sm:w-auto" onClick={() => navigate('/#packages')}>
              <ArrowRight className="mr-2 h-5 w-5" />
              Zobacz Pakiety
            </Button>
            <Button size="lg" variant="outline" className="font-mono w-full sm:w-auto" onClick={() => navigate('/contact')}>
              <Calendar className="mr-2 h-5 w-5" />
              Umów Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Automations;