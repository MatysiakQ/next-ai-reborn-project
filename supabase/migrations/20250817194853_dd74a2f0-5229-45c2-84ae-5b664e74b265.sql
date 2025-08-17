-- Utwórz tabelę płatności dla lepszego śledzenia
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_session_id TEXT,
  amount INTEGER NOT NULL, -- kwota w groszach
  currency TEXT DEFAULT 'PLN',
  status TEXT NOT NULL DEFAULT 'pending', -- pending, succeeded, failed, canceled
  payment_type TEXT NOT NULL DEFAULT 'subscription', -- subscription, one_time, course_access
  description TEXT,
  invoice_number TEXT UNIQUE,
  invoice_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Utwórz tabelę dla faktur
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID REFERENCES public.payments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  invoice_number TEXT UNIQUE NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'PLN',
  tax_amount INTEGER DEFAULT 0,
  net_amount INTEGER NOT NULL,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL DEFAULT (CURRENT_DATE + INTERVAL '14 days'),
  status TEXT NOT NULL DEFAULT 'draft', -- draft, sent, paid, overdue, canceled
  pdf_url TEXT,
  billing_address JSONB,
  line_items JSONB NOT NULL DEFAULT '[]',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Utwórz tabelę dla statystyk administratora
CREATE TABLE public.admin_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_revenue INTEGER DEFAULT 0,
  total_users INTEGER DEFAULT 0,
  active_subscriptions INTEGER DEFAULT 0,
  new_signups INTEGER DEFAULT 0,
  course_completions INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(stat_date)
);

-- Enable RLS na wszystkich tabelach
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_stats ENABLE ROW LEVEL SECURITY;

-- Polityki RLS dla payments
CREATE POLICY "Users can view own payments" ON public.payments
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all payments" ON public.payments
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true)
);

CREATE POLICY "Service can manage payments" ON public.payments
FOR ALL USING (true);

-- Polityki RLS dla invoices
CREATE POLICY "Users can view own invoices" ON public.invoices
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all invoices" ON public.invoices
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true)
);

CREATE POLICY "Service can manage invoices" ON public.invoices
FOR ALL USING (true);

-- Polityki RLS dla admin_stats
CREATE POLICY "Admins can view stats" ON public.admin_stats
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true)
);

CREATE POLICY "Service can manage stats" ON public.admin_stats
FOR ALL USING (true);

-- Funkcja do automatycznego generowania numerów faktur
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
$$ LANGUAGE plpgsql;

-- Trigger do automatycznego generowania numerów faktur
CREATE OR REPLACE FUNCTION set_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invoice_number IS NULL THEN
    NEW.invoice_number := generate_invoice_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_invoice_number_trigger
  BEFORE INSERT ON public.invoices
  FOR EACH ROW
  EXECUTE FUNCTION set_invoice_number();

-- Funkcja do aktualizacji statystyk
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
$$ LANGUAGE plpgsql SECURITY DEFINER;