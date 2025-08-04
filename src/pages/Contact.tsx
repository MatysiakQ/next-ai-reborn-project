import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Terminal, Lock, Wifi, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message transmitted successfully!",
      description: "Our cyber team will respond within 24 hours.",
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl animate-glow-pulse" />

      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 px-6 py-2 font-mono bg-accent/20 text-accent border-accent/50">
            <Terminal className="mr-2 h-4 w-4" />
            CONTACT_PROTOCOL
          </Badge>
          
          <h1 className="text-4xl md:text-7xl font-bold font-mono mb-6">
            <span className="gradient-text neon-text">INITIATE</span> CONTACT
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto font-mono leading-relaxed">
            {'>'} Nawiąż bezpieczne połączenie z naszym cyber teamem
            <br />
            {'>'} Wszystkie kanały komunikacji są szyfrowane end-to-end
            <br />
            {'>'} <span className="text-neon-cyan animate-neon-flicker">TRANSMISJA GOTOWA</span>
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <Badge className="mb-4 px-4 py-2 font-mono bg-primary/20 text-primary border-primary/50">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  COMMUNICATION_CHANNELS
                </Badge>
                <h2 className="text-3xl font-bold font-mono text-foreground mb-6">
                  <span className="gradient-text">CONNECT</span> WITH US
                </h2>
                <p className="text-muted-foreground font-mono mb-8">
                  {'>'} Wybierz preferowany kanał komunikacji
                  <br />
                  {'>'} Wszystkie zapytania są procesowane w czasie rzeczywistym
                  <br />
                  {'>'} SLA response time: {'<'} 24h
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: "EMAIL_PROTOCOL",
                    info: "contact@nexthack.ai",
                    desc: "Encrypted communication channel",
                    color: "neon-cyan"
                  },
                  {
                    icon: Phone,
                    title: "VOICE_CHANNEL",
                    info: "+48 123 456 789",
                    desc: "Direct line to mission control",
                    color: "neon-magenta"
                  },
                  {
                    icon: MapPin,
                    title: "PHYSICAL_LOCATION",
                    info: "ul. Cyber 42, 00-001 Warsaw",
                    desc: "Secure facility coordinates",
                    color: "neon-green"
                  },
                  {
                    icon: Terminal,
                    title: "SYSTEM_STATUS",
                    info: "ONLINE • 24/7/365",
                    desc: "Always ready for new connections",
                    color: "neon-yellow"
                  }
                ].map((contact, index) => (
                  <Card key={index} className="glass-effect p-6 hover:neon-glow transition-all duration-300 group border-border/50">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-primary/20 text-primary group-hover:animate-glow-pulse`}>
                        <contact.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-mono font-semibold text-foreground mb-1">{contact.title}</h3>
                        <p className="text-primary font-mono font-medium">{contact.info}</p>
                        <p className="text-muted-foreground font-mono text-sm">{'>'} {contact.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* FAQ Link */}
              <Card className="glass-effect border-border/50">
                <CardHeader>
                  <CardTitle className="font-mono text-foreground">KNOWLEDGE_BASE.DB</CardTitle>
                  <CardDescription className="font-mono">
                    {'>'} Sprawdź naszą bazę wiedzy - możliwe, że znajdziesz tam odpowiedź na swoje pytanie
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full font-mono hover:neon-glow transition-all duration-300">
                    <Globe className="mr-2 h-4 w-4" />
                    ACCESS FAQ DATABASE
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="glass-effect border-border/50">
              <CardHeader>
                <Badge className="mb-2 px-3 py-1 font-mono bg-accent/20 text-accent border-accent/50 w-fit">
                  <Lock className="mr-2 h-3 w-3" />
                  ENCRYPTED
                </Badge>
                <CardTitle className="font-mono text-foreground text-2xl">
                  {'>'} SECURE_MESSAGE.EXE
                </CardTitle>
                <CardDescription className="font-mono">
                  {'>'} Wypełnij formularz aby wysłać zaszyfrowaną wiadomość do naszego zespołu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium font-mono text-foreground mb-2">
                        USER_NAME:
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your handle..."
                        className="font-mono bg-input/50 border-border/50 focus:border-primary/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium font-mono text-foreground mb-2">
                        EMAIL_ADDRESS:
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="user@domain.com"
                        className="font-mono bg-input/50 border-border/50 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium font-mono text-foreground mb-2">
                      SUBJECT_LINE:
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Message subject protocol..."
                      className="font-mono bg-input/50 border-border/50 focus:border-primary/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium font-mono text-foreground mb-2">
                      MESSAGE_BODY:
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Compose your encrypted message..."
                      className="font-mono bg-input/50 border-border/50 focus:border-primary/50"
                    />
                  </div>

                  <Button type="submit" className="w-full neon-glow font-mono hover:neon-glow-magenta transition-all duration-300">
                    <Send className="mr-2 h-4 w-4" />
                    TRANSMIT_MESSAGE()
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-muted/20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 font-mono bg-accent/20 text-accent border-accent/50">
              <MapPin className="mr-2 h-4 w-4" />
              COORDINATES
            </Badge>
            <h2 className="text-3xl font-bold font-mono mb-6">
              <span className="gradient-text">PHYSICAL</span> LOCATION
            </h2>
          </div>
          
          <div className="glass-effect rounded-lg overflow-hidden border-border/50">
            <div className="h-96 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center relative">
              <div className="text-center z-10">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4 animate-glow-pulse" />
                <p className="text-muted-foreground font-mono">
                  {'>'} Secure facility location mapping
                  <br />
                  {'>'} GPS coordinates: 52.2297° N, 21.0122° E
                  <br />
                  {'>'} Access level: RESTRICTED
                </p>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-4 left-4 text-neon-cyan font-mono text-xs opacity-50">
                {'> gps_tracker.py'}
              </div>
              <div className="absolute bottom-4 right-4 text-neon-magenta font-mono text-xs opacity-50">
                {'> secure_location.js'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;