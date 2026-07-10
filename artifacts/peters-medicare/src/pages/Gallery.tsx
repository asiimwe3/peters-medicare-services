import { useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const galleryItems = [
  { src: new URL("../assets/images/gallery/gal-campus-aerial-wide.webp", import.meta.url).href,  label: "Campus Aerial View",  category: "exterior", alt: "Aerial view of Peters Medicare Services campus in Kyenjojo" },
  { src: new URL("../assets/images/gallery/gal-facility-aerial.webp", import.meta.url).href,     label: "Facility from Above", category: "exterior", alt: "Drone aerial view of Peters Medicare Services compound" },
  { src: new URL("../assets/images/gallery/gal-compound-overview.webp", import.meta.url).href,   label: "Compound Overview",   category: "exterior", alt: "Overview of Peters Medicare Services compound" },
];

export function Gallery() {
  useSEO({
    title: "Facility Gallery | Peters Medicare Services Kyenjojo",
    description: "View photos of Peters Medicare Services — our compound and aerial views in Kyenjojo, Uganda.",
    canonical: "https://asiimwe3.github.io/peters-medicare-services/gallery",
  });

  const [lightbox, setLightbox] = useState<number | null>(null);
  const prev = () => setLightbox(i => i !== null ? (i - 1 + galleryItems.length) % galleryItems.length : null);
  const next = () => setLightbox(i => i !== null ? (i + 1) % galleryItems.length : null);

  return (
    <div className="w-full pb-24">
      <section className="bg-primary/5 py-16 md:py-20 border-b">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Facilities</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A look at Peters Medicare Services — our compound and facilities in Kyenjojo, Uganda.
          </p>
          <p className="mt-4 text-sm text-muted-foreground italic">More photos coming soon.</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {galleryItems.map((item, i) => (
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.06 }}
                  className="relative group rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow aspect-video"
                  onClick={() => setLightbox(i)}
                >
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
              <img src={galleryItems[lightbox].src} alt={galleryItems[lightbox].alt}
                className="max-h-[82vh] max-w-full rounded-lg object-contain" />
              <p className="text-white/80 text-sm font-medium">{galleryItems[lightbox].label}</p>
            </motion.div>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl z-10 w-12 h-12 flex items-center justify-center"
              onClick={e => { e.stopPropagation(); next(); }}>›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
