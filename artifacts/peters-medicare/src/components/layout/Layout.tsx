import { ReactNode, useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingCTAs } from "./FloatingCTAs";
import { ClinicStatusBanner } from "./ClinicStatusBanner";
import { EmergencyGuide } from "../sections/EmergencyGuide";
import { SiteSearch } from "./SiteSearch";
import { BookingWidget } from "../sections/BookingWidget";
import { BackToTop } from "./BackToTop";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("open-search", handleOpenSearch);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("open-search", handleOpenSearch);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-primary/20 selection:text-primary pt-[calc(5rem+40px)]">
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        <ClinicStatusBanner />
        <Navbar />
      </div>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingCTAs />
      <BookingWidget />
      <BackToTop />
      <EmergencyGuide />
      <SiteSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
