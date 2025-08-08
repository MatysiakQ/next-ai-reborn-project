import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Zap, 
  Shield, 
  Users, 
  TrendingUp, 
  BarChart3, 
  MessageSquare, 
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
  Wifi,
  Clock,
  DollarSign,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useThemeLanguage } from '@/contexts/ThemeLanguageContext';
import SubscriptionPlans from '@/components/SubscriptionPlans';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useThemeLanguage();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('contact.form.success'),
      description: t('contact.form.successDesc'),
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
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <Badge className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-mono bg-primary/20 text-primary border-primary/50 neon-glow">
              <Bot className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {t('hero.badge')}
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-mono tracking-tight">
              <span className="gradient-text neon-text">{t('hero.title')}</span>
              <br />
              <span className="text-foreground">{t('hero.subtitle')}</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-mono leading-relaxed px-4">
              {'>'} {t('hero.description1')}
              <br />
              {'>'} {t('hero.description2')}
              <br />
              {'>'} <span className="text-neon-cyan animate-neon-flicker">{t('hero.description3')}</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6 sm:pt-8 px-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-mono neon-glow hover:neon-glow-magenta transition-all duration-300 group"
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Bot className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                <span className="truncate">{t('hero.start')}</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-mono border-primary/50 hover:bg-primary/10 hover:neon-glow transition-all duration-300"
                onClick={() => navigate('/automations')}
              >
                <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="truncate">{t('hero.view')}</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating code elements - hidden on mobile */}
        <div className="hidden md:block absolute top-20 left-4 lg:left-10 text-neon-cyan font-mono text-xs lg:text-sm opacity-50 animate-neon-flicker">
          {'> automation_bot.py'}
        </div>
        <div className="hidden md:block absolute top-40 right-4 lg:right-10 text-neon-magenta font-mono text-xs lg:text-sm opacity-50 animate-neon-flicker">
          {'> sales_ai.js'}
        </div>
        <div className="hidden md:block absolute bottom-40 left-4 lg:left-20 text-neon-green font-mono text-xs lg:text-sm opacity-50 animate-neon-flicker">
          {'> business_optimizer.cpp'}
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 px-4 py-2 font-mono bg-accent/20 text-accent border-accent/50">
              <TrendingUp className="mr-2 h-4 w-4" />
              {t('home.benefits.badge')}
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold font-mono mb-6">
              <span className="gradient-text">{t('home.benefits.heading.strong')}</span> {t('home.benefits.heading.rest')}
            </h2>
            <p className="text-xl text-muted-foreground font-mono max-w-3xl mx-auto">
              {'>'} {t('home.benefits.line1')}
              <br />
              {'>'} {t('home.benefits.line2')}
              <br />
              {'>'} {t('home.benefits.line3')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: Clock,
                title: t('home.benefit.time.title'),
                description: t('home.benefit.time.desc'),
                color: 'neon-cyan',
                stat: t('home.benefit.time.stat')
              },
              {
                icon: DollarSign,
                title: t('home.benefit.cost.title'),
                description: t('home.benefit.cost.desc'),
                color: 'neon-magenta',
                stat: t('home.benefit.cost.stat')
              },
              {
                icon: TrendingUp,
                title: t('home.benefit.sales.title'),
                description: t('home.benefit.sales.desc'),
                color: 'neon-green',
                stat: t('home.benefit.sales.stat')
              },
              {
                icon: Shield,
                title: t('home.benefit.security.title'),
                description: t('home.benefit.security.desc'),
                color: 'neon-yellow',
                stat: t('home.benefit.security.stat')
              }
            ].map((benefit, index) => (
              <Card key={index} className="glass-effect hover:neon-glow transition-all duration-300 group border-border/50 text-center">
                <CardHeader>
                  <div className={`inline-flex p-4 rounded-lg bg-primary/20 text-primary mb-4 mx-auto group-hover:animate-glow-pulse`}>
                    <benefit.icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold font-mono text-primary mb-2">{benefit.stat}</div>
                  <CardTitle className="text-lg font-mono text-foreground">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-mono text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Types Section */}
      <section className="py-20 px-4 bg-muted/20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 font-mono bg-accent/20 text-accent border-accent/50">
              <Bot className="mr-2 h-4 w-4" />
              {t('home.types.badge')}
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold font-mono mb-6">
              <span className="gradient-text">{t('home.types.heading.strong')}</span> {t('home.types.heading.rest')}
            </h2>
            <p className="text-xl text-muted-foreground font-mono max-w-3xl mx-auto">
              {'>'} {t('home.types.desc1')}
              <br />
              {'>'} {t('home.types.desc2')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: DollarSign,
                title: t('home.types.sales.title'),
                description: t('home.types.sales.desc'),
                features: [t('home.types.sales.f1'), t('home.types.sales.f2'), t('home.types.sales.f3')]
              },
              {
                icon: BarChart3,
                title: t('home.types.marketing.title'),
                description: t('home.types.marketing.desc'),
                features: [t('home.types.marketing.f1'), t('home.types.marketing.f2'), t('home.types.marketing.f3')]
              },
              {
                icon: MessageSquare,
                title: t('home.types.support.title'),
                description: t('home.types.support.desc'),
                features: [t('home.types.support.f1'), t('home.types.support.f2'), t('home.types.support.f3')]
              },
              {
                icon: Database,
                title: t('home.types.data.title'),
                description: t('home.types.data.desc'),
                features: [t('home.types.data.f1'), t('home.types.data.f2'), t('home.types.data.f3')]
              },
              {
                icon: Zap,
                title: t('home.types.workflow.title'),
                description: t('home.types.workflow.desc'),
                features: [t('home.types.workflow.f1'), t('home.types.workflow.f2'), t('home.types.workflow.f3')]
              },
              {
                icon: Globe,
                title: t('home.types.ecommerce.title'),
                description: t('home.types.ecommerce.desc'),
                features: [t('home.types.ecommerce.f1'), t('home.types.ecommerce.f2'), t('home.types.ecommerce.f3')]
              }
            ].map((automation, index) => (
              <Card key={index} className="glass-effect hover:neon-glow transition-all duration-300 group border-border/50">
                <CardHeader>
                  <div className={`inline-flex p-4 rounded-lg bg-primary/20 text-primary mb-4 group-hover:animate-glow-pulse`}>
                    <automation.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-mono text-foreground">{automation.title}</CardTitle>
                  <CardDescription className="font-mono">{automation.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {automation.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm font-mono">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center">
            {[
              { number: '500+', label: t('home.stats.automatedFirms'), icon: Users },
              { number: '99.9%', label: t('home.stats.uptime'), icon: Wifi },
              { number: '50+', label: t('home.stats.types'), icon: Bot },
              { number: '24/7', label: t('home.stats.support'), icon: MessageCircle }
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
              {t('home.pricing.badge')}
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold font-mono mb-6">
              <span className="gradient-text">{t('home.pricing.heading.strong')}</span> {t('home.pricing.heading.rest')}
            </h2>
            <p className="text-xl text-muted-foreground font-mono max-w-3xl mx-auto">
              {'>'} {t('home.pricing.line1')}
              <br />
              {'>'} {t('home.pricing.line2')}
              <br />
              {'>'} {t('home.pricing.line3')}
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
              {t('home.contact.badge')}
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold font-mono mb-6">
              <span className="gradient-text">{t('home.contact.heading.strong')}</span> {t('home.contact.heading.rest')}
            </h2>
            <p className="text-xl text-muted-foreground font-mono max-w-3xl mx-auto">
              {'>'} {t('home.contact.line1')}
              <br />
              {'>'} {t('home.contact.line2')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <Card className="glass-effect p-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-mono text-foreground">
                  {t('home.contact.form.title')}
                </CardTitle>
                <CardDescription className="font-mono">
                  {t('home.contact.form.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-mono font-medium mb-2 text-foreground">
                      {t('home.contact.form.name')}
                    </label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder={t('home.contact.form.namePlaceholder')}
                      className="font-mono bg-input/50 border-border/50 focus:border-primary/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-mono font-medium mb-2 text-foreground">
                      {t('home.contact.form.email')}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder={t('home.contact.form.emailPlaceholder')}
                      className="font-mono bg-input/50 border-border/50 focus:border-primary/50"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-mono font-medium mb-2 text-foreground">
                      OPIS_POTRZEB:
                    </label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Opisz jakie procesy chcesz zautomatyzować..."
                      className="font-mono bg-input/50 border-border/50 focus:border-primary/50"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full neon-glow font-mono">
                    <Calendar className="mr-2 h-4 w-4" />
                    WYŚLIJ_ZAPYTANIE()
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: Mail, title: t('contact.channels.email'), info: 'automation@nextai.pl', desc: t('contact.channels.emailDesc') },
                { icon: Phone, title: t('contact.channels.phone'), info: '+48 123 456 789', desc: t('contact.channels.phoneDesc') },
                { icon: MapPin, title: t('contact.channels.address'), info: 'ul. AI 42, 00-001 Warszawa', desc: t('contact.channels.addressDesc') },
                { icon: Bot, title: t('contact.channels.status'), info: 'ONLINE • 24/7', desc: t('contact.channels.statusDesc') }
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
            <span className="gradient-text">{t('home.footer.heading.strong')}</span> {t('home.footer.heading.rest')}
          </h2>
          <p className="text-xl text-muted-foreground font-mono mb-8">
            {'>'} {t('home.footer.line1')}
            <br />
            {'>'} {t('home.footer.line2')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-12 py-4 text-lg font-mono neon-glow hover:neon-glow-magenta transition-all duration-300"
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Bot className="mr-2 h-5 w-5" />
              {t('hero.start')}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-12 py-4 text-lg font-mono border-primary/50 hover:bg-primary/10 hover:neon-glow transition-all duration-300"
              onClick={() => navigate('/courses')}
            >
              <Code className="mr-2 h-5 w-5" />
              {t('home.footer.viewCourses')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;