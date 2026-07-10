import { useEffect } from "react";
import { useSEO } from "@/hooks/use-seo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function Contact() {
  const { toast } = useToast();

  useSEO({
    title: "Contact Us | Peters Medicare Services Kyenjojo",
    description: "Contact Peters Medicare Services in Kyenjojo, Uganda. Call 0776 004 277, WhatsApp us, or visit us 200m along the Kyenjojo–Kagadi Road. Open 24/7.",
    canonical: "https://medicare-services-hub-1--derickasiimwe84.replit.app/contact",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    // Store in localStorage as requested (no backend)
    const existing = JSON.parse(localStorage.getItem('peters_messages') || '[]');
    localStorage.setItem('peters_messages', JSON.stringify([...existing, { ...data, date: new Date().toISOString() }]));
    
    toast({
      title: "Success!",
      description: "Thank you! We'll contact you shortly.",
      variant: "default",
    });
    
    form.reset();
  }

  return (
    <div className="w-full pb-24">
      {/* Header */}
      <section className="bg-primary/5 py-16 border-b">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">Contact Us</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We are here to help. Reach out to book an appointment, ask about our services, or for emergencies.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Visit our clinic in Kyenjojo or contact us via phone or WhatsApp for immediate assistance.
                </p>
              </div>
              
              <Card className="border-none shadow-md bg-card">
                <CardContent className="p-6 flex gap-4">
                  <Phone className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone Numbers</h3>
                    <div className="flex flex-col space-y-1 text-muted-foreground">
                      <a href="tel:+256776004277" className="hover:text-primary transition-colors">0776 004 277</a>
                      <a href="tel:+256778989221" className="hover:text-primary transition-colors">0778 989 221</a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-secondary/10 text-secondary-foreground">
                <CardContent className="p-6 flex gap-4">
                  <MessageCircle className="w-6 h-6 text-secondary shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                    <a href="https://wa.me/256776004277" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">
                      0776 004 277
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-card">
                <CardContent className="p-6 flex gap-4">
                  <Clock className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Opening Hours</h3>
                    <p className="text-muted-foreground">Open 24 hours, 7 days a week</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-card">
                <CardContent className="p-6 flex gap-4">
                  <MapPin className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      Kyenjojo Town<br />
                      200m along Kyenjojo–Kagadi Road<br />
                      Uganda
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form & Map */}
            <div className="lg:col-span-3 space-y-12">
              <Card className="shadow-lg border-primary/10">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-2xl font-serif font-bold mb-6">Send us a Message</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
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
                                <Input placeholder="07XX XXX XXX" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email (Optional)</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service Interested In</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="general">General Consultation</SelectItem>
                                  <SelectItem value="maternal">Maternal Health</SelectItem>
                                  <SelectItem value="diagnostics">Diagnostics</SelectItem>
                                  <SelectItem value="dental">Dental Care</SelectItem>
                                  <SelectItem value="eye">Eye Care</SelectItem>
                                  <SelectItem value="hiv">HIV Testing</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="How can we help you today?" 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" size="lg" className="w-full md:w-auto h-12 px-8">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-md aspect-video border bg-muted">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.4!2d30.605!3d0.603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMzYnMTAuNyJOIDMwwrAzNicxOC4wIkU!5e0!3m2!1sen!2sug!4v1!5m2!1sen!2sug" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peters Medicare Services Location"
                ></iframe>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
