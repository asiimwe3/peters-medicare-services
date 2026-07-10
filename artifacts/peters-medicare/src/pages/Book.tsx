import { useState, useEffect } from "react";
import { useSEO } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Phone, User, Stethoscope, MessageCircle, CheckCircle, AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

const SERVICES = [
  "General Medical Consultation",
  "Maternal & Antenatal Care",
  "Child Health & Vaccination",
  "Laboratory Tests",
  "Dental Consultation",
  "Eye Clinic",
  "HIV Counseling & Testing",
  "Other",
];

const TIME_SLOTS = [
  { value: "morning", label: "Morning (8:00 AM – 12:00 PM)" },
  { value: "afternoon", label: "Afternoon (12:00 PM – 4:00 PM)" },
  { value: "evening", label: "Evening (4:00 PM – 6:00 PM)" },
];

const today = new Date().toISOString().split("T")[0];

type Status = "idle" | "submitting" | "success" | "error";

export function Book() {
  const { lang: _lang } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    preferredDate: "",
    preferredTime: "morning",
    notes: "",
  });

  useSEO({
    title: "Book an Appointment | Peters Medicare Services Kyenjojo",
    description: "Book a medical appointment at Peters Medicare Services in Kyenjojo, Uganda. Choose your service, preferred date and time. Confirmed by our team within 24 hours.",
    canonical: "https://medicare-services-hub-1--derickasiimwe84.replit.app/book",
  });

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json() as { success?: boolean; error?: string; message?: string };
      if (!res.ok || !data.success) {
        setErrorMsg(data.message ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "hsl(38 80% 97%)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "hsl(149 47% 92%)" }}>
            <CheckCircle className="w-10 h-10" style={{ color: "hsl(149 47% 33%)" }} />
          </div>
          <h1 className="font-serif font-bold text-3xl mb-3">Request Received!</h1>
          <p className="text-muted-foreground text-lg mb-2">
            Thank you, <strong>{form.name}</strong>.
          </p>
          <p className="text-muted-foreground mb-8">
            We will call you on <strong>{form.phone}</strong> to confirm your appointment for{" "}
            <strong>{form.preferredDate}</strong>. Please keep your phone nearby.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="rounded-full"
              onClick={() => { setStatus("idle"); setForm({ name: "", phone: "", service: "", preferredDate: "", preferredTime: "morning", notes: "" }); }}
            >
              Book Another
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <a href="https://wa.me/256776004277" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Contact via WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ background: "hsl(38 80% 97%)" }}>
      {/* Header */}
      <section className="py-16 lg:py-20 border-b" style={{ background: "linear-gradient(160deg, hsl(38 80% 97%) 0%, hsl(38 52% 91%) 100%)" }}>
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5"
              style={{ background: "hsl(17 54% 93%)", color: "hsl(17 54% 35%)" }}>
              <CalendarDays className="w-4 h-4" />
              Book an Appointment
            </div>
            <h1 className="font-serif font-bold text-4xl md:text-5xl mb-4">
              Reserve your visit,<br />
              <em style={{ color: "hsl(17 54% 50%)" }}>we'll handle the rest.</em>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Fill in the form below and we will call you to confirm. Walk-ins are also welcome every day from 8 AM.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-16 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-12 max-w-5xl mx-auto">

          {/* Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="shadow-sm border" style={{ borderColor: "hsl(38 30% 84%)" }}>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" htmlFor="name">
                      <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-primary" /> Full Name *</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="e.g. Sarah Nakato"
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                      style={{ borderColor: "hsl(38 28% 80%)", background: "white" }}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" htmlFor="phone">
                      <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-primary" /> Phone Number *</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="e.g. 0776 004 277"
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                      style={{ borderColor: "hsl(38 28% 80%)", background: "white" }}
                    />
                    <p className="text-xs text-muted-foreground mt-1">We will call this number to confirm your appointment.</p>
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" htmlFor="service">
                      <span className="flex items-center gap-1.5"><Stethoscope className="w-4 h-4 text-primary" /> Service Needed *</span>
                    </label>
                    <select
                      id="service"
                      required
                      value={form.service}
                      onChange={(e) => set("service", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all appearance-none"
                      style={{ borderColor: "hsl(38 28% 80%)", background: "white" }}
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date + Time */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2" htmlFor="preferredDate">
                        <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4 text-primary" /> Preferred Date *</span>
                      </label>
                      <input
                        id="preferredDate"
                        type="date"
                        required
                        min={today}
                        value={form.preferredDate}
                        onChange={(e) => set("preferredDate", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                        style={{ borderColor: "hsl(38 28% 80%)", background: "white" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" htmlFor="preferredTime">
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> Preferred Time *</span>
                      </label>
                      <select
                        id="preferredTime"
                        required
                        value={form.preferredTime}
                        onChange={(e) => set("preferredTime", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all appearance-none"
                        style={{ borderColor: "hsl(38 28% 80%)", background: "white" }}
                      >
                        {TIME_SLOTS.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-semibold mb-2" htmlFor="notes">
                      Additional Notes <span className="font-normal text-muted-foreground">(optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      placeholder="Any symptoms, concerns, or special requests..."
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all resize-none"
                      style={{ borderColor: "hsl(38 28% 80%)", background: "white" }}
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "hsl(0 72% 96%)", border: "1px solid hsl(0 72% 88%)" }}>
                      <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{errorMsg}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "submitting"}
                    className="w-full rounded-full h-13 text-base font-semibold"
                  >
                    {status === "submitting" ? "Submitting..." : (
                      <span className="flex items-center gap-2">
                        Request Appointment <ChevronRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar info */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border shadow-sm" style={{ background: "hsl(17 54% 96%)", borderColor: "hsl(17 54% 88%)" }}>
              <CardContent className="p-6">
                <h3 className="font-serif font-bold text-lg mb-3" style={{ color: "hsl(17 54% 35%)" }}>Hours</h3>
                <p className="text-sm text-muted-foreground">Open 24/7 — We are always here for you.</p>
                <ul className="space-y-2 text-sm">
                  {[
                    ["Every Day", "Open 24 Hours"],
                  ].map(([day, time]) => (
                    <li key={day} className="flex justify-between">
                      <span className="text-muted-foreground">{day}</span>
                      <span className="font-semibold">{time}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border shadow-sm" style={{ background: "hsl(149 47% 94%)", borderColor: "hsl(149 47% 84%)" }}>
              <CardContent className="p-6">
                <h3 className="font-serif font-bold text-lg mb-3" style={{ color: "hsl(149 47% 25%)" }}>Prefer WhatsApp?</h3>
                <p className="text-sm text-muted-foreground mb-4">You can also book directly by messaging us on WhatsApp.</p>
                <Button asChild className="w-full rounded-full" style={{ background: "hsl(149 47% 33%)" }}>
                  <a href="https://wa.me/256776004277" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border shadow-sm" style={{ borderColor: "hsl(38 30% 84%)" }}>
              <CardContent className="p-6">
                <h3 className="font-serif font-bold text-lg mb-3">Call Us Directly</h3>
                <div className="space-y-2 text-sm">
                  <a href="tel:+256776004277" className="flex items-center gap-2 font-semibold text-primary hover:underline">
                    <Phone className="w-4 h-4" />
                    0776 004 277
                  </a>
                  <a href="tel:+256778989221" className="flex items-center gap-2 font-semibold text-primary hover:underline">
                    <Phone className="w-4 h-4" />
                    0778 989 221
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
