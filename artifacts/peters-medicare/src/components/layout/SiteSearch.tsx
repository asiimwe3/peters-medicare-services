import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Search, X, ArrowRight, Stethoscope, FileText, File, HelpCircle, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchContent, SearchResult } from "@/data/search-index";
import { Button } from "@/components/ui/button";

interface SiteSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const typeIcons = {
  service: <Stethoscope className="w-4 h-4 text-blue-500" />,
  page: <File className="w-4 h-4 text-gray-500" />,
  blog: <FileText className="w-4 h-4 text-green-500" />,
  pricing: <DollarSign className="w-4 h-4 text-teal-500" />,
  faq: <HelpCircle className="w-4 h-4 text-purple-500" />,
};

const typeColors = {
  service: "bg-blue-100",
  page: "bg-gray-100",
  blog: "bg-green-100",
  pricing: "bg-teal-100",
  faq: "bg-purple-100",
};

export function SiteSearch({ isOpen, onClose }: SiteSearchProps) {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) {
          // You need an event emitter or state lift to open from anywhere, but Layout handles it.
          // In Layout we will listen to Cmd+K as well.
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const results = searchContent(query);

  const handleResultClick = (result: SearchResult) => {
    setLocation(result.path);
    onClose();
  };

  const handleBookClick = (e: React.MouseEvent, msg: string) => {
    e.stopPropagation();
    window.open(`https://wa.me/256776004277?text=${encodeURIComponent(msg)}`, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-card rounded-xl shadow-2xl border overflow-hidden pointer-events-auto flex flex-col max-h-[80vh]"
              role="dialog"
              aria-modal="true"
              aria-label="Site search"
              data-testid="modal-search"
            >
              <div className="flex items-center border-b px-4 py-3">
                <Search className="w-5 h-5 text-muted-foreground mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search services, prices, or health topics..."
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                  data-testid="input-search"
                />
                <button onClick={onClose} className="p-1 rounded-md hover:bg-muted ml-2 text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto p-2">
                {query.trim() === "" ? (
                  <div className="p-4 text-sm">
                    <p className="text-muted-foreground mb-3 font-medium text-xs uppercase tracking-wider">Popular Searches</p>
                    <div className="flex flex-wrap gap-2">
                      {["General Consultation", "Antenatal", "HIV Testing", "Malaria Test"].map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3 py-1.5 bg-muted rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-1">
                    {results.map((result) => (
                      <div
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="flex items-center p-3 hover:bg-muted rounded-lg cursor-pointer group transition-colors"
                        data-testid={`result-item-${result.id}`}
                      >
                        <div className={`p-2 rounded-md ${typeColors[result.type]} mr-4 shrink-0`}>
                          {typeIcons[result.type]}
                        </div>
                        <div className="flex-1 min-w-0 mr-4">
                          <h4 className="font-semibold text-sm truncate">{result.title}</h4>
                          <p className="text-xs text-muted-foreground truncate">{result.description}</p>
                        </div>
                        {result.type === "service" && result.whatsappMessage ? (
                          <Button
                            size="sm"
                            variant="default"
                            className="h-7 px-3 bg-green-600 hover:bg-green-700 shrink-0 text-xs"
                            onClick={(e) => handleBookClick(e, result.whatsappMessage!)}
                          >
                            Book
                          </Button>
                        ) : (
                          <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground text-sm">
                      No results for "{query}" — try "malaria", "antenatal", or "dental"
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}