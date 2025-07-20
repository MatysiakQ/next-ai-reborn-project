-- Update courses with thumbnail URLs using Unsplash placeholders
UPDATE courses SET 
  thumbnail_url = CASE 
    WHEN title = 'Wprowadzenie do AI' THEN 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop'
    WHEN title = 'Pierwsze kroki z ChatGPT' THEN 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop'
    WHEN title = 'AI w biznesie - podstawy' THEN 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop'
    WHEN title = 'Zaawansowane prompty w AI' THEN 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop'
    WHEN title = 'AI w marketingu' THEN 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop'
    WHEN title = 'Automatyzacja z AI' THEN 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop'
    WHEN title = 'AI dla e-commerce' THEN 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop'
    WHEN title = 'Machine Learning dla biznesu' THEN 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop'
    WHEN title = 'Tworzenie chatbotów AI' THEN 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop'
    WHEN title = 'AI w analizie danych' THEN 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop'
    WHEN title = 'Własny model AI' THEN 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop'
    WHEN title = 'AI Strategy & ROI' THEN 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop'
    ELSE thumbnail_url
  END
WHERE title IN ('Wprowadzenie do AI', 'Pierwsze kroki z ChatGPT', 'AI w biznesie - podstawy', 'Zaawansowane prompty w AI', 'AI w marketingu', 'Automatyzacja z AI', 'AI dla e-commerce', 'Machine Learning dla biznesu', 'Tworzenie chatbotów AI', 'AI w analizie danych', 'Własny model AI', 'AI Strategy & ROI');