-- Drop the current problematic policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create security definer function to get current user's admin status
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if the current user is an admin by directly querying without RLS
  RETURN EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Create new admin policy using the security definer function
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (
  public.is_current_user_admin() OR auth.uid() = user_id
);