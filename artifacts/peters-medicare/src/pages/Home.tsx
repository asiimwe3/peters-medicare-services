import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageCircle, Clock, MapPin, CheckCircle, ShieldCheck, Stethoscope, Users, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";

import heroImg from "@/assets/images/hero.png";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function Home() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = "Peters Medicare Services | Quality Healthcare in Kyenjojo, Uganda";
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-2xl"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <ShieldCheck className="w-4 h-4" />
                Licensed by Ministry of Health
              </motion.div>
              <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
                {t("hero.title", lang)}
              </motion.h1>
              <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                {t("hero.subtitle", lang)}
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="h-14 px-8 text-base">
                  <a href="tel:+256776004277" className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    {t("hero.call", lang)}
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg" className="h-14 px-8 text-base">
                  <a href="https://wa.me/256776004277" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    {t("hero.whatsapp", lang)}
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImg} 
                  alt="Peters Medicare Clinic Interior" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl border max-w-xs animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 hidden md:block">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl font-serif">10,000+</p>
                    <p className="text-sm text-muted-foreground">Patients Served</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="border-b bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { label: "Experience", value: "12+ Years" },
              { label: "Patients Served", value: "10,000+" },
              { label: "Departments", value: "5 Centers" },
              { label: "Certification", value: "Fully Licensed" }
            ].map((stat, i) => (
              <div key={i} className="py-8 px-4 text-center">
                <p className="text-2xl md:text-3xl font-bold font-serif text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Why Choose Peters Medicare?</h2>
            <p className="text-lg text-muted-foreground">We combine professional clinical precision with genuine care for our community.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "12+ Years Experience", desc: "A decade of trusted healthcare delivery in Kyenjojo." },
              { icon: ShieldCheck, title: "Licensed & Certified", desc: "Fully registered with the Ministry of Health Uganda." },
              { icon: HeartPulse, title: "Affordable Pricing", desc: "Consultations starting at just UGX 5,000 to ensure access for all." },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="bg-muted/50 p-8 rounded-2xl text-center hover-elevate"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-serif mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Comprehensive Healthcare Services</h2>
              <p className="text-primary-foreground/80 text-lg">From general medicine to specialized diagnostics, we provide complete care under one roof.</p>
            </div>
            <Button asChild variant="secondary" className="shrink-0 bg-white text-primary hover:bg-white/90">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "General Medical Care", 
              "Maternal & Antenatal Health", 
              "Laboratory Diagnostics", 
              "Dental & Eye Clinic", 
              "HIV Counseling & Testing", 
              "Community Outreach"
            ].map((service, i) => (
              <Card key={i} className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground backdrop-blur-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-secondary shrink-0" />
                  <span className="font-medium text-lg">{service}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Trusted by Our Community</h2>
            <p className="text-lg text-muted-foreground">Hear what our patients have to say about their experience.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah", location: "Kyenjojo", quote: "The maternal care team was exceptional during my pregnancy. They explained everything clearly and made me feel safe." },
              { name: "John", location: "Kagadi", quote: "Affordable, fast, and very professional. The lab results were ready quickly, and the doctor prescribed exactly what I needed." },
              { name: "Grace", location: "Kyegegwa", quote: "I always bring my children here. The nurses are so friendly and the clinic is always spotless. Highly recommended." },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Card className="h-full">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="mb-6 flex-1">
                      <svg className="w-8 h-8 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="text-muted-foreground italic leading-relaxed">"{testimonial.quote}"</p>
                    </div>
                    <div className="flex items-center gap-4 mt-auto">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {testimonial.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold font-serif">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-card border-t border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Visit Us?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground mb-10">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Kyenjojo Town, Uganda</span>
              </div>
              <div className="hidden sm:block text-border">•</div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>Mon–Sat: 8AM – 6PM</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="h-14 px-8">
                <a href="tel:+256776004277" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call 0776 004 277
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
        </div>
      </section>
    </div>
  );
}
