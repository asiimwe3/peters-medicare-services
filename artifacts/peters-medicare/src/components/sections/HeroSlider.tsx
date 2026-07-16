import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import heroImg       from "@/assets/images/hero.webp";
import galCompound   from "@/assets/images/gallery/gal-compound-aerial.webp";
import galDental     from "@/assets/images/gallery/gal-dental-clinic.webp";
import galMaternity  from "@/assets/images/gallery/gal-maternity-ward.webp";
import galOxygen     from "@/assets/images/gallery/gal-oxygen-cylinders.webp";
import galStaff      from "@/assets/images/gallery/gal-staff-desk.webp";
import galTheater    from "@/assets/images/gallery/gal-theater-lamp.webp";
import galWaiting    from "@/assets/images/gallery/gal-waiting-area.webp";
import galWard       from "@/assets/images/gallery/gal-ward-equipment.webp";
import facilityRec   from "@/assets/images/facility-reception.webp";

const slides = [
  { src: heroImg,      alt: "Peters Medicare Services — Kyenjojo",          caption: "Your Trusted Clinic in Kyenjojo" },
  { src: galMaternity, alt: "Maternity Ward",                                caption: "Dedicated Maternal & Child Care" },
  { src: galDental,    alt: "Dental Clinic",                                 caption: "Modern Dental & Eye Clinic" },
  { src: galWaiting,   alt: "Patient Waiting Area",                          caption: "Comfortable, Welcoming Environment" },
  { src: galCompound,  alt: "Clinic Compound",                               caption: "Serving Kyenjojo Since 2013" },
  { src: galTheater,   alt: "Operating Theater",                             caption: "Equipped Operating Theater" },
  { src: facilityRec,  alt: "Reception",                                     caption: "Friendly Reception Team" },
  { src: galStaff,     alt: "Staff at Desk",                                 caption: "Professional Healthcare Team" },
  { src: galOxygen,    alt: "Medical Equipment",                             caption: "Well-Stocked & Fully Equipped" },
  { src: galWard,      alt: "Ward Equipment",                                caption: "Quality Inpatient Care" },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } }),
};

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((delta: number) => {
    setDirection(delta);
    setIndex(i => (i + delta + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 4500);
    return () => clearInterval(id);
  }, [go, paused]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-xl"
      style={{ aspectRatio: "16/9" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={slides[index].src}
            alt={slides[index].alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay + caption */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-4 left-4 right-4 text-white text-sm font-semibold drop-shadow text-center"
          >
            {slides[index].caption}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next buttons */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/30 hover:bg-black/55 flex items-center justify-center text-white transition"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/30 hover:bg-black/55 flex items-center justify-center text-white transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-9 left-0 right-0 flex justify-center gap-1.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
            aria-label={`Go to slide ${i + 1}`}
            className="w-2 h-2 rounded-full transition-all"
            style={{ background: i === index ? "white" : "rgba(255,255,255,0.45)", transform: i === index ? "scale(1.25)" : "scale(1)" }}
          />
        ))}
      </div>
    </div>
  );
}
