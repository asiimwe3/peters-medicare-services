import { useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Gallery images — all 27 real facility photos
const galleryItems = [
  { src: new URL("../assets/images/gallery/gal-compound-hero.webp", import.meta.url).href,       label: "Main Compound",        category: "exterior",  alt: "Peters Medicare Services main compound with signage" },
  { src: new URL("../assets/images/gallery/gal-campus-aerial-wide.webp", import.meta.url).href,  label: "Campus Aerial",        category: "exterior",  alt: "Aerial view of Peters Medicare Services campus" },
  { src: new URL("../assets/images/gallery/gal-facility-aerial.webp", import.meta.url).href,     label: "Facility from Above",  category: "exterior",  alt: "Aerial drone view of Peters Medicare Services" },
  { src: new URL("../assets/images/gallery/gal-compound-signage.webp", import.meta.url).href,    label: "Clinic Entrance",      category: "exterior",  alt: "Peters Medicare Services entrance with signage" },
  { src: new URL("../assets/images/gallery/gal-compound-entrance.webp", import.meta.url).href,   label: "Compound Entrance",    category: "exterior",  alt: "Main entrance compound" },
  { src: new URL("../assets/images/gallery/gal-exterior-building.webp", import.meta.url).href,   label: "Clinic Building",      category: "exterior",  alt: "Exterior view of Peters Medicare Services building" },
  { src: new URL("../assets/images/gallery/gal-exterior-side.webp", import.meta.url).href,       label: "Clinic Grounds",       category: "exterior",  alt: "Clinic grounds and garden area" },
  { src: new URL("../assets/images/gallery/gal-facility-external.webp", import.meta.url).href,   label: "Facility Exterior",    category: "exterior",  alt: "External view of facility" },
  { src: new URL("../assets/images/gallery/gal-outdoor-area.webp", import.meta.url).href,        label: "Outdoor Grounds",      category: "exterior",  alt: "Outdoor grounds of Peters Medicare Services" },
  { src: new URL("../assets/images/gallery/gal-clinic-exterior-2.webp", import.meta.url).href,   label: "Building View",        category: "exterior",  alt: "Peters Medicare Services building" },
  { src: new URL("../assets/images/gallery/gal-outdoor-view.webp", import.meta.url).href,        label: "Clinic Outdoors",      category: "exterior",  alt: "Outdoor clinic area" },
  { src: new URL("../assets/images/gallery/gal-building-exterior.webp", import.meta.url).href,   label: "Building Exterior",    category: "exterior",  alt: "Building exterior view" },
  { src: new URL("../assets/images/gallery/gal-outdoor-grounds.webp", import.meta.url).href,     label: "Outdoor Area",         category: "exterior",  alt: "Outdoor grounds" },
  { src: new URL("../assets/images/gallery/gal-compound-overview.webp", import.meta.url).href,   label: "Compound Overview",    category: "exterior",  alt: "Overview of the compound" },
  { src: new URL("../assets/images/gallery/gal-maternity-ward.webp", import.meta.url).href,      label: "Maternity Ward",       category: "wards",     alt: "Maternity ward at Peters Medicare Services" },
  { src: new URL("../assets/images/gallery/gal-ward-corridor.webp", import.meta.url).href,       label: "Ward Corridor",        category: "wards",     alt: "Ward corridor" },
  { src: new URL("../assets/images/gallery/gal-staff-corridor.webp", import.meta.url).href,      label: "Staff Corridor",       category: "wards",     alt: "Staff and corridor area" },
  { src: new URL("../assets/images/gallery/gal-ward-beds.webp", import.meta.url).href,           label: "Patient Beds",         category: "wards",     alt: "Patient ward beds" },
  { src: new URL("../assets/images/gallery/gal-ward-area.webp", import.meta.url).href,           label: "Ward Area",            category: "wards",     alt: "Ward area" },
  { src: new URL("../assets/images/gallery/gal-patient-consultation.webp", import.meta.url).href,"label": "Consultation Room",   category: "clinical",  alt: "Patient consultation room" },
  { src: new URL("../assets/images/gallery/gal-lab-equipment.webp", import.meta.url).href,       label: "Laboratory",           category: "clinical",  alt: "Laboratory equipment" },
  { src: new URL("../assets/images/gallery/gal-reception-desk.webp", import.meta.url).href,      label: "Reception",            category: "clinical",  alt: "Reception desk" },
  { src: new URL("../assets/images/gallery/gal-consultation-area.webp", import.meta.url).href,   label: "Consultation Area",    category: "clinical",  alt: "Consultation area" },
  { src: new URL("../assets/images/gallery/gal-facility-room.webp", import.meta.url).href,       label: "Clinical Room",        category: "clinical",  alt: "Clinical room" },
  { src: new URL("../assets/images/gallery/gal-maternity-patient.webp", import.meta.url).href,   label: "Maternity Care",       category: "clinical",  alt: "Maternity patient care" },
  { src: new URL("../assets/images/gallery/gal-staff-team.webp", import.meta.url).href,          label: "Medical Team",         category: "staff",     alt: "Peters Medicare medical staff" },
  { src: new URL("../assets/images/gallery/gal-staff-clinician.webp", import.meta.url).href,     label: "Clinical Staff",       category: "staff",     alt: "Clinician at work" },
];

const categories = [
  { id: "all",      label: "All Photos" },
  { id: "exterior", label: "Exterior & Grounds" },
  { id: "wards",    label: "Wards" },
  { id: "clinical", label: "Clinical Spaces" },
  { id: "staff",    label: "Our Staff" },
];

export function Gallery() {
  useSEO({
    title: "Facility Gallery | Peters Medicare Services Kyenjojo",
    description: "View photos of Peters Medicare Services — our compound, maternity ward, laboratory, consultation rooms, staff, and clinical facilities in Kyenjojo, Uganda.",
    canonical: "https://asiimwe3.github.io/peters-medicare-services/gallery",
  });

  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "all" ? galleryItems : galleryItems.filter(g => g.category === active);

  const prev = () => setLightbox(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
  const next = () => setLightbox(i => i !== null ? (i + 1) % filtered.length : null);

  return (
    <div className="w-full pb-24">
      {/* Header */}
      <section className="bg-primary/5 py-16 md:py-20 border-b">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Facilities</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A look inside Peters Medicare Services — from our compound and wards to our clinical spaces and the team behind your care.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 border-b bg-card sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {cat.label}
              <span className="ml-2 text-xs opacity-70">
                ({cat.id === "all" ? galleryItems.length : galleryItems.filter(g => g.category === cat.id).length})
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, delay: i * 0.02 }}
                  className="relative group break-inside-avoid rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
                  onClick={() => setLightbox(i)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
              onClick={() => setLightbox(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl font-light z-10 w-12 h-12 flex items-center justify-center"
              onClick={e => { e.stopPropagation(); prev(); }}
            >‹</button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-5xl max-h-[90vh] flex flex-col items-center gap-3"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                className="max-h-[82vh] max-w-full rounded-lg object-contain"
              />
              <p className="text-white/80 text-sm font-medium">{filtered[lightbox].label}</p>
            </motion.div>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl font-light z-10 w-12 h-12 flex items-center justify-center"
              onClick={e => { e.stopPropagation(); next(); }}
            >›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
