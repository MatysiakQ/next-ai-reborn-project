import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigate, Link } from 'react-router-dom';
import { BookOpen, Clock, Star, Lock, Play, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  duration_minutes: number;
  is_premium: boolean;
  thumbnail_url?: string;
  content?: string;
  video_url?: string;
}

const Courses = () => {
  const { user, subscription, loading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  // Redirect if not logged in
  if (!user && !loading) {
    return <Navigate to="/auth" replace />;
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('is_published', true)
          .order('order_index', { ascending: true });

        if (error) throw error;
        setCourses(data || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setCoursesLoading(false);
      }
    };

    if (user) {
      fetchCourses();
    }
  }, [user]);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'default';
      case 'intermediate': return 'secondary';
      case 'advanced': return 'destructive';
      default: return 'default';
    }
  };

  const getDifficultyLabel = (level: string) => {
    switch (level) {
      case 'beginner': return 'Początkujący';
      case 'intermediate': return 'Średnio zaawansowany';
      case 'advanced': return 'Zaawansowany';
      default: return 'Nieznany';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  const hasAccess = (course: Course) => {
    if (!course.is_premium) return true;
    return subscription?.is_subscribed === true;
  };

  if (loading || coursesLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót do dashboard
          </Link>
          
          <div className="flex items-center space-x-4 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Kursy AI</h1>
              <p className="text-muted-foreground">Poznaj świat sztucznej inteligencji</p>
            </div>
          </div>

          {!subscription?.is_subscribed && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-primary">Wykup plan aby uzyskać pełny dostęp</h3>
                  <p className="text-sm text-muted-foreground">
                    Niektóre kursy wymagają aktywnej subskrypcji
                  </p>
                </div>
                <Link to="/#packages">
                  <Button>Zobacz plany</Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const courseHasAccess = hasAccess(course);
            
            return (
              <Card key={course.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="aspect-video bg-muted rounded-md mb-3 overflow-hidden">
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
                    
                    {!courseHasAccess && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Lock className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={getDifficultyColor(course.difficulty_level) as any}>
                      {getDifficultyLabel(course.difficulty_level)}
                    </Badge>
                    {course.is_premium && (
                      <Badge variant="outline" className="text-primary border-primary">
                        Premium
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="line-clamp-3 mb-4">
                    {course.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDuration(course.duration_minutes || 0)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span>4.8</span>
                    </div>
                  </div>
                  
                  {courseHasAccess ? (
                    <Link to={`/course/${course.id}`}>
                      <Button className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Rozpocznij kurs
                      </Button>
                    </Link>
                  ) : (
                    <div className="space-y-2">
                      <Button disabled className="w-full">
                        <Lock className="mr-2 h-4 w-4" />
                        Wymagana subskrypcja
                      </Button>
                      <Link to="/#packages">
                        <Button variant="outline" className="w-full">
                          Wykup plan
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Brak dostępnych kursów</h3>
            <p className="text-muted-foreground">
              Kursy będą wkrótce dodane. Sprawdź ponownie później.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;