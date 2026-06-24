import { Link, useLocation } from "wouter";
import { Menu, X, HeartPulse, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/data/translations";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home", lang), path: "/" },
    { name: t("nav.about", lang), path: "/about" },
    { name: t("nav.services", lang), path: "/services" },
    { name: t("nav.outreach", lang), path: "/outreach" },
    { name: t("nav.pricing", lang), path: "/pricing" },
    { name: t("nav.blog", lang), path: "/blog" },
    { name: t("nav.contact", lang), path: "/contact" },
  ];
  const isDonate = location === "/donate";

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'rn' : 'en');
  };

  return (
    <header
      className={`transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm dark:bg-card/90"
          : "bg-white dark:bg-card"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group" data-testid="link-logo-home">
            <img
              src="/pms-logo.png"
              alt="Peters Medicare Services"
              className="h-14 w-14 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg leading-none text-foreground">Peters Medicare</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Services</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 ml-auto mr-4">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2 font-bold px-2" data-testid="button-lang-toggle">
              <Globe className="w-4 h-4" />
              <span>{lang === 'en' ? 'EN' : 'RN'}</span>
            </Button>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary ${
                  location === link.path
                    ? "text-primary bg-primary/5"
                    : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className={`gap-1.5 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground ${isDonate ? "bg-secondary text-secondary-foreground" : ""}`}>
              <Link href="/donate" data-testid="link-nav-donate">
                <Heart className="w-4 h-4" />
                {t("nav.donate", lang)}
              </Link>
            </Button>
            <Button asChild variant="default" className="shadow-sm">
              <a href="https://wa.me/256776004277" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4" />
                {t("nav.book", lang)}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b"
          >
            <nav className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${
                    location === link.path
                      ? "text-primary bg-primary/10"
                      : "text-foreground/80 hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t flex flex-col gap-3">
                <Button variant="outline" className="w-full justify-center gap-2 font-bold" onClick={toggleLanguage} data-testid="button-lang-toggle-mobile">
                  <Globe className="w-4 h-4" />
                  {lang === 'en' ? 'Switch to Runyoro' : 'Switch to English'} ( {lang === 'en' ? 'EN' : 'RN'} )
                </Button>
                <Button asChild variant="outline" className="w-full justify-center gap-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                  <Link href="/donate" onClick={() => setIsMobileMenuOpen(false)} data-testid="link-mobile-donate">
                    <Heart className="w-4 h-4" />
                    {t("nav.donate", lang)}
                  </Link>
                </Button>
                <Button asChild className="w-full justify-center">
                  <a href="https://wa.me/256776004277" target="_blank" rel="noopener noreferrer">
                    {t("nav.book", lang)}
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
