import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingCTAs } from "./FloatingCTAs";
import { ClinicStatusBanner } from "./ClinicStatusBanner";
import { EmergencyGuide } from "../sections/EmergencyGuide";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
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
      <EmergencyGuide />
    </div>
  );
}
