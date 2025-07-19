-- Add sample courses for different subscription tiers
-- Free courses (available to everyone)
INSERT INTO courses (title, description, content, difficulty_level, duration_minutes, is_premium, is_published, order_index, thumbnail_url) VALUES
('Wprowadzenie do AI', 'Podstawy sztucznej inteligencji - czym jest AI i jak działa?', 'W tym kursie poznasz podstawy sztucznej inteligencji, jej historię i zastosowania w życiu codziennym.', 'beginner', 45, false, true, 1, null),
('Pierwsze kroki z ChatGPT', 'Jak skutecznie korzystać z ChatGPT w pracy i nauce', 'Praktyczny przewodnik po najważniejszych funkcjach ChatGPT i sposobach ich wykorzystania.', 'beginner', 30, false, true, 2, null),
('AI w biznesie - podstawy', 'Jak AI może pomóc w rozwoju Twojego biznesu', 'Poznaj praktyczne zastosowania AI w różnych branżach i zobacz jak można je wykorzystać.', 'beginner', 60, false, true, 3, null);

-- Basic tier courses (requires Basic subscription or higher)
INSERT INTO courses (title, description, content, difficulty_level, duration_minutes, is_premium, is_published, order_index, thumbnail_url) VALUES
('Zaawansowane prompty w AI', 'Techniki tworzenia skutecznych promptów dla różnych zadań', 'Naucz się tworzyć prompty, które dają najlepsze rezultaty w różnych modelach AI.', 'intermediate', 75, true, true, 4, null),
('AI w marketingu', 'Wykorzystanie AI do automatyzacji marketingu i generowania treści', 'Kompleksowy kurs o wykorzystaniu AI w kampaniach marketingowych i content marketingu.', 'intermediate', 90, true, true, 5, null),
('Automatyzacja z AI', 'Tworzenie prostych automatyzacji z wykorzystaniem AI', 'Praktyczne przykłady automatyzacji procesów biznesowych przy pomocy narzędzi AI.', 'intermediate', 120, true, true, 6, null),
('AI dla e-commerce', 'Optymalizacja sklepu internetowego przy pomocy AI', 'Dowiedz się jak AI może zwiększyć sprzedaż w Twoim sklepie internetowym.', 'intermediate', 80, true, true, 7, null);

-- Pro tier courses (requires Pro subscription)
INSERT INTO courses (title, description, content, difficulty_level, duration_minutes, is_premium, is_published, order_index, thumbnail_url) VALUES
('Machine Learning dla biznesu', 'Implementacja własnych modeli ML w firmie', 'Zaawansowany kurs o tworzeniu i wdrażaniu modeli uczenia maszynowego.', 'advanced', 180, true, true, 8, null),
('Tworzenie chatbotów AI', 'Budowanie inteligentnych asystentów dla Twojej firmy', 'Praktyczny kurs tworzenia chatbotów z wykorzystaniem najnowszych technologii AI.', 'advanced', 150, true, true, 9, null),
('AI w analizie danych', 'Zaawansowana analiza danych z wykorzystaniem AI', 'Naucz się wykorzystywać AI do głębokiej analizy danych biznesowych.', 'advanced', 200, true, true, 10, null),
('Własny model AI', 'Trenowanie i dostrajanie własnych modeli językowych', 'Najzaawansowany kurs o tworzeniu i trenowaniu własnych modeli AI.', 'advanced', 240, true, true, 11, null),
('AI Strategy & ROI', 'Strategia wdrażania AI w przedsiębiorstwie', 'Kompleksowy przewodnik po planowaniu i wdrażaniu strategii AI w firmie.', 'advanced', 160, true, true, 12, null);