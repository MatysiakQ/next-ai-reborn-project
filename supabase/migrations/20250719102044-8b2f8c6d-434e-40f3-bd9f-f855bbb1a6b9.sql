-- Add admin privileges to the first user for testing
-- You can change this email to your own email address
UPDATE profiles 
SET is_admin = true 
WHERE email = (
  SELECT email 
  FROM profiles 
  ORDER BY created_at 
  LIMIT 1
);