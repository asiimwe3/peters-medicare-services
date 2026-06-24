import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingCTAs() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <motion.a
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        href="tel:+256776004277"
        className="bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors hover-elevate flex items-center justify-center group"
        aria-label="Call Clinic"
      >
        <Phone className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap pl-0 group-hover:pl-2 font-medium text-sm">
          Call Now
        </span>
      </motion.a>
      
      <motion.a
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.3 }}
        href="https://wa.me/256776004277?text=Hello,%20I'd%20like%20to%20book%20an%20appointment"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-secondary text-secondary-foreground p-4 rounded-full shadow-xl hover:bg-secondary/90 transition-colors hover-elevate flex items-center justify-center group"
        aria-label="Book via WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap pl-0 group-hover:pl-2 font-medium">
          Book Appointment
        </span>
      </motion.a>
    </div>
  );
}
