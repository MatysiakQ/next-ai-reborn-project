import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Clock, 
  Lock, 
  Play,
  CheckCircle,
  Star,
  TrendingUp,
  ArrowLeft
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

interface Course {
  id: string;
  title: string;
  description: string;
  content: string;
  difficulty_level: string;
  duration_minutes: number;
  is_premium: boolean;
  is_published: boolean;
  required_subscription_tier: string;
  order_index: number;
  thumbnail_url?: string;
}

interface UserAccess {
  course_id: string;
  expires_at?: string;
}

const Courses = () => {
  const { user, subscription } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [userAccess, setUserAccess] = useState<UserAccess[]>([]);
  const [loading, setLoading] = useState(true);

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

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('order_index');

      if (coursesError) throw coursesError;
      setCourses(coursesData || []);

      // Fetch user's course access if logged in
      if (user) {
        const { data: accessData, error: accessError } = await supabase
          .from('user_course_access')
          .select('course_id, expires_at')
          .eq('user_id', user.id);

        if (accessError) throw accessError;
        setUserAccess(accessData || []);
      }

    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać listy kursów.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const startCourse = (course: Course) => {
    if (!hasAccessToTier(course.required_subscription_tier)) {
      toast({
        title: "Brak dostępu",
        description: "Ten kurs wymaga wykupienia odpowiedniego pakietu.",
        variant: "destructive"
      });
      navigate('/#packages');
      return;
    }

    toast({
      title: "Rozpoczynanie kursu",
      description: `Uruchamianie kursu: ${course.title}`,
    });
  };

  useEffect(() => {
    fetchCourses();
  }, [user, subscription]);

  const groupedCourses = {
    free: courses.filter(course => course.required_subscription_tier === 'free'),
    basic: courses.filter(course => course.required_subscription_tier === 'basic'),
    pro: courses.filter(course => course.required_subscription_tier === 'pro')
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'free': return <BookOpen className="h-5 w-5" />;
      case 'basic': return <Star className="h-5 w-5" />;
      case 'pro': return <TrendingUp className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case 'free': return 'Darmowe';
      case 'basic': return 'Basic';
      case 'pro': return 'Pro';
      default: return 'Nieznany';
    }
  };

  const CourseCard = ({ course }: { course: Course }) => {
    const hasAccess = hasAccessToTier(course.required_subscription_tier);
    const userHasSpecificAccess = userAccess.some(access => access.course_id === course.id);
    const isAccessible = hasAccess || userHasSpecificAccess;

    return (
      <Card className={`transition-all duration-200 hover:shadow-lg ${!isAccessible ? 'opacity-60' : ''}`}>
        <CardHeader>
          <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden relative">
            {course.thumbnail_url ? (
              <img 
                src={course.thumbnail_url} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            
            {!isAccessible && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2 flex items-center gap-2">
                {course.title}
                {!isAccessible && <Lock className="h-4 w-4 text-muted-foreground" />}
              </CardTitle>
              <CardDescription className="text-sm">
                {course.description}
              </CardDescription>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-3">
            <Badge variant="outline" className="text-xs">
              <div className={`w-2 h-2 rounded-full mr-1 ${getDifficultyColor(course.difficulty_level)}`} />
              {course.difficulty_level === 'beginner' ? 'Początkujący' : 
               course.difficulty_level === 'intermediate' ? 'Średniozaawansowany' : 'Zaawansowany'}
            </Badge>
            
            <Badge variant="secondary" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {course.duration_minutes} min
            </Badge>

            <Badge variant={course.required_subscription_tier === 'free' ? 'default' : 'destructive'} className="text-xs">
              {getTierLabel(course.required_subscription_tier)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {/* Progress bar placeholder */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Postęp</span>
                <span className="text-muted-foreground">0%</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>

            <Button 
              className="w-full"
              onClick={() => startCourse(course)}
              disabled={!isAccessible}
              variant={isAccessible ? "default" : "outline"}
            >
              {isAccessible ? (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Rozpocznij kurs
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Wymaga {getTierLabel(course.required_subscription_tier)}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const CourseSection = ({ tier, title, icon }: { tier: string; title: string; icon: React.ReactNode }) => {
    const sectionCourses = groupedCourses[tier as keyof typeof groupedCourses];
    const hasAccess = hasAccessToTier(tier);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg ${hasAccess ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
            {icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground">
              {sectionCourses.length} {sectionCourses.length === 1 ? 'kurs' : 'kursów'}
              {!hasAccess && tier !== 'free' && ' - Wymaga subskrypcji'}
            </p>
          </div>
          {hasAccess && (
            <CheckCircle className="h-6 w-6 text-green-500 ml-auto" />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectionCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Powrót do dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Kursy NextAI</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Rozwijaj swoje umiejętności AI z naszymi strukturalnymi kursami
          </p>

          {/* User status info */}
          {user && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Twój plan</h3>
                    <p className="text-muted-foreground">
                      {subscription?.is_subscribed 
                        ? `Plan ${subscription.subscription_plan?.name}` 
                        : 'Plan darmowy'
                      }
                    </p>
                  </div>
                  {!subscription?.is_subscribed && (
                    <Button onClick={() => navigate('/#packages')}>
                      Wykup subskrypcję
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Wszystkie</TabsTrigger>
            <TabsTrigger value="free">Darmowe</TabsTrigger>
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="pro">Pro</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-12">
            <CourseSection 
              tier="free" 
              title="Kursy darmowe" 
              icon={<BookOpen className="h-5 w-5" />} 
            />
            <CourseSection 
              tier="basic" 
              title="Kursy Basic" 
              icon={<Star className="h-5 w-5" />} 
            />
            <CourseSection 
              tier="pro" 
              title="Kursy Pro" 
              icon={<TrendingUp className="h-5 w-5" />} 
            />
          </TabsContent>

          <TabsContent value="free">
            <CourseSection 
              tier="free" 
              title="Kursy darmowe" 
              icon={<BookOpen className="h-5 w-5" />} 
            />
          </TabsContent>

          <TabsContent value="basic">
            <CourseSection 
              tier="basic" 
              title="Kursy Basic" 
              icon={<Star className="h-5 w-5" />} 
            />
          </TabsContent>

          <TabsContent value="pro">
            <CourseSection 
              tier="pro" 
              title="Kursy Pro" 
              icon={<TrendingUp className="h-5 w-5" />} 
            />
          </TabsContent>
        </Tabs>

        {/* CTA for non-subscribers */}
        {(!user || !subscription?.is_subscribed) && (
          <Card className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Odblokuj wszystkie kursy</h3>
              <p className="text-muted-foreground mb-6">
                Wykup subskrypcję i uzyskaj dostęp do wszystkich kursów AI
              </p>
              <Button size="lg" onClick={() => navigate('/#packages')}>
                Zobacz pakiety
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Courses;