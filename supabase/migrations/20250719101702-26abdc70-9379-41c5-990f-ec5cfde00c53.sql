-- Update subscription plans with Stripe price IDs for testing
-- These are test price IDs - in production, you'll need to create actual products in Stripe

UPDATE subscription_plans 
SET 
  stripe_price_id_monthly = CASE 
    WHEN name = 'Basic' THEN 'price_1OTest1Basic'
    WHEN name = 'Pro' THEN 'price_1OTest2Pro' 
    WHEN name = 'Enterprise' THEN 'price_1OTest3Enterprise'
  END,
  stripe_price_id_yearly = CASE 
    WHEN name = 'Basic' THEN 'price_1OTestYear1Basic'
    WHEN name = 'Pro' THEN 'price_1OTestYear2Pro'
    WHEN name = 'Enterprise' THEN 'price_1OTestYear3Enterprise'
  END
WHERE name IN ('Basic', 'Pro', 'Enterprise');