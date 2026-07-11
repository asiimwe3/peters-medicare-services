import { useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const galleryItems = [
  {
    src: new URL("../assets/images/gallery/gal-theater-lamp.webp", import.meta.url).href,
    label: "Surgical Theater Lamp",
    category: "clinical",
    alt: "Surgical theater lamp at Peters Medicare Services"
  },
  {
    src: new URL("../assets/images/gallery/gal-ward-equipment.webp", import.meta.url).href,
    label: "Ward Medical Equipment",
    category: "wards",
    alt: "Mindray medical equipment and patient bed at Peters Medicare Services"
  },
  {
    src: new URL("../assets/images/gallery/gal-maternity-ward.webp", import.meta.url).href,
    label: "Maternity Ward",
    category: "maternity",
    alt: "Maternity ward beds with baby cot at Peters Medicare Services"
  },
  {
    src: new URL("../assets/images/gallery/gal-dental-clinic.webp", import.meta.url).href,
    label: "Dental Clinic",
    category: "clinical",
    alt: "Dental treatment chair and equipment at Peters Medicare Services"
  },
];

const categories = [
  { id: "all",      label: "All Photos" },
  { id: "clinical", label: "Theater" },
  { id: "wards",    label: "Wards" },
  { id: "maternity", label: "Maternity" },
  { id: "dental",    label: "Dental" },
];

export function Gallery() {
  useSEO({
    title: "Facility Gallery | Peters Medicare Services Kyenjojo",
    description: "View verified photos of Peters Medicare Services facilities in Kyenjojo, Uganda.",
    canonical: "https://asiimwe3.github.io/peters-medicare-services/gallery",
  });

  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "all" ? galleryItems : galleryItems.filter(g => g.category === active);

  const prev = () => setLightbox(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
  const next = () => setLightbox(i => i !== null ? (i + 1) % filtered.length : null);

  return (
    <div className="w-full pb-24">
      <section className="bg-primary/5 py-16 md:py-20 border-b">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Facilities</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A visual tour of Peters Medicare Services — our clinical spaces and equipment in Kyenjojo, Uganda.
          </p>
          <p className="mt-4 text-sm text-muted-foreground italic">More photos coming soon.</p>
        </div>
      </section>

      <section className="py-8 border-b bg-card sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActive(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat.id ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}>
              {cat.label}
              <span className="ml-2 text-xs opacity-70">
                ({cat.id === "all" ? galleryItems.length : galleryItems.filter(g => g.category === cat.id).length})
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div key={item.src} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.06 }}
                  className="relative group rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow aspect-video"
                  onClick={() => setLightbox(i)}>
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-3">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100">
                      <span className="text-white text-sm font-semibold drop-shadow">{item.label}</span>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-5 h-5 text-white drop-shadow" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}>
            <button className="absolute top-4 right-4 text-white/70 hover:text-white z-10" onClick={() => setLightbox(null)}>
              <X className="w-8 h-8" />
            </button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl z-10 w-12 h-12 flex items-center justify-center"
              onClick={e => { e.stopPropagation(); prev(); }}>‹</button>
            <motion.div key={lightbox} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              className="max-w-5xl max-h-[90vh] flex flex-col items-center gap-3" onClick={e => e.stopPropagation()}>
              <img src={filtered[lightbox].src} alt={filtered[lightbox].alt}
                className="max-h-[82vh] max-w-full rounded-lg object-contain" />
              <p className="text-white/80 text-sm font-medium">{filtered[lightbox].label}</p>
            </motion.div>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl z-10 w-12 h-12 flex items-center justify-center"
              onClick={e => { e.stopPropagation(); next(); }}>›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
