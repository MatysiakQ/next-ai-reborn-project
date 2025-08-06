import { Users, Target, Award, Heart, Terminal, Cpu, Shield, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useThemeLanguage } from '@/contexts/ThemeLanguageContext';

const About = () => {
  const { t } = useThemeLanguage();
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="fixed top-1/3 left-1/3 w-80 h-80 bg-neon-cyan/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="fixed bottom-1/3 right-1/3 w-80 h-80 bg-neon-magenta/10 rounded-full blur-3xl animate-glow-pulse" />

      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 px-6 py-2 font-mono bg-accent/20 text-accent border-accent/50">
            <Users className="mr-2 h-4 w-4" />
            {t('about.badge')}
          </Badge>
          
          <h1 className="text-4xl md:text-7xl font-bold font-mono mb-6">
            <span className="gradient-text neon-text">{t('about.title')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-mono leading-relaxed">
            {'>'} {t('about.description1')}
            <br />
            {'>'} {t('about.description2')}
            <br />
            {'>'} <span className="text-neon-cyan animate-neon-flicker">{t('about.description3')}</span>
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-muted/20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="px-4 py-2 font-mono bg-primary/20 text-primary border-primary/50">
                <Target className="mr-2 h-4 w-4" />
                {t('about.mission.badge')}
              </Badge>
              
              <h2 className="text-3xl md:text-5xl font-bold font-mono">
                <span className="gradient-text">{t('about.mission.title')}</span>
              </h2>
              
              <div className="space-y-4 font-mono text-muted-foreground">
                <p>
                  {'>'} {t('about.mission.text1')}
                </p>
                <p>
                  {'>'} {t('about.mission.text2')}
                </p>
                <p>
                  {'>'} {t('about.mission.text3')}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-effect p-6 text-center hover:neon-glow transition-all duration-300 group">
                <Users className="h-12 w-12 text-primary mx-auto mb-4 group-hover:animate-glow-pulse" />
                <h3 className="text-2xl font-bold font-mono text-foreground mb-2">10K+</h3>
                <p className="text-muted-foreground font-mono text-sm">{t('about.stats.users')}</p>
              </div>
              <div className="glass-effect p-6 text-center hover:neon-glow transition-all duration-300 group">
                <Award className="h-12 w-12 text-primary mx-auto mb-4 group-hover:animate-glow-pulse" />
                <h3 className="text-2xl font-bold font-mono text-foreground mb-2">50+</h3>
                <p className="text-muted-foreground font-mono text-sm">{t('about.stats.modules')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 font-mono bg-accent/20 text-accent border-accent/50">
              <Code className="mr-2 h-4 w-4" />
              {t('about.values.badge')}
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-mono mb-6">
              <span className="gradient-text">{t('about.values.title')}</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: t('about.values.excellence'),
                description: t('about.values.excellenceDesc'),
                color: "neon-cyan"
              },
              {
                icon: Users,
                title: t('about.values.community'),
                description: t('about.values.communityDesc'),
                color: "neon-magenta"
              },
              {
                icon: Heart,
                title: t('about.values.passion'),
                description: t('about.values.passionDesc'),
                color: "neon-green"
              }
            ].map((value, index) => (
              <div key={index} className="glass-effect p-8 text-center hover:neon-glow transition-all duration-300 group">
                <div className={`inline-flex p-4 rounded-lg bg-primary/20 text-primary mb-6 group-hover:animate-glow-pulse`}>
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold font-mono text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                  {'>'} {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 font-mono bg-accent/20 text-accent border-accent/50">
              <Terminal className="mr-2 h-4 w-4" />
              {t('about.team.badge')}
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-mono mb-6">
              <span className="gradient-text">{t('about.team.title')}</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: t('about.team.anna.name'),
                role: t('about.team.anna.role'),
                avatar: "bg-gradient-to-br from-neon-cyan to-primary",
                desc: t('about.team.anna.desc'),
                icon: Shield
              },
              {
                name: t('about.team.michal.name'),
                role: t('about.team.michal.role'),
                avatar: "bg-gradient-to-br from-neon-magenta to-accent",
                desc: t('about.team.michal.desc'),
                icon: Cpu
              },
              {
                name: t('about.team.katarzyna.name'),
                role: t('about.team.katarzyna.role'),
                avatar: "bg-gradient-to-br from-neon-green to-secondary",
                desc: t('about.team.katarzyna.desc'),
                icon: Code
              }
            ].map((member, index) => (
              <div key={index} className="glass-effect p-8 text-center hover:neon-glow transition-all duration-300 group">
                <div className={`w-32 h-32 ${member.avatar} rounded-full mx-auto mb-6 flex items-center justify-center group-hover:animate-glow-pulse`}>
                  <member.icon className="h-12 w-12 text-background" />
                </div>
                <h3 className="text-xl font-semibold font-mono text-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-medium font-mono mb-4 uppercase tracking-wider text-sm">{member.role}</p>
                <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                  {'>'} {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold font-mono mb-6">
            <span className="gradient-text">{t('about.cta.title')}</span>
          </h2>
          <p className="text-xl text-muted-foreground font-mono mb-8">
            {'>'} {t('about.cta.desc1')}
            <br />
            {'>'} {t('about.cta.desc2')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;