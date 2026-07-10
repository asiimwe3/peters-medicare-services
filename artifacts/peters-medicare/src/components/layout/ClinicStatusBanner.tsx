import { useState, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function ClinicStatusBanner() {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [alertText, setAlertText] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("peters-medicare-banner-dismissed") === "true") {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);

    const month = new Date().getMonth();
    const alerts = [
      "January heat: Stay hydrated and protect against heatstroke",
      "Dry season: Respiratory infections common — visit us if you have a persistent cough",
      "Long rains beginning: Malaria risk rises — use bed nets and seek treatment early",
      "Peak malaria season: Free malaria testing available at our clinic",
      "Rain season continues: Protect your family — malaria nets and clean water essential",
      "Dry season: Good time for health checkups and routine screenings",
      "Community outreach season: Check our calendar for free health days near you",
      "August immunization drive: Bring your children in for free vaccines",
      "Short rains approaching: Stock up on malaria prevention now",
      "Short rainy season: Waterborne diseases — boil your water, wash hands",
      "Peak malaria — short rains: Free malaria testing at Peters Medicare",
      "Holiday season: Don't ignore symptoms — we are open 24/7 for you"
    ];
    setAlertText(alerts[month]);
  }, []);

  if (!isVisible) return null;

  const dismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("peters-medicare-banner-dismissed", "true");
  };

  return (
    <div className="bg-primary/95 text-white py-2 px-4 flex items-center justify-between z-[60] w-full border-b border-primary/20" data-testid="banner-clinic-status">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm flex-1 text-center">
        <div className="flex items-center gap-2 font-medium shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.4)]"></span>
          Open 24/7 — Always Here For You
        </div>
        <div className="hidden sm:block text-primary-foreground/40 shrink-0">|</div>
        <div className="flex items-center gap-2 text-primary-foreground/90 max-w-xl">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-300" />
          <span className="truncate sm:whitespace-normal">{alertText}</span>
        </div>
      </div>
      <button onClick={dismiss} className="text-white/70 hover:text-white shrink-0 ml-2 p-1" aria-label="Dismiss">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
