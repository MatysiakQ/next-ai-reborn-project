import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
  ArrowRight,
  Play,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Code,
  Cpu,
  Database,
  Terminal,
  Lock,
  Wifi
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import SubscriptionPlans from '@/components/SubscriptionPlans';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Wiadomość wysłana!",
      description: "Dziękujemy za kontakt. Odpowiemy wkrótce.",
    });
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl animate-glow-pulse" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="space-y-8 animate-fade-in">
            <Badge className="px-6 py-2 text-sm font-mono bg-primary/20 text-primary border-primary/50 neon-glow">
              <Terminal className="mr-2 h-4 w-4" />
              SYSTEM ONLINE • AI POWERED
            </Badge>
            
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold font-mono tracking-tight">
              <span className="gradient-text neon-text">NEXTH4CK</span>
              <br />
              <span className="text-foreground">AI ACADEMY</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-mono leading-relaxed">
              {'>'} Inicjalizacja sekwencji uczenia...
              <br />
              {'>'} Ładowanie zaawansowanych modułów AI
              <br />
              {'>'} <span className="text-neon-cyan animate-neon-flicker">DOSTĘP PRZYZNANY</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg font-mono neon-glow hover:neon-glow-magenta transition-all duration-300 group"
                onClick={() => navigate('/courses')}
              >
                <Code className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                START HACKING
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg font-mono border-primary/50 hover:bg-primary/10 hover:neon-glow transition-all duration-300"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2 h-5 w-5" />
                SYSTEM INFO
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating code elements */}
        <div className="absolute top-20 left-10 text-neon-cyan font-mono text-sm opacity-50 animate-neon-flicker">
          {'> neural_network.py'}
        </div>
        <div className="absolute top-40 right-10 text-neon-magenta font-mono text-sm opacity-50 animate-neon-flicker">
          {'> ai_training.js'}
        </div>
        <div className="absolute bottom-40 left-20 text-neon-green font-mono text-sm opacity-50 animate-neon-flicker">
          {'> quantum_ai.cpp'}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 px-4 py-2 font-mono bg-accent/20 text-accent border-accent/50">
              <Cpu className="mr-2 h-4 w-4" />
              CORE MODULES
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold font-mono mb-6">
              <span className="gradient-text">SYSTEM</span> FEATURES
            </h2>
            <p className="text-xl text-muted-foreground font-mono max-w-3xl mx-auto">
              {'>'} Zaawansowane algorytmy uczenia maszynowego
              <br />
              {'>'} Interaktywne laboratoria hackingowe
              <br />
              {'>'} Real-time monitoring postępów
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Neural Networks",
                description: "Głębokie sieci neuronowe i architektury transformerów",
                color: "neon-cyan"
              },
              {
                icon: Shield,
                title: "Cybersecurity",
                description: "Etyczne hakowanie i penetration testing",
                color: "neon-magenta"
              },
              {
                icon: Database,
                title: "Big Data",
                description: "Analiza wielkich zbiorów danych i ML pipelines",
                color: "neon-green"
              },
              {
                icon: Code,
                title: "AI Programming",
                description: "Python, TensorFlow, PyTorch i OpenAI API",
                color: "neon-yellow"
              },
              {
                icon: Zap,
                title: "Quantum Computing",
                description: "Obliczenia kwantowe i algorytmy Shora",
                color: "neon-purple"
              },
              {
                icon: Globe,
                title: "IoT Hacking",
                description: "Bezpieczeństwo urządzeń IoT i embedded systems",
                color: "neon-cyan"
              }
            ].map((feature, index) => (
              <Card key={index} className="glass-effect hover:neon-glow transition-all duration-300 group border-border/50">
                <CardHeader className="text-center">
                  <div className={`inline-flex p-4 rounded-lg bg-primary/20 text-primary mb-4 group-hover:animate-glow-pulse`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-mono text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-mono text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted/20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Active Hackers", icon: Users },
              { number: "99.9%", label: "Uptime", icon: Wifi },
              { number: "50+", label: "AI Modules", icon: Cpu },
              { number: "256-bit", label: "Encryption", icon: Lock }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="glass-effect p-6 rounded-lg hover:neon-glow transition-all duration-300">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-4 group-hover:animate-glow-pulse" />
                  <div className="text-3xl font-bold font-mono text-foreground mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-mono text-sm uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="packages" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 font-mono bg-accent/20 text-accent border-accent/50">
              <BarChart3 className="mr-2 h-4 w-4" />
              SUBSCRIPTION PLANS
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold font-mono mb-6">
              <span className="gradient-text">CHOOSE</span> YOUR PATH
            </h2>
            <p className="text-xl text-muted-foreground font-mono max-w-3xl mx-auto">
              {'>'} Wybierz plan dostępu do platformy hackingowej
              <br />
              {'>'} Różne poziomy uprawnień systemowych
              <br />
              {'>'} Pełne wsparcie techniczne 24/7
            </p>
          </div>

          <SubscriptionPlans />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 font-mono bg-accent/20 text-accent border-accent/50">
              <MessageCircle className="mr-2 h-4 w-4" />
              CONTACT PROTOCOL
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold font-mono mb-6">
              <span className="gradient-text">INITIATE</span> CONTACT
            </h2>
            <p className="text-xl text-muted-foreground font-mono max-w-3xl mx-auto">
              {'>'} Nawiąż bezpieczne połączenie z naszym zespołem
              <br />
              {'>'} Wszystkie kanały komunikacji są szyfrowane
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="glass-effect p-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-mono text-foreground">
                  {'>'} SECURE_MESSAGE.EXE
                </CardTitle>
                <CardDescription className="font-mono">
                  Wypełnij formularz aby wysłać zaszyfrowaną wiadomość
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-mono font-medium mb-2 text-foreground">
                      USER_NAME:
                    </label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Enter your handle..."
                      className="font-mono bg-input/50 border-border/50 focus:border-primary/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-mono font-medium mb-2 text-foreground">
                      EMAIL_ADDRESS:
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="user@domain.com"
                      className="font-mono bg-input/50 border-border/50 focus:border-primary/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-mono font-medium mb-2 text-foreground">
                      MESSAGE_BODY:
                    </label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Compose your encrypted message..."
                      className="font-mono bg-input/50 border-border/50 focus:border-primary/50"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full neon-glow font-mono">
                    <Lock className="mr-2 h-4 w-4" />
                    TRANSMIT_MESSAGE()
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: Mail, title: "EMAIL_PROTOCOL", info: "contact@nexthack.ai", desc: "Encrypted communication channel" },
                { icon: Phone, title: "VOICE_CHANNEL", info: "+48 123 456 789", desc: "Direct line to mission control" },
                { icon: MapPin, title: "PHYSICAL_LOCATION", info: "ul. Cyber 42, 00-001 Warsaw", desc: "Secure facility coordinates" },
                { icon: Terminal, title: "SYSTEM_STATUS", info: "ONLINE • 24/7", desc: "Always ready for new connections" }
              ].map((contact, index) => (
                <Card key={index} className="glass-effect p-6 hover:neon-glow transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-primary/20 text-primary group-hover:animate-glow-pulse">
                      <contact.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-mono font-semibold text-foreground mb-1">{contact.title}</h3>
                      <p className="text-primary font-mono font-medium">{contact.info}</p>
                      <p className="text-muted-foreground font-mono text-sm">{contact.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold font-mono mb-6">
            <span className="gradient-text">READY TO HACK</span> THE FUTURE?
          </h2>
          <p className="text-xl text-muted-foreground font-mono mb-8">
            {'>'} Join the elite community of AI hackers
            <br />
            {'>'} Start your journey into the digital frontier
          </p>
          <Button 
            size="lg" 
            className="px-12 py-4 text-lg font-mono neon-glow hover:neon-glow-magenta transition-all duration-300"
            onClick={() => navigate(user ? '/courses' : '/auth')}
          >
            <Terminal className="mr-2 h-5 w-5" />
            {user ? 'ACCESS COURSES' : 'INITIALIZE ACCOUNT'}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;