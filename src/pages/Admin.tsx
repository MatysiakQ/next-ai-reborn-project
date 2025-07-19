import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  BookOpen, 
  Settings, 
  Plus,
  Edit3,
  Trash2,
  DollarSign,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  duration_minutes: number;
  is_premium: boolean;
  is_published: boolean;
  created_at: string;
}

interface User {
  id: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  created_at: string;
}

interface Subscription {
  id: string;
  user_id: string;
  status: string;
  subscription_plan_id: string;
  current_period_end: string;
  profiles: {
    email: string;
    full_name: string;
  } | null;
  subscription_plans: {
    name: string;
    price_monthly: number;
  } | null;
}

const Admin = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0
  });

  // Check if user is admin
  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (profile && !profile.is_admin) {
      toast({
        title: "Brak dostępu",
        description: "Nie masz uprawnień administratora.",
        variant: "destructive"
      });
      navigate('/dashboard');
      return;
    }
  }, [user, profile, navigate, toast]);

  const fetchData = async () => {
    if (!profile?.is_admin) return;
    
    setLoading(true);
    try {
      // Fetch courses
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (coursesError) throw coursesError;
      setCourses(coursesData || []);

      // Fetch users
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;
      setUsers(usersData || []);

      // Fetch subscriptions
      const { data: subscriptionsData, error: subscriptionsError } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          profiles:user_id (email, full_name),
          subscription_plans:subscription_plan_id (name, price_monthly)
        `)
        .order('created_at', { ascending: false });

      if (subscriptionsError) throw subscriptionsError;
      setSubscriptions((subscriptionsData as any) || []);

      // Calculate stats
      const activeSubsCount = subscriptionsData?.filter(sub => sub.status === 'active').length || 0;
      const monthlyRev = subscriptionsData
        ?.filter(sub => sub.status === 'active')
        .reduce((sum, sub) => sum + (sub.subscription_plans?.price_monthly || 0), 0) || 0;

      setStats({
        totalUsers: usersData?.length || 0,
        totalCourses: coursesData?.length || 0,
        activeSubscriptions: activeSubsCount,
        monthlyRevenue: monthlyRev / 100 // Convert from cents
      });

    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać danych administratora.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleCourseStatus = async (courseId: string, isPublished: boolean) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ is_published: !isPublished })
        .eq('id', courseId);

      if (error) throw error;

      toast({
        title: "Sukces",
        description: `Kurs został ${!isPublished ? 'opublikowany' : 'ukryty'}.`,
      });

      fetchData();
    } catch (error) {
      console.error('Error updating course:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się zaktualizować kursu.",
        variant: "destructive"
      });
    }
  };

  const toggleUserAdmin = async (userId: string, isAdmin: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !isAdmin })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Sukces",
        description: `Uprawnienia administratora zostały ${!isAdmin ? 'nadane' : 'odebrane'}.`,
      });

      fetchData();
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się zaktualizować uprawnień użytkownika.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (profile?.is_admin) {
      fetchData();
    }
  }, [profile]);

  if (!user || !profile?.is_admin) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Panel Administratora</h1>
        <p className="text-muted-foreground">Zarządzaj kursami, użytkownikami i subskrypcjami</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Użytkownicy</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kursy</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktywne Subskrypcje</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Przychód/miesiąc</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthlyRevenue.toFixed(2)} zł</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Kursy</TabsTrigger>
          <TabsTrigger value="users">Użytkownicy</TabsTrigger>
          <TabsTrigger value="subscriptions">Subskrypcje</TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Zarządzanie Kursami</CardTitle>
                  <CardDescription>Dodawaj, edytuj i publikuj kursy</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Dodaj Kurs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={course.is_published ? "default" : "secondary"}>
                          {course.is_published ? "Opublikowany" : "Szkic"}
                        </Badge>
                        <Badge variant={course.is_premium ? "destructive" : "outline"}>
                          {course.is_premium ? "Premium" : "Darmowy"}
                        </Badge>
                        <Badge variant="outline">
                          {course.difficulty_level}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleCourseStatus(course.id, course.is_published)}
                      >
                        {course.is_published ? "Ukryj" : "Publikuj"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Zarządzanie Użytkownikami</CardTitle>
              <CardDescription>Przeglądaj i zarządzaj kontami użytkowników</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{user.full_name || user.email}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Dołączył: {new Date(user.created_at).toLocaleDateString('pl-PL')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.is_admin ? "destructive" : "outline"}>
                        {user.is_admin ? "Administrator" : "Użytkownik"}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleUserAdmin(user.id, user.is_admin)}
                      >
                        {user.is_admin ? "Usuń Admin" : "Nadaj Admin"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>Zarządzanie Subskrypcjami</CardTitle>
              <CardDescription>Przeglądaj aktywne subskrypcje użytkowników</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {subscription.profiles?.full_name || subscription.profiles?.email}
                      </h3>
                      <p className="text-sm text-muted-foreground">{subscription.profiles?.email}</p>
                      <p className="text-sm mt-1">
                        Plan: {subscription.subscription_plans?.name} - 
                        {(subscription.subscription_plans?.price_monthly / 100).toFixed(2)} zł/mies.
                      </p>
                      {subscription.current_period_end && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Kończy się: {new Date(subscription.current_period_end).toLocaleDateString('pl-PL')}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={subscription.status === 'active' ? "default" : "secondary"}>
                        {subscription.status === 'active' ? "Aktywna" : subscription.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;