import { useSEO } from "@/hooks/use-seo";
import { Camera } from "lucide-react";

export function Gallery() {
  useSEO({
    title: "Facility Gallery | Peters Medicare Services Kyenjojo",
    description: "View photos of Peters Medicare Services facilities in Kyenjojo, Uganda. Gallery coming soon.",
    canonical: "https://asiimwe3.github.io/peters-medicare-services/gallery",
  });

  return (
    <div className="w-full pb-24">
      <section className="bg-primary/5 py-16 md:py-20 border-b">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Facilities</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A visual tour of Peters Medicare Services — our compound, wards, and clinical spaces in Kyenjojo, Uganda.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Camera className="w-10 h-10 text-primary/60" />
          </div>
          <h2 className="text-2xl font-semibold text-muted-foreground">Gallery Coming Soon</h2>
          <p className="text-muted-foreground max-w-md">
            We are preparing verified photos of our facilities. Please check back shortly or contact us directly for a facility tour.
          </p>
          <a
            href="/contact"
            className="mt-2 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
