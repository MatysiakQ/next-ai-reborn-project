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
      title: t('automations.category.sales.title'),
      icon: <DollarSign className="h-8 w-8" />,
      description: t('automations.category.sales.desc'),
      bots: [
        {
          name: t('automations.bots.leadQualifier.name'),
          description: t('automations.bots.leadQualifier.desc'),
          features: [
            t('automations.bots.leadQualifier.features.1'),
            t('automations.bots.leadQualifier.features.2'),
            t('automations.bots.leadQualifier.features.3')
          ]
        },
        {
          name: t('automations.bots.followUp.name'),
          description: t('automations.bots.followUp.desc'),
          features: [
            t('automations.bots.followUp.features.1'),
            t('automations.bots.followUp.features.2'),
            t('automations.bots.followUp.features.3')
          ]
        }
      ]
    },
    {
      title: t('automations.category.marketing.title'),
      icon: <BarChart3 className="h-8 w-8" />,
      description: t('automations.category.marketing.desc'),
      bots: [
        {
          name: t('automations.bots.contentGenerator.name'),
          description: t('automations.bots.contentGenerator.desc'),
          features: [
            t('automations.bots.contentGenerator.features.1'),
            t('automations.bots.contentGenerator.features.2'),
            t('automations.bots.contentGenerator.features.3')
          ]
        },
        {
          name: t('automations.bots.adOptimizer.name'),
          description: t('automations.bots.adOptimizer.desc'),
          features: [
            t('automations.bots.adOptimizer.features.1'),
            t('automations.bots.adOptimizer.features.2'),
            t('automations.bots.adOptimizer.features.3')
          ]
        }
      ]
    },
    {
      title: t('automations.category.support.title'),
      icon: <MessageSquare className="h-8 w-8" />,
      description: t('automations.category.support.desc'),
      bots: [
        {
          name: t('automations.bots.support.name'),
          description: t('automations.bots.support.desc'),
          features: [
            t('automations.bots.support.features.1'),
            t('automations.bots.support.features.2'),
            t('automations.bots.support.features.3')
          ]
        },
        {
          name: t('automations.bots.feedback.name'),
          description: t('automations.bots.feedback.desc'),
          features: [
            t('automations.bots.feedback.features.1'),
            t('automations.bots.feedback.features.2'),
            t('automations.bots.feedback.features.3')
          ]
        }
      ]
    },
    {
      title: t('automations.category.process.title'),
      icon: <Zap className="h-8 w-8" />,
      description: t('automations.category.process.desc'),
      bots: [
        {
          name: t('automations.bots.dataProcessing.name'),
          description: t('automations.bots.dataProcessing.desc'),
          features: [
            t('automations.bots.dataProcessing.features.1'),
            t('automations.bots.dataProcessing.features.2'),
            t('automations.bots.dataProcessing.features.3')
          ]
        },
        {
          name: t('automations.bots.workflow.name'),
          description: t('automations.bots.workflow.desc'),
          features: [
            t('automations.bots.workflow.features.1'),
            t('automations.bots.workflow.features.2'),
            t('automations.bots.workflow.features.3')
          ]
        }
      ]
    }
  ];

  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: t('automations.benefits.time.title'),
      description: t('automations.benefits.time.desc')
    },
    {
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      title: t('automations.benefits.cost.title'),
      description: t('automations.benefits.cost.desc')
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: t('automations.benefits.performance.title'),
      description: t('automations.benefits.performance.desc')
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: t('automations.benefits.security.title'),
      description: t('automations.benefits.security.desc')
    }
  ];

  const industries = [
    { name: t('automations.industries.ecommerce'), icon: '🛒' },
    { name: t('automations.industries.fintech'), icon: '💳' },
    { name: t('automations.industries.healthcare'), icon: '🏥' },
    { name: t('automations.industries.realestate'), icon: '🏠' },
    { name: t('automations.industries.saas'), icon: '💻' },
    { name: t('automations.industries.manufacturing'), icon: '🏭' }
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
              {t('automations.hero.badge')}
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
              {t('automations.hero.title')}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t('automations.hero.desc')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button size="lg" className="font-mono w-full sm:w-auto" onClick={() => navigate('/#packages')}>
                <Bot className="mr-2 h-5 w-5" />
                {t('hero.start')}
              </Button>
              <Button size="lg" variant="outline" className="font-mono w-full sm:w-auto" onClick={() => navigate('/contact')}>
                {t('automations.hero.freeConsultation')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('automations.benefits.heading')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('automations.benefits.performance.desc')}
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
            <h2 className="text-3xl font-bold mb-4">{t('automations.categories.heading')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('automations.categories.subheading')}
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
                          <h4 className="font-semibold text-sm">{t('automations.bot.featuresLabel')}</h4>
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
            <h2 className="text-3xl font-bold mb-4">{t('automations.industries.heading')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('automations.industries.subheading')}
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
            {t('automations.cta.heading')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('automations.cta.subheading')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button size="lg" className="font-mono w-full sm:w-auto" onClick={() => navigate('/#packages')}>
              <ArrowRight className="mr-2 h-5 w-5" />
              {t('automations.cta.viewPackages')}
            </Button>
            <Button size="lg" variant="outline" className="font-mono w-full sm:w-auto" onClick={() => navigate('/contact')}>
              <Calendar className="mr-2 h-5 w-5" />
              {t('automations.cta.bookDemo')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Automations;