import { Users, Target, Award, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            O nas
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Jesteśmy zespołem pasjonatów edukacji, którzy wierzą w siłę wiedzy i ciągłego rozwoju.
            Nasza misja to demokratyzacja dostępu do wysokiej jakości kursów online.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Nasza misja
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Wierzymy, że każdy powinien mieć dostęp do najlepszych materiałów edukacyjnych, 
                niezależnie od swojego położenia czy sytuacji finansowej.
              </p>
              <p className="text-lg text-muted-foreground">
                Tworzymy kursy, które nie tylko uczą, ale inspirują do działania i ciągłego rozwoju.
                Nasz zespół składa się z ekspertów w różnych dziedzinach, którzy dzielą się swoją wiedzą i doświadczeniem.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-background rounded-lg shadow-sm">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">10k+</h3>
                <p className="text-muted-foreground">Studentów</p>
              </div>
              <div className="text-center p-6 bg-background rounded-lg shadow-sm">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">50+</h3>
                <p className="text-muted-foreground">Kursów</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Nasze wartości
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Target className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-foreground mb-4">Jakość</h3>
              <p className="text-muted-foreground">
                Każdy kurs przechodzi przez rigorystyczny proces kontroli jakości, aby zapewnić najlepsze doświadczenie edukacyjne.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-foreground mb-4">Społeczność</h3>
              <p className="text-muted-foreground">
                Budujemy społeczność uczących się, gdzie każdy może dzielić się wiedzą i wspierać innych w rozwoju.
              </p>
            </div>
            <div className="text-center">
              <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-foreground mb-4">Pasja</h3>
              <p className="text-muted-foreground">
                Jesteśmy napędzani pasją do edukacji i chęcią pomagania innym w osiąganiu ich celów.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Nasz zespół
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/70 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Anna Kowalska</h3>
              <p className="text-primary font-medium mb-2">CEO & Founder</p>
              <p className="text-muted-foreground text-sm">
                10+ lat doświadczenia w edukacji online i zarządzaniu projektami edukacyjnymi.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-secondary to-secondary/70 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Michał Nowak</h3>
              <p className="text-primary font-medium mb-2">CTO</p>
              <p className="text-muted-foreground text-sm">
                Ekspert w dziedzinie technologii edukacyjnych i rozwoju platform e-learningowych.
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-accent to-accent/70 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Katarzyna Wiśniewska</h3>
              <p className="text-primary font-medium mb-2">Head of Content</p>
              <p className="text-muted-foreground text-sm">
                Specjalistka od tworzenia treści edukacyjnych i metodyk nauczania online.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;