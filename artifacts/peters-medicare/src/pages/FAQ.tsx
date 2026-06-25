import { useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { useLanguage } from "@/context/LanguageContext";
import { faqItems, faqCategories } from "@/data/faq";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Search, Phone, MessageCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FAQ() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useSEO({
    title: "FAQ | Peters Medicare Services — Common Questions Answered",
    description: "Answers to common questions about Peters Medicare Services in Kyenjojo, Uganda — fees, opening hours, services, booking, insurance, maternity care, and more.",
    canonical: "https://medicare-services-hub-1--derickasiimwe84.replit.app/faq",
  });

  const filteredFaqs = faqItems.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const searchLower = searchQuery.toLowerCase();
    const qText = lang === 'rn' ? faq.questionRn : faq.question;
    const aText = lang === 'rn' ? faq.answerRn : faq.answer;
    
    const matchesSearch = 
      qText.toLowerCase().includes(searchLower) || 
      aText.toLowerCase().includes(searchLower);
      
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-8 pb-20">
      {/* Hero */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">Everything you need to know before your visit</p>
          
          <div className="mt-8 relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-input bg-background shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <div className="lg:w-1/4 shrink-0">
            <div className="sticky top-32 space-y-2 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
              {faqCategories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-left ${
                    activeCategory === category.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-primary/10 text-foreground"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="lg:w-3/4">
            {filteredFaqs.length > 0 ? (
              <Accordion type="multiple" className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id} 
                    className="border rounded-xl bg-card px-6 shadow-sm overflow-hidden"
                    data-testid={`faq-item-${faq.id}`}
                  >
                    <AccordionTrigger className="text-left font-medium text-base hover:no-underline py-5">
                      {lang === 'rn' ? faq.questionRn : faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {lang === 'rn' ? faq.answerRn : faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-16 bg-muted/30 rounded-2xl border border-dashed">
                <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-foreground mb-2">No matching questions</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try different words, or call us on 0776 004 277 for immediate assistance.
                </p>
              </div>
            )}
            
            <div className="mt-16 bg-primary/5 rounded-2xl p-8 text-center border border-primary/10">
              <h3 className="text-xl font-serif font-bold text-foreground mb-3">Still have questions?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Our medical team is ready to help you with any inquiries you might have.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="gap-2">
                  <a href="tel:+256776004277">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2 border-green-600 text-green-700 hover:bg-green-50 dark:hover:bg-green-950/30">
                  <a href="https://wa.me/256776004277" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}