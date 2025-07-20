-- Add subscription tier column to courses table
ALTER TABLE courses ADD COLUMN required_subscription_tier TEXT DEFAULT 'free';

-- Update existing courses with appropriate tiers
UPDATE courses SET required_subscription_tier = 'free' WHERE is_premium = false;
UPDATE courses SET required_subscription_tier = 'basic' WHERE is_premium = true AND difficulty_level = 'intermediate';
UPDATE courses SET required_subscription_tier = 'pro' WHERE is_premium = true AND difficulty_level = 'advanced';