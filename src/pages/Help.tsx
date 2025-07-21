import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, HelpCircle, BookOpen, MessageCircle, Mail, Phone } from 'lucide-react';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      title: "Pierwsze kroki",
      icon: <BookOpen className="h-5 w-5" />,
      articles: [
        { title: "Jak zacząć korzystać z NextAI?", category: "Podstawy" },
        { title: "Tworzenie konta i logowanie", category: "Podstawy" },
        { title: "Wybór odpowiedniego planu subskrypcji", category: "Płatności" },
        { title: "Nawigacja po platformie", category: "Podstawy" }
      ]
    },
    {
      title: "Kursy i nauka",
      icon: <HelpCircle className="h-5 w-5" />,
      articles: [
        { title: "Jak zapisać się na kurs?", category: "Kursy" },
        { title: "Śledzenie postępów w nauce", category: "Kursy" },
        { title: "Pobieranie certyfikatów", category: "Certyfikaty" },
        { title: "Problemy z odtwarzaniem video", category: "Techniczne" }
      ]
    },
    {
      title: "Płatności i subskrypcje",
      icon: <MessageCircle className="h-5 w-5" />,
      articles: [
        { title: "Jak zmienić plan subskrypcji?", category: "Płatności" },
        { title: "Anulowanie subskrypcji", category: "Płatności" },
        { title: "Problemy z płatnością", category: "Płatności" },
        { title: "Faktury i rozliczenia", category: "Płatności" }
      ]
    }
  ];

  const faqs = [
    {
      question: "Czym jest NextAI?",
      answer: "NextAI to platforma edukacyjna specializująca się w kursach dotyczących sztucznej inteligencji. Oferujemy praktyczne kursy, które pomogą Ci zrozumieć i wykorzystać AI w codziennej pracy i życiu."
    },
    {
      question: "Czy kursy są dostępne offline?",
      answer: "Obecnie nasze kursy są dostępne tylko online. Planujemy wprowadzenie funkcji pobierania materiałów do użytku offline w przyszłości."
    },
    {
      question: "Jak długo mam dostęp do wykupionego kursu?",
      answer: "Dostęp do kursów jest ważny przez cały okres aktywnej subskrypcji. Po anulowaniu subskrypcji zachowujesz dostęp do końca opłaconego okresu."
    },
    {
      question: "Czy mogę zmienić plan subskrypcji?",
      answer: "Tak, możesz w każdej chwili zmienić plan subskrypcji w panelu użytkownika. Zmiany wchodzą w życie natychmiastowo."
    },
    {
      question: "Czy oferujecie wsparcie techniczne?",
      answer: "Tak, oferujemy wsparcie techniczne poprzez email oraz chat na żywo dla użytkowników planów Pro i Enterprise."
    }
  ];

  const filteredArticles = helpCategories.flatMap(category => 
    category.articles.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Centrum Pomocy</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Znajdź odpowiedzi na wszystkie pytania dotyczące NextAI
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Wyszukaj pomoc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Wyniki wyszukiwania</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map((article, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Help Categories */}
        {!searchQuery && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Kategorie pomocy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {helpCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      {category.icon}
                      <CardTitle>{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1">
                            {article.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Najczęściej zadawane pytania</h2>
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Kontakt Email</span>
              </CardTitle>
              <CardDescription>
                Wyślij nam wiadomość, odpowiemy w ciągu 24 godzin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                help@next-ai.pl
              </p>
              <Button variant="outline" className="w-full">
                Wyślij email
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Telefon</span>
              </CardTitle>
              <CardDescription>
                Zadzwoń do nas w godzinach 9:00-17:00
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                +48 123 456 789
              </p>
              <Button variant="outline" className="w-full">
                Zadzwoń teraz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;