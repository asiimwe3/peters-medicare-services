import { useSEO } from "@/hooks/use-seo";
import { Phone, MessageCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function Pricing() {
  useSEO({
    title: "Affordable Healthcare Pricing | Peters Medicare Services",
    description: "Transparent, affordable prices for all services. General consultation from UGX 5,000. Malaria RDT UGX 3,000. Safe delivery UGX 50,000. HIV testing free. Serving Kyenjojo, Uganda.",
    canonical: "https://medicare-services-hub-1--derickasiimwe84.replit.app/pricing",
  });

  const pricingCategories = [
    {
      title: "Consultations",
      items: [
        { name: "General Consultation", price: "UGX 5,000" },
        { name: "Specialist Referral Consultation", price: "UGX 10,000" },
      ]
    },
    {
      title: "Maternal Health",
      items: [
        { name: "Antenatal Visit", price: "UGX 10,000" },
        { name: "Normal Delivery", price: "UGX 50,000" },
        { name: "Family Planning (implant)", price: "UGX 15,000" },
      ]
    },
    {
      title: "Diagnostics",
      items: [
        { name: "Malaria RDT", price: "UGX 3,000" },
        { name: "Full Blood Count", price: "UGX 10,000" },
        { name: "Urinalysis", price: "UGX 5,000" },
        { name: "Ultrasound (obstetric)", price: "From UGX 20,000" },
        { name: "Ultrasound (abdominal)", price: "From UGX 25,000" },
      ]
    },
    {
      title: "HIV & Specialized",
      items: [
        { name: "HIV Counseling & Testing", price: "Free", highlight: true },
        { name: "Dental Extraction", price: "UGX 15,000" },
        { name: "Dental Scaling", price: "UGX 20,000" },
        { name: "Eye Examination", price: "UGX 10,000" },
      ]
    }
  ];

  return (
    <div className="w-full pb-24">
      {/* Header */}
      <section className="bg-primary/5 py-16 md:py-24 border-b">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">Transparent, Affordable Pricing</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            At Peters Medicare Services, we believe quality healthcare should be accessible to everyone. Our pricing is fair, transparent, and among the most affordable in the region.
          </p>
        </div>
      </section>

      {/* Pricing Tables */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {pricingCategories.map((category, i) => (
              <Card key={i} className="shadow-sm border-border/60">
                <CardHeader className="bg-muted/30 border-b pb-4">
                  <CardTitle className="font-serif text-xl text-primary">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y divide-border/40">
                    {category.items.map((item, j) => (
                      <li key={j} className="flex justify-between items-center p-4 md:px-6 hover:bg-muted/20 transition-colors">
                        <span className="font-medium text-foreground/90">{item.name}</span>
                        <span className={`font-bold ${item.highlight ? 'text-secondary' : 'text-foreground'}`}>
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 rounded-lg text-sm">
            <Info className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              <strong>Note:</strong> Prices are subject to change based on specific medical cases and required medication. We accept various local insurances. Please contact us directly for corporate or package rates.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="bg-card border rounded-3xl p-8 md:p-12 text-center shadow-lg max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Have questions about our pricing?</h2>
          <p className="text-muted-foreground mb-8 text-lg">Our reception team is happy to provide estimates for specific procedures or tests.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="h-14 px-8">
              <a href="tel:+256776004277" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="h-14 px-8">
              <a href="https://wa.me/256776004277" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
