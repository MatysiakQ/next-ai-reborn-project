import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  BookOpen, 
  Clock, 
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Download,
  Users,
  Star
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  content: string;
  difficulty_level: string;
  duration_minutes: number;
  is_premium: boolean;
  required_subscription_tier: string;
  thumbnail_url?: string;
  video_url?: string;
}

const CoursePage = () => {
  const { courseId } = useParams();
  const { user, subscription } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);

  // Check if user has access to a specific tier
  const hasAccessToTier = (requiredTier: string): boolean => {
    if (!user) return requiredTier === 'free';
    
    if (requiredTier === 'free') return true;
    
    if (!subscription?.is_subscribed) return false;
    
    const userTier = subscription.subscription_plan?.name?.toLowerCase();
    
    switch (requiredTier) {
      case 'basic':
        return userTier === 'basic' || userTier === 'pro' || userTier === 'enterprise';
      case 'pro':
        return userTier === 'pro' || userTier === 'enterprise';
      default:
        return false;
    }
  };

  const fetchCourse = async () => {
    if (!courseId) return;
    
    setLoading(true);
    try {
      const { data: courseData, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      
      if (!courseData) {
        toast({
          title: "Kurs nie znaleziony",
          description: "Wybrany kurs nie istnieje lub nie jest dostępny.",
          variant: "destructive"
        });
        navigate('/courses');
        return;
      }

      setCourse(courseData);

      // Check access
      if (!hasAccessToTier(courseData.required_subscription_tier)) {
        toast({
          title: "Brak dostępu",
          description: "Ten kurs wymaga wykupienia odpowiedniego pakietu.",
          variant: "destructive"
        });
        navigate('/courses');
        return;
      }

      // Simulate progress (in real app, fetch from user progress table)
      setProgress(Math.random() * 100);
      setIsCompleted(Math.random() > 0.7);

    } catch (error) {
      console.error('Error fetching course:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać danych kursu.",
        variant: "destructive"
      });
      navigate('/courses');
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = () => {
    setIsCompleted(true);
    setProgress(100);
    toast({
      title: "Gratulacje!",
      description: "Ukończyłeś kurs pomyślnie!",
    });
  };

  const resetProgress = () => {
    setProgress(0);
    setIsCompleted(false);
    setCurrentSection(1);
    toast({
      title: "Postęp zresetowany",
      description: "Możesz zacząć kurs od nowa.",
    });
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Kurs nie znaleziony</h1>
          <Button onClick={() => navigate('/courses')}>
            Wróć do kursów
          </Button>
        </div>
      </div>
    );
  }

  const courseSections = [
    { id: 1, title: "Wprowadzenie", duration: Math.floor(course.duration_minutes * 0.2) },
    { id: 2, title: "Teoria", duration: Math.floor(course.duration_minutes * 0.4) },
    { id: 3, title: "Praktyka", duration: Math.floor(course.duration_minutes * 0.3) },
    { id: 4, title: "Podsumowanie", duration: Math.floor(course.duration_minutes * 0.1) }
  ];

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case 'free': return 'Darmowy';
      case 'basic': return 'Basic';
      case 'pro': return 'Pro';
      default: return 'Nieznany';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <Link to="/courses" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Wróć do kursów
        </Link>

        {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Course Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">
                {course.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <Badge variant="outline" className="text-sm">
                  <div className={`w-2 h-2 rounded-full mr-2 ${getDifficultyColor(course.difficulty_level)}`} />
                  {course.difficulty_level === 'beginner' ? 'Początkujący' : 
                   course.difficulty_level === 'intermediate' ? 'Średniozaawansowany' : 'Zaawansowany'}
                </Badge>
                
                <Badge variant="secondary" className="text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  {course.duration_minutes} min
                </Badge>

                <Badge variant={course.required_subscription_tier === 'free' ? 'default' : 'destructive'} className="text-sm">
                  {getTierLabel(course.required_subscription_tier)}
                </Badge>

                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  <span className="text-sm">4.8 (234 opinii)</span>
                </div>
              </div>

              {/* Progress Section */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Twój postęp</h3>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(progress)}% ukończone
                    </span>
                  </div>
                  
                  <Progress value={progress} className="mb-4" />
                  
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <Button onClick={resetProgress} variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Rozpocznij ponownie
                      </Button>
                    ) : (
                      <Button onClick={markAsCompleted} size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Oznacz jako ukończone
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Pobierz materiały
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Course Thumbnail */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  {course.thumbnail_url ? (
                    <img 
                      src={course.thumbnail_url} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="lg" className="rounded-full">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold mb-2">Zawartość kursu</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span>{courseSections.length} sekcji</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration_minutes} minut materiału</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>1,234 uczniów</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Content */}
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList>
            <TabsTrigger value="content">Zawartość</TabsTrigger>
            <TabsTrigger value="syllabus">Program</TabsTrigger>
            <TabsTrigger value="reviews">Opinie</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Materiał kursu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-foreground leading-relaxed">
                    {course.content || `
To jest przykładowa zawartość kursu "${course.title}".

W tym kursie nauczysz się:

• Podstawowych koncepcji i zasad
• Praktycznych zastosowań w prawdziwych projektach  
• Najlepszych praktyk i technik
• Jak unikać typowych błędów
• Zaawansowanych strategii i metod

Kurs składa się z ${courseSections.length} głównych sekcji:

1. **Wprowadzenie** - Poznasz podstawowe koncepcje i przygotowujemy środowisko pracy
2. **Teoria** - Zgłębimy teoretyczne aspekty i zrozumiemy mechanizmy działania
3. **Praktyka** - Zastosujemy wiedzę w rzeczywistych projektach i ćwiczeniach
4. **Podsumowanie** - Przeanalizujemy najważniejsze punkty i zaplanujemy dalsze kroki

Po ukończeniu tego kursu będziesz potrafił samodzielnie wykorzystywać poznane narzędzia i techniki w swoich projektach.
                    `}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="syllabus" className="space-y-4">
            {courseSections.map((section, index) => (
              <Card key={section.id} className={`cursor-pointer transition-colors ${currentSection === section.id ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentSection >= section.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {currentSection > section.id ? <CheckCircle className="h-4 w-4" /> : section.id}
                      </div>
                      <div>
                        <h3 className="font-medium">{section.title}</h3>
                        <p className="text-sm text-muted-foreground">{section.duration} minut</p>
                      </div>
                    </div>
                    <Button 
                      variant={currentSection === section.id ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setCurrentSection(section.id)}
                    >
                      {currentSection === section.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Opinie uczniów</CardTitle>
                <CardDescription>Zobacz co mówią inni o tym kursie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { name: "Anna Kowalska", rating: 5, comment: "Świetny kurs! Bardzo praktyczne podejście i jasne wytłumaczenie trudnych tematów." },
                    { name: "Marcin Nowak", rating: 5, comment: "Polecam każdemu kto chce nauczyć się AI. Instruktor ma świetne podejście." },
                    { name: "Katarzyna Baran", rating: 4, comment: "Dobry kurs, ale mógłby być trochę dłuższy. Więcej przykładów praktycznych by się przydało." }
                  ].map((review, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{review.name}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'fill-current text-yellow-500' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CoursePage;