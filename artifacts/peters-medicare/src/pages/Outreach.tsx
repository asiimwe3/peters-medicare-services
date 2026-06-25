import { useSEO } from "@/hooks/use-seo";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HeartHandshake, BookOpen, BrainCircuit, Users, Baby, Droplet } from "lucide-react";
import outreachHeroImg from "@/assets/images/outreach-hero.png";
import { OutreachCalendar } from "@/components/sections/OutreachCalendar";

export function Outreach() {
  useSEO({
    title: "Community Health Outreach | Peters Medicare Services Uganda",
    description: "Free health camps, maternal education, malaria prevention, HIV testing and community screenings across Kyenjojo, Kyegegwa and the Rwenzori region. See our outreach calendar.",
    canonical: "https://medicare-services-hub-1--derickasiimwe84.replit.app/outreach",
  });

  const focusAreas = [
    { icon: Users, title: "Youth Empowerment", desc: "Equipping young people with health knowledge and life skills." },
    { icon: HeartHandshake, title: "HIV Prevention", desc: "Awareness campaigns, free testing, and medical male circumcision." },
    { icon: BrainCircuit, title: "Mental Health", desc: "Breaking stigma and providing accessible counseling." },
    { icon: BookOpen, title: "Community Dev", desc: "Partnering with local leaders for sustainable health solutions." },
    { icon: Baby, title: "Women's Health", desc: "Maternal education and family planning outreach." },
    { icon: Droplet, title: "Sanitation & Hygiene", desc: "Promoting clean water and hygienic practices in villages." },
  ];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
          <img src={outreachHeroImg} alt="Community Outreach" loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/40 z-10" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-20 max-w-4xl">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary text-secondary-foreground text-sm font-bold tracking-wider uppercase mb-6">
            CHEIU Initiative
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
            Caring Beyond the Clinic Walls
          </h1>
          <p className="text-xl text-primary-foreground/90 leading-relaxed md:max-w-2xl">
            Peters Medicare Services actively reaches communities across the Rwenzori region through health education, free screenings, and preventive care programs.
          </p>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-12 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "400+", label: "Circumcisions Performed" },
              { value: "120+", label: "Cancer Screenings" },
              { value: "5+ Yrs", label: "HIV Outreach Programs" },
              { value: "50+", label: "Schools Reached" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold font-serif mb-2">{stat.value}</p>
                <p className="text-sm md:text-base font-medium opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Focus Areas</h2>
            <p className="text-lg text-muted-foreground">Through CHEIU, we target the most pressing health challenges in our communities.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area, i) => (
              <Card key={i} className="hover-elevate border-muted">
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <area.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold font-serif mb-3">{area.title}</h3>
                  <p className="text-muted-foreground">{area.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Active Programs Accordion */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-serif font-bold mb-10 text-center">Active Programs & Campaigns</h2>
          
          <Accordion type="single" collapsible className="w-full bg-card rounded-xl shadow-sm border p-4">
            <AccordionItem value="item-1" className="border-b-0 border-b-border">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-primary">
                HIV Testing & Prevention Campaigns
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                We conduct mobile testing drives in remote villages, providing instant results and counseling. Our medical male circumcision program actively contributes to reducing HIV transmission rates among young men in the region.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border-b-0 border-b-border">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-primary">
                Maternal Health Outreach
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                Our midwives travel to sub-counties to educate expecting mothers on nutrition, danger signs during pregnancy, and the importance of delivering at a health facility. We also distribute essential maternal kits.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b-0 border-b-border">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-primary">
                School Health Programs
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                Partnering with local schools to teach hygiene, reproductive health, and disease prevention. We believe that empowering children with health knowledge creates a healthier future generation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b-0 border-b-border">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-primary">
                Free Community Health Days
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                Quarterly events where we bring our full clinical team to a central community location to offer free general consultations, basic medicines, malaria testing, and vital signs monitoring for the elderly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b-0">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-primary">
                Mental Health Awareness Drives
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                Breaking the silence around depression and anxiety through community dialogues, radio talk shows, and confidential peer-support groups facilitated by trained counselors.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Upcoming Events Calendar */}
      <section className="py-20 bg-card border-t">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Upcoming Programs & Events</h2>
            <p className="text-lg text-muted-foreground">Join us at one of our upcoming free community health drives.</p>
          </div>
          <OutreachCalendar />
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-16 text-center border-t border-b bg-card">
        <div className="container mx-auto px-4">
          <p className="text-xl font-medium text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            "We work closely with government health centers, NGOs, and international partners to amplify our community impact and ensure no one is left behind."
          </p>
        </div>
      </section>
    </div>
  );
}
