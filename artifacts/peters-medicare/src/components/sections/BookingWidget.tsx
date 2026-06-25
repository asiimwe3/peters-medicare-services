import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Stethoscope, Baby, Activity, SmilePlus, Eye, ShieldCheck, Heart, Users, HelpCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { name: "General Consultation", icon: Stethoscope },
  { name: "Antenatal Care", icon: Baby },
  { name: "Laboratory Test", icon: Activity },
  { name: "Ultrasound Scan", icon: Activity },
  { name: "Dental Care", icon: SmilePlus },
  { name: "Eye Care", icon: Eye },
  { name: "HIV Testing", icon: ShieldCheck },
  { name: "Delivery", icon: Heart },
  { name: "Family Planning", icon: Users },
  { name: "Other", icon: HelpCircle },
];

export function BookingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPulsed, setHasPulsed] = useState(false);
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [datePref, setDatePref] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [timePref, setTimePref] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const pulsed = sessionStorage.getItem("bookingPulsed");
    if (pulsed) {
      setHasPulsed(true);
    } else {
      const timer = setTimeout(() => {
        sessionStorage.setItem("bookingPulsed", "true");
        setHasPulsed(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const openWidget = () => setIsOpen(true);
  const closeWidget = () => {
    setIsOpen(false);
    // Reset after animation
    setTimeout(() => {
      setStep(1);
      setService("");
      setDatePref("");
      setCustomDate("");
      setTimePref("");
      setName("");
      setPhone("");
      setNote("");
    }, 300);
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    const dateStr = datePref === "Another day" ? customDate : datePref;
    const message = `Hello Peters Medicare Services,\n\nI'd like to book an appointment:\n- Service: ${service}\n- Preferred date: ${dateStr} (${timePref})\n- Name: ${name}\n- Phone: ${phone}${note ? `\n- Note: ${note}` : ''}\n\nPlease confirm my appointment. Thank you.`;
    
    window.open(`https://wa.me/256776004277?text=${encodeURIComponent(message)}`, "_blank");
    closeWidget();
  };

  const isStep1Valid = !!service;
  const isStep2Valid = !!datePref && (datePref !== "Another day" || !!customDate) && !!timePref;
  const isStep3Valid = !!name && !!phone;

  return (
    <>
      <div className="fixed bottom-24 right-4 z-40">
        <motion.button
          onClick={openWidget}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-primary text-primary-foreground shadow-xl rounded-full px-5 py-3 flex items-center gap-2 font-medium"
          data-testid="button-booking-widget"
        >
          {!hasPulsed && (
            <span className="absolute inset-0 rounded-full bg-primary opacity-50 animate-ping" />
          )}
          <Calendar className="w-5 h-5 relative z-10" />
          <span className="relative z-10 hidden sm:inline">Book Appointment</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[110]"
              onClick={closeWidget}
            />
            <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                className="w-full max-w-lg bg-card rounded-2xl shadow-2xl border overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
                role="dialog"
                aria-modal="true"
                data-testid="modal-booking"
              >
                <div className="flex items-center justify-between p-4 border-b shrink-0">
                  <div>
                    <h3 className="font-semibold text-lg">Book Appointment</h3>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-8 rounded-full ${
                            i <= step ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <button onClick={closeWidget} className="p-2 rounded-full hover:bg-muted text-muted-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                  {step === 1 && (
                    <div data-testid="step-1" className="space-y-4">
                      <h4 className="font-medium text-lg mb-4">What service do you need?</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {services.map((s) => {
                          const Icon = s.icon;
                          const isSelected = service === s.name;
                          return (
                            <button
                              key={s.name}
                              onClick={() => setService(s.name)}
                              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                              }`}
                              data-testid={`service-card-${s.name}`}
                            >
                              <Icon className="w-6 h-6" />
                              <span className="text-xs text-center font-medium leading-tight">{s.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div data-testid="step-2" className="space-y-6">
                      <div>
                        <h4 className="font-medium text-lg mb-3">When would you prefer to visit?</h4>
                        <div className="flex flex-wrap gap-2">
                          {["Today", "Tomorrow", "Another day"].map((d) => (
                            <button
                              key={d}
                              onClick={() => setDatePref(d)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                                datePref === d
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-background text-foreground border-border hover:border-primary"
                              }`}
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                        {datePref === "Another day" && (
                          <div className="mt-3">
                            <input
                              type="text"
                              value={customDate}
                              onChange={(e) => setCustomDate(e.target.value)}
                              placeholder="e.g. Next Monday, 15 July"
                              className="w-full px-4 py-2 rounded-md border border-input bg-background"
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Preferred time?</h4>
                        <div className="flex flex-wrap gap-2">
                          {["Morning (8–12)", "Afternoon (12–3)", "Evening (3–6)", "Any time"].map((t) => (
                            <button
                              key={t}
                              onClick={() => setTimePref(t)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                                timePref === t
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-background text-foreground border-border hover:border-primary"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div data-testid="step-3" className="space-y-4">
                      <h4 className="font-medium text-lg mb-4">Your contact details</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground mb-1 block">Full Name</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-input bg-background"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground mb-1 block">Phone Number</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-input bg-background"
                            placeholder="0776..."
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground mb-1 block">Any other details? (Optional)</label>
                          <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-input bg-background resize-none h-20"
                            placeholder="Symptoms, previous visits, etc."
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t shrink-0 flex justify-between gap-3 bg-muted/30">
                  {step > 1 ? (
                    <Button variant="outline" onClick={handleBack} data-testid="btn-back">
                      Back
                    </Button>
                  ) : (
                    <div /> // Spacer
                  )}
                  {step < 3 ? (
                    <Button onClick={handleNext} disabled={step === 1 ? !isStep1Valid : !isStep2Valid} data-testid="btn-next">
                      Next Step
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={!isStep3Valid} className="bg-green-600 hover:bg-green-700 text-white flex-1" data-testid="btn-submit-booking">
                      Confirm & Send via WhatsApp
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}