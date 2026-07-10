import { useSEO } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import { Award, Heart, Shield, TrendingUp, Users, MapPin } from "lucide-react";
import outreachImg from "@/assets/images/outreach.png";
import campusImg from "@/assets/images/about-campus.webp";
import theaterImg from "@/assets/images/facility-theater.webp";
import receptionImg from "@/assets/images/facility-reception.webp";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  useSEO({
    title: "About Us | Peters Medicare Services — Established 2013",
    description: "Peters Medicare Services has served Kyenjojo and the Rwenzori region since 2013. Learn about our mission, values, and commitment to affordable, patient-centered healthcare in Uganda.",
    canonical: "https://medicare-services-hub-1--derickasiimwe84.replit.app/about",
  });

  const values = [
    { icon: Shield, title: "Integrity", desc: "Honest, transparent medical practice." },
    { icon: Heart, title: "Compassion", desc: "Empathetic care for every patient." },
    { icon: Award, title: "Excellence", desc: "High standards in treatment and diagnostics." },
    { icon: Users, title: "Affordability", desc: "Quality healthcare that doesn't bankrupt families." },
    { icon: TrendingUp, title: "Innovation", desc: "Embracing modern medical solutions." },
  ];

  const milestones = [
    { year: "2013", title: "Founded", desc: "Peters Medicare opened its doors in Kyenjojo." },
    { year: "2015", title: "Maternal Health", desc: "Expanded to include full antenatal and delivery services." },
    { year: "2017", title: "Diagnostics Unit", desc: "Added modern laboratory and ultrasound scanning." },
    { year: "2019", title: "CHEIU Established", desc: "Launched our NGO arm for community health empowerment." },
    { year: "2021", title: "Dental & Eye Care", desc: "Introduced specialized clinics for comprehensive care." },
    { year: "2024", title: "10,000+ Patients", desc: "Celebrating a decade of trusted regional healthcare." },
  ];

  const facilities = [
    {
      img: theaterImg,
      title: "Surgical Theater",
      desc: "Our fully equipped surgical theater handles minor procedures, circumcisions, and emergency interventions with trained medical staff and sterile protocols.",
    },
    {
      img: receptionImg,
      title: "Reception & Admin Office",
      desc: "A well-organised reception equipped with modern computers and digital systems to manage patient records, appointments, and billing efficiently.",
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-primary/5 py-16 md:py-24 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">Our Story</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Established in August 2013, Peters Medicare Services has grown from a small private clinic into the leading healthcare provider in the Kyenjojo–Kagadi–Rwenzori region.
            </p>
          </div>
        </div>
      </section>

      {/* Campus Photo — Our Location */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                <MapPin className="w-4 h-4" /> Kyenjojo, Western Uganda
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Campus</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Set in the heart of Kyenjojo town, our facility spans a secure, well-maintained compound with dedicated wings for consultation, maternity, surgery, and diagnostics.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The campus is easily accessible from Kyenjojo, Kyegegwa, Kibaale and the wider Rwenzori region — strategically positioned to serve thousands of families across western Uganda.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl aspect-[16/9]"
            >
              <img
                src={campusImg}
                alt="Aerial view of Peters Medicare Services campus in Kyenjojo, Uganda"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <Card className="bg-primary text-primary-foreground border-none">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-serif font-bold mb-4 opacity-90">Our Vision</h2>
                <p className="text-xl leading-relaxed font-medium">
                  "To be the leading private healthcare provider in western Uganda through innovation, quality care, and community partnership."
                </p>
              </CardContent>
            </Card>
            <Card className="bg-secondary text-secondary-foreground border-none">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-serif font-bold mb-4 opacity-90">Our Mission</h2>
                <p className="text-xl leading-relaxed font-medium">
                  "To provide affordable, patient-centered healthcare that improves lives and empowers communities."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Facilities Gallery */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-serif font-bold mb-4 text-center">Our Facilities</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Purpose-built spaces designed for patient comfort, clinical safety, and efficient care delivery.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {facilities.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden hover-elevate border-muted">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={f.img}
                      alt={f.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-serif mb-2">{f.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v, i) => (
              <Card key={i} className="text-center hover-elevate border-primary/10">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold font-serif mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CHEIU Section */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-bold mb-6">
                NGO Initiative
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Community Health Empowerment Initiatives Uganda (CHEIU)</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Healthcare doesn't stop at our clinic doors. Through CHEIU, our NGO arm, we actively engage the community to prevent disease and promote wellness.
              </p>
              <ul className="space-y-4 mb-8">
                {["Youth empowerment programs", "HIV prevention & education", "Mental health awareness", "Community sanitation development"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircleIcon />
                    <span className="font-medium text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img src={outreachImg} alt="CHEIU Community Outreach" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-card border-t">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-serif font-bold mb-16 text-center">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative border-l-2 border-primary/20 pl-8 space-y-12 py-4">
              {milestones.map((m, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-card border-4 border-primary shadow-sm" />
                  <div className="bg-muted/50 p-6 rounded-xl">
                    <span className="text-primary font-bold tracking-wider mb-2 block">{m.year}</span>
                    <h3 className="text-xl font-bold font-serif mb-2">{m.title}</h3>
                    <p className="text-muted-foreground">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-5 h-5 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
