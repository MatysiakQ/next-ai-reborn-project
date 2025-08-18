-- Napraw problemy bezpieczeństwa - ustaw search_path dla funkcji
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
  current_year TEXT;
  current_month TEXT;
  sequence_num INTEGER;
BEGIN
  current_year := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;
  current_month := LPAD(EXTRACT(MONTH FROM CURRENT_DATE)::TEXT, 2, '0');
  
  -- Znajdź kolejny numer w sekwencji dla tego miesiąca
  SELECT COALESCE(MAX(
    CASE 
      WHEN invoice_number ~ ('^INV-' || current_year || current_month || '-[0-9]+$')
      THEN (regexp_match(invoice_number, '^INV-' || current_year || current_month || '-([0-9]+)$'))[1]::INTEGER
      ELSE 0
    END
  ), 0) + 1
  INTO sequence_num
  FROM public.invoices
  WHERE invoice_number LIKE 'INV-' || current_year || current_month || '-%';
  
  RETURN 'INV-' || current_year || current_month || '-' || LPAD(sequence_num::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

CREATE OR REPLACE FUNCTION set_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invoice_number IS NULL THEN
    NEW.invoice_number := generate_invoice_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

CREATE OR REPLACE FUNCTION update_admin_stats()
RETURNS void AS $$
DECLARE
  today_date DATE := CURRENT_DATE;
  revenue INTEGER;
  users INTEGER;
  subscriptions INTEGER;
  signups INTEGER;
  completions INTEGER;
BEGIN
  -- Oblicz dzisiejszy przychód
  SELECT COALESCE(SUM(amount), 0) INTO revenue
  FROM public.payments
  WHERE DATE(created_at) = today_date AND status = 'succeeded';
  
  -- Oblicz całkowitą liczbę użytkowników
  SELECT COUNT(*) INTO users FROM public.profiles;
  
  -- Oblicz aktywne subskrypcje
  SELECT COUNT(*) INTO subscriptions
  FROM public.user_subscriptions
  WHERE is_subscribed = true;
  
  -- Oblicz dzisiejsze rejestracje
  SELECT COUNT(*) INTO signups
  FROM public.profiles
  WHERE DATE(created_at) = today_date;
  
  -- Ustaw completion na 0 (można rozszerzyć w przyszłości)
  completions := 0;
  
  -- Upsert statystyk
  INSERT INTO public.admin_stats (stat_date, total_revenue, total_users, active_subscriptions, new_signups, course_completions)
  VALUES (today_date, revenue, users, subscriptions, signups, completions)
  ON CONFLICT (stat_date)
  DO UPDATE SET
    total_revenue = EXCLUDED.total_revenue,
    total_users = EXCLUDED.total_users,
    active_subscriptions = EXCLUDED.active_subscriptions,
    new_signups = EXCLUDED.new_signups,
    course_completions = EXCLUDED.course_completions,
    created_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public, pg_temp
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;