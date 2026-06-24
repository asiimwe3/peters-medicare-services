import { Link } from "wouter";
import { Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex" data-testid="link-footer-logo">
              <img
                src="/pms-logo.png"
                alt="Peters Medicare Services"
                className="h-16 w-16 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg leading-none text-foreground">Peters Medicare</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Services</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mt-4">
              Quality, Affordable & Patient-Centered Healthcare serving Kyenjojo, Kyegegwa, Kibaale, and the Rwenzori region.
            </p>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Our Services", path: "/services" },
                { name: "Community Outreach", path: "/outreach" },
                { name: "Pricing", path: "/pricing" },
                { name: "Health Blog", path: "/blog" },
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>General Medical Consultation</li>
              <li>Maternal & Antenatal Care</li>
              <li>Laboratory Diagnostics & Ultrasound</li>
              <li>Dental & Eye Care</li>
              <li>HIV Testing & Counseling</li>
              <li>Community Health Screenings</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Kyenjojo Town, 200m along Kyenjojo–Kagadi Road, Uganda</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+256776004277" className="hover:text-primary transition-colors">+256 776 004 277</a>
                  <a href="tel:+256778989221" className="hover:text-primary transition-colors">+256 778 989 221</a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Peters Medicare Services. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Established 2013</span>
            <span>•</span>
            <span>Licensed by Ministry of Health Uganda</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
