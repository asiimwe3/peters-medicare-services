import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Phone, MessageCircle, CheckCircle, Loader2, Users, Baby, FlaskConical, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const PRESET_AMOUNTS = [10000, 25000, 50000, 100000, 250000, 500000];

const PURPOSES = [
  { value: "general", label: "General Health Fund", icon: Heart },
  { value: "outreach", label: "Community Outreach Programs", icon: Users },
  { value: "maternal", label: "Maternal & Child Health", icon: Baby },
  { value: "hiv", label: "HIV Prevention & Testing", icon: ShieldCheck },
  { value: "diagnostics", label: "Diagnostics & Equipment", icon: FlaskConical },
];

const donateSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.email("Please enter a valid email").or(z.literal("")),
  phone: z.string().min(9, "Please enter a valid phone number"),
  purpose: z.string().min(1, "Please select a purpose"),
  message: z.string().optional(),
});

type DonateForm = z.infer<typeof donateSchema>;

function formatUGX(amount: number) {
  return `UGX ${amount.toLocaleString()}`;
}

export function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50000);
  const [customAmount, setCustomAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Donate | Peters Medicare Services — Support Community Health in Uganda";
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<DonateForm>({
    resolver: zodResolver(donateSchema),
    defaultValues: { name: "", email: "", phone: "", purpose: "general", message: "" },
  });

  const finalAmount = selectedAmount ?? (customAmount ? parseInt(customAmount.replace(/\D/g, ""), 10) : 0);

  async function onSubmit(data: DonateForm) {
    if (!finalAmount || finalAmount < 1000) {
      toast({ title: "Invalid amount", description: "Minimum donation is UGX 1,000.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const reference = `PMS-DON-${Date.now()}`;
      const purposeLabel = PURPOSES.find((p) => p.value === data.purpose)?.label ?? data.purpose;

      const res = await fetch("/api/donate/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          currency: "UGX",
          name: data.name,
          email: data.email,
          phone: data.phone,
          description: `Donation to Peters Medicare Services — ${purposeLabel}`,
          reference,
        }),
      });

      const json = (await res.json()) as { redirect_url?: string; error?: string };

      if (res.ok && json.redirect_url) {
        window.location.href = json.redirect_url;
      } else if (json.error === "payment_not_configured") {
        toast({
          title: "Online payments coming soon",
          description: "Pesapal is not yet activated. Please use Mobile Money below to donate. Thank you!",
        });
      } else {
        throw new Error(json.error ?? "Unknown error");
      }
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or use Mobile Money to donate.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              <Heart className="w-4 h-4" /> Support Community Health
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-5 leading-tight">
              Help Us Keep Healthcare <br className="hidden md:block" />
              <span className="text-primary">Affordable for Everyone</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Your donation directly funds free screenings, maternal care, HIV prevention programs, and community health outreach across the Rwenzori region.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="py-10 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "400+", label: "Circumcisions funded" },
              { number: "120+", label: "Cancer screenings" },
              { number: "10,000+", label: "Patients served" },
              { number: "12+", label: "Years of service" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold font-serif mb-1">{stat.number}</div>
                <div className="text-primary-foreground/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation form + sidebar */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-10 max-w-5xl mx-auto">

            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="shadow-lg border-0">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-serif">Make a Donation</CardTitle>
                    <CardDescription>All donations go directly to patient care and community programs.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-7">

                    {/* Amount picker */}
                    <div>
                      <p className="text-sm font-medium text-foreground mb-3">Select Amount (UGX)</p>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        {PRESET_AMOUNTS.map((amt) => (
                          <button
                            key={amt}
                            data-testid={`button-amount-${amt}`}
                            onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                            className={`py-2.5 px-3 rounded-lg border text-sm font-semibold transition-all ${
                              selectedAmount === amt
                                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                : "bg-background text-foreground border-border hover:border-primary hover:text-primary"
                            }`}
                          >
                            {formatUGX(amt)}
                          </button>
                        ))}
                      </div>
                      <Input
                        data-testid="input-custom-amount"
                        placeholder="Or enter custom amount (UGX)"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(null);
                        }}
                        className="mt-1"
                        type="number"
                        min={1000}
                      />
                      {finalAmount > 0 && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Donating: <span className="font-semibold text-primary">{formatUGX(finalAmount)}</span>
                        </p>
                      )}
                    </div>

                    {/* Donor form */}
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                          control={form.control}
                          name="purpose"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Donation Purpose</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-purpose">
                                    <SelectValue placeholder="Where should this go?" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {PURPOSES.map((p) => (
                                    <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input data-testid="input-donor-name" placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input data-testid="input-donor-phone" placeholder="e.g. 0776 004 277" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                              <FormControl>
                                <Input data-testid="input-donor-email" placeholder="you@example.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                              <FormControl>
                                <Input data-testid="input-donor-message" placeholder="Leave an encouraging word..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          data-testid="button-donate-submit"
                          type="submit"
                          size="lg"
                          className="w-full gap-2 text-base font-semibold bg-secondary hover:bg-secondary/90"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                          ) : (
                            <><Heart className="w-5 h-5" /> Donate {finalAmount > 0 ? formatUGX(finalAmount) : "Now"}</>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Mobile Money */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold">Donate via Mobile Money</CardTitle>
                    <CardDescription className="text-xs">Send directly — then WhatsApp us your name and amount</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="font-semibold text-yellow-800 mb-0.5">MTN Mobile Money</p>
                      <p className="text-yellow-700 font-mono text-base">0776 004 277</p>
                      <p className="text-yellow-600 text-xs mt-0.5">Name: Peters Medicare Services</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="font-semibold text-red-800 mb-0.5">Airtel Money</p>
                      <p className="text-red-700 font-mono text-base">0778 989 221</p>
                      <p className="text-red-600 text-xs mt-0.5">Name: Peters Medicare Services</p>
                    </div>
                    <a
                      href="https://wa.me/256776004277?text=Hello,%20I%20have%20donated%20to%20Peters%20Medicare%20Services."
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="link-whatsapp-confirm"
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors w-full justify-center mt-1"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Confirm via WhatsApp
                    </a>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Call to donate */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="border-0 shadow-md bg-primary text-primary-foreground">
                  <CardContent className="pt-5 space-y-3">
                    <p className="font-semibold text-sm">Prefer to call us?</p>
                    <p className="text-primary-foreground/80 text-xs leading-relaxed">
                      Our team will guide you through the donation process and answer any questions.
                    </p>
                    <a
                      href="tel:+256776004277"
                      data-testid="link-call-donate"
                      className="flex items-center gap-2 bg-white/15 hover:bg-white/25 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors w-full justify-center"
                    >
                      <Phone className="w-4 h-4" />
                      0776 004 277
                    </a>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Purposes */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold">Your impact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    {[
                      { amount: "UGX 5,000", desc: "Covers one general consultation" },
                      { amount: "UGX 10,000", desc: "Funds an antenatal visit" },
                      { amount: "UGX 25,000", desc: "Pays for lab tests for a patient" },
                      { amount: "UGX 50,000", desc: "Supports a community outreach day" },
                      { amount: "UGX 100,000", desc: "Provides HIV testing for 30 people" },
                    ].map((item) => (
                      <div key={item.amount} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <span>
                          <span className="font-semibold text-foreground">{item.amount}</span>
                          <span className="text-muted-foreground"> — {item.desc}</span>
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-10 border-t bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Peters Medicare Services is a fully licensed clinic registered with the Uganda Ministry of Health. All donations are used transparently for patient care and community programs.
          </p>
        </div>
      </section>
    </div>
  );
}
