
-- Napraw polityki RLS dla tabeli profiles aby uniknąć nieskończonej rekursji
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Utwórz nową politykę dla adminów bez rekursji
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.id IN (
      SELECT user_id FROM public.profiles 
      WHERE is_admin = true 
      AND user_id = auth.uid()
    )
  )
);

-- Polityka dla użytkowników do przeglądania własnego profilu
CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

-- Dodaj politykę INSERT dla automatycznego tworzenia profili
CREATE POLICY "Enable insert for authenticated users" ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);
