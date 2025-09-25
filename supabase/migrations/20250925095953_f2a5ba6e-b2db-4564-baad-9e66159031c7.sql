-- Drop the problematic admin policy that causes infinite recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create a simplified admin policy that doesn't reference profiles table within itself
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM public.profiles p
    WHERE p.user_id = auth.uid() 
    AND p.is_admin = true
  )
  OR auth.uid() = user_id  -- Users can always see their own profile
);