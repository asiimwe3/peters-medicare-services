import { useSEO } from "@/hooks/use-seo";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Clock, MapPin, CheckCircle, ShieldCheck, Stethoscope, HeartPulse, Users, Baby, FlaskConical, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";

import heroImg from "@/assets/images/hero.webp";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

export function Home() {
  const { lang } = useLanguage();

  useSEO({
    title: "Peters Medicare Services | Quality Healthcare in Kyenjojo, Uganda",
    description: "Quality, affordable and patient-centered healthcare in Kyenjojo, Uganda. General medicine, maternal health, lab tests, dental and eye care. Consultation from UGX 5,000. Call 0776 004 277.",
    canonical: "https://medicare-services-hub-1--derickasiimwe84.replit.app/",
  });

  return (
    <div className="w-full">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, hsl(38 80% 97%) 0%, hsl(38 52% 91%) 100%)" }}>
        <div className="container mx-auto px-4 md:px-6 py-16 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — copy */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-xl">
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
                style={{ background: "hsl(17 54% 93%)", color: "hsl(17 54% 35%)" }}>
                <ShieldCheck className="w-4 h-4" />
                Serving Kyenjojo since 2013
              </motion.div>

              <motion.h1 variants={fadeIn} className="font-serif font-bold leading-tight mb-5"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "hsl(26 60% 10%)" }}>
                {t("hero.title", lang)}<br />
                <em className="not-italic" style={{ color: "hsl(17 54% 50%)" }}>feels like family.</em>
              </motion.h1>

              <motion.p variants={fadeIn} className="text-lg leading-relaxed mb-8" style={{ color: "hsl(26 25% 42%)" }}>
                {t("hero.subtitle", lang)}
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-13 px-8 text-base rounded-full shadow-md">
                  <a href="tel:+256776004277" className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    {t("hero.call", lang)}
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-13 px-8 text-base rounded-full">
                  <a href="https://wa.me/256776004277" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    {t("hero.whatsapp", lang)}
                  </a>
                </Button>
              </motion.div>

              <motion.div variants={fadeIn} className="flex gap-8 mt-10 pt-8 border-t" style={{ borderColor: "hsl(38 30% 84%)" }}>
                {[["10,000+","Patients Served"],["12+","Years of Care"],["24/7","Always Open"]].map(([v,l]) => (
                  <div key={l}>
                    <p className="font-serif font-bold text-2xl" style={{ color: "hsl(17 54% 50%)" }}>{v}</p>
                    <p className="text-sm mt-0.5" style={{ color: "hsl(26 25% 42%)" }}>{l}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — service cards stack */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-xl mb-2">
                <img src={heroImg} alt="Peters Medicare Clinic" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Stethoscope, label: "General Medicine", desc: "All ages, anytime", bg: "hsl(0 0% 100%)" },
                  { icon: Baby, label: "Maternal & Child", desc: "Prenatal · Vaccines", bg: "hsl(17 54% 96%)" },
                  { icon: FlaskConical, label: "Laboratory", desc: "Rapid results", bg: "hsl(149 47% 94%)" },
                  { icon: Eye, label: "Dental & Eye", desc: "Specialist clinic", bg: "hsl(38 80% 94%)" },
                ].map(({ icon: Icon, label, desc, bg }) => (
                  <Card key={label} className="border shadow-sm hover-elevate" style={{ background: bg }}>
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "hsl(17 54% 93%)", color: "hsl(17 54% 40%)" }}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm leading-snug" style={{ color: "hsl(26 60% 10%)" }}>{label}</p>
                        <p className="text-xs mt-0.5" style={{ color: "hsl(26 25% 50%)" }}>{desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "hsl(17 54% 50%)" }}>Why Peters Medicare</p>
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Healthcare that honours<br /><em style={{ color: "hsl(17 54% 50%)" }}>every patient.</em></h2>
            <p className="text-muted-foreground text-lg">We combine professional clinical care with genuine warmth for our community.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "12+ Years Experience", desc: "A trusted presence in Kyenjojo since 2013, serving thousands of families.", color: "hsl(17 54% 93%)", iconColor: "hsl(17 54% 45%)" },
              { icon: ShieldCheck, title: "Fully Licensed", desc: "Registered with the Ministry of Health Uganda and committed to clinical standards.", color: "hsl(149 47% 92%)", iconColor: "hsl(149 47% 35%)" },
              { icon: HeartPulse, title: "Affordable for All", desc: "Consultations from UGX 5,000 — because quality care should never be out of reach.", color: "hsl(38 80% 91%)", iconColor: "hsl(35 75% 40%)" },
            ].map(({ icon: Icon, title, desc, color, iconColor }) => (
              <motion.div
                key={title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeIn}
                className="p-8 rounded-2xl text-center hover-elevate"
                style={{ background: color }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-white/60">
                  <Icon className="w-8 h-8" style={{ color: iconColor }} />
                </div>
                <h3 className="font-serif font-bold text-xl mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Overview ─────────────────────────────── */}
      <section className="py-20 lg:py-28 relative overflow-hidden" style={{ background: "hsl(17 54% 50%)" }}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_white,_transparent)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "hsl(17 54% 85%)" }}>Our Services</p>
              <h2 className="font-serif font-bold text-3xl md:text-4xl text-white mb-3">Comprehensive care,<br /><em>under one roof.</em></h2>
              <p className="text-lg" style={{ color: "hsl(17 54% 85%)" }}>From general medicine to specialized diagnostics — everything your family needs.</p>
            </div>
            <Button asChild className="shrink-0 rounded-full" style={{ background: "white", color: "hsl(17 54% 40%)" }}>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              "General Medical Care",
              "Maternal & Antenatal Health",
              "Laboratory Diagnostics",
              "Dental & Eye Clinic",
              "HIV Counseling & Testing",
              "Community Outreach",
            ].map((service) => (
              <div key={service} className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <CheckCircle className="w-5 h-5 shrink-0 text-white opacity-80" />
                <span className="text-white font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community Outreach Banner ─────────────────────── */}
      <section className="py-14" style={{ background: "hsl(149 47% 33%)" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm font-semibold uppercase tracking-widest mb-1" style={{ color: "hsl(149 47% 80%)" }}>Community Outreach</p>
              <h3 className="font-serif font-bold text-2xl text-white mb-1">We come to you — every quarter.</h3>
              <p style={{ color: "hsl(149 47% 82%)" }}>Free clinics and health camps across Kyenjojo district.</p>
            </div>
            <Button asChild className="rounded-full shrink-0 bg-white hover:bg-white/90" style={{ color: "hsl(149 47% 28%)" }}>
              <Link href="/outreach">View Upcoming Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="py-20 lg:py-28" style={{ background: "hsl(38 80% 97%)" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "hsl(17 54% 50%)" }}>Patient Stories</p>
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Trusted by our community</h2>
            <p className="text-muted-foreground text-lg">Hear what our patients have to say about their experience at Peters Medicare.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah", location: "Kyenjojo", quote: "The maternal care team was exceptional during my pregnancy. They explained everything clearly and made me feel safe and cared for." },
              { name: "John", location: "Kagadi", quote: "Affordable, fast, and very professional. The lab results were ready quickly, and the doctor prescribed exactly what I needed." },
              { name: "Grace", location: "Kyegegwa", quote: "I always bring my children here. The nurses are so kind and the clinic is always spotless. Highly recommended to every family." },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Card className="h-full border shadow-sm" style={{ borderColor: "hsl(38 30% 84%)" }}>
                  <CardContent className="p-8 flex flex-col h-full">
                    <svg className="w-8 h-8 mb-4" fill="currentColor" style={{ color: "hsl(17 54% 80%)" }} viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="italic leading-relaxed flex-1 mb-6 text-muted-foreground">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <Avatar>
                        <AvatarFallback className="font-bold" style={{ background: "hsl(17 54% 93%)", color: "hsl(17 54% 40%)" }}>
                          {testimonial.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-serif font-bold">{testimonial.name}</p>
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


      {/* ── Gallery Preview ──────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-3">Our Facilities</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">A glimpse inside Peters Medicare Services — real spaces, real care.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: new URL("../assets/images/gallery/gal-compound-aerial.webp", import.meta.url).href, label: "Facility Compound" },
              { src: new URL("../assets/images/gallery/gal-maternity-ward.webp", import.meta.url).href, label: "Maternity Ward" },
              { src: new URL("../assets/images/gallery/gal-dental-clinic.webp", import.meta.url).href, label: "Dental Clinic" },
              { src: new URL("../assets/images/gallery/gal-waiting-area.webp", import.meta.url).href, label: "Waiting Area" },
              { src: new URL("../assets/images/gallery/gal-theater-lamp.webp", import.meta.url).href, label: "Surgical Theater" },
              { src: new URL("../assets/images/gallery/gal-ward-equipment.webp", import.meta.url).href, label: "Ward Equipment" },
              { src: new URL("../assets/images/gallery/gal-oxygen-cylinders.webp", import.meta.url).href, label: "Oxygen Supply" },
              { src: new URL("../assets/images/gallery/gal-staff-desk.webp", import.meta.url).href, label: "Clinical Staff" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
                className="relative group rounded-xl overflow-hidden aspect-square shadow-sm hover:shadow-lg transition-shadow">
                <img src={item.src} alt={item.label} loading="lazy" decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-2">
                  <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity drop-shadow">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/gallery">
              <Button variant="outline" size="lg" className="rounded-full px-8">View Full Gallery</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-20 bg-card border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">Ready to visit us?</h2>
            <p className="text-muted-foreground text-lg mb-8">Walk in or book ahead — no long queues, no fuss.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-muted-foreground mb-10 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Kyenjojo Town, Uganda</span>
              </div>
              <span className="hidden sm:block text-border">•</span>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>Open 24/7 — Every day</span>
              </div>
              <span className="hidden sm:block text-border">•</span>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Walk-ins welcome</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="h-13 px-8 rounded-full shadow-md">
                <a href="tel:+256776004277" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call 0776 004 277
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-13 px-8 rounded-full">
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
