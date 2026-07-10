import { useSEO } from "@/hooks/use-seo";
import { Link } from "wouter";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Baby, FlaskConical, Activity, Users, ArrowRight } from "lucide-react";

import medImg from "@/assets/images/service-medical.webp";
import matImg from "@/assets/images/service-maternal.webp";
import labImg from "@/assets/images/service-lab.webp";
import dentImg from "@/assets/images/service-dental.png";

const iconMap: Record<string, any> = {
  Stethoscope,
  Baby,
  FlaskConical,
  Activity,
  Users
};

const imageMap: Record<string, string> = {
  medical: medImg,
  maternal: matImg,
  diagnostics: labImg,
  specialized: dentImg,
  outreach: medImg // fallback
};

export function Services() {
  useSEO({
    title: "Medical Services | Peters Medicare Services Kyenjojo",
    description: "General medicine, maternal & antenatal care, laboratory diagnostics, dental, eye clinic, HIV testing and more. Affordable healthcare serving Kyenjojo, Kyegegwa, Kibaale and the Rwenzori region.",
    canonical: "https://medicare-services-hub-1--derickasiimwe84.replit.app/services",
  });

  return (
    <div className="w-full pb-24">
      {/* Header */}
      <section className="bg-primary/5 py-16 md:py-24 border-b">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">Our Medical Services</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Comprehensive, professional, and affordable healthcare tailored to the needs of our community.
          </p>
        </div>
      </section>

      {/* Services List */}
      <div className="container mx-auto px-4 md:px-6 pt-16 space-y-24">
        {services.map((section, index) => {
          const Icon = iconMap[section.icon];
          const isEven = index % 2 === 1;

          return (
            <div key={section.id} id={section.id} className="scroll-mt-32">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isEven ? "lg:flex-row-reverse" : ""}`}>
                
                <div className={isEven ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold">{section.category}</h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {section.description}
                  </p>
                  
                  <div className="space-y-4">
                    {section.items.map((item, i) => (
                      <Card key={i} className="border-l-4 border-l-primary shadow-sm">
                        <CardContent className="p-5">
                          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {section.id === "outreach" && (
                    <Button asChild variant="outline" className="mt-8">
                      <Link href="/outreach" className="flex items-center gap-2">
                        Learn more about CHEIU <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  )}
                </div>

                <div className={`rounded-2xl overflow-hidden shadow-xl aspect-[4/3] ${isEven ? "lg:order-1" : ""}`}>
                  <img 
                    src={imageMap[section.id]} 
                    alt={section.category} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  />
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Bottom */}
      <section className="container mx-auto px-4 md:px-6 mt-32">
        <div className="bg-primary rounded-3xl p-8 md:p-12 text-center text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-4">Need medical attention?</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">Our doctors are ready to assist you. View our affordable pricing or book an appointment directly.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="secondary" size="lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white">
                <Link href="/contact">Contact Clinic</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
