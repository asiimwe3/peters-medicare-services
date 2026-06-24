import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { outreachEvents, OutreachEvent } from "@/data/outreach-events";
import { t } from "@/data/translations";

export function OutreachCalendar() {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "screening", label: "Screening" },
    { id: "hiv", label: "HIV" },
    { id: "maternal", label: "Maternal" },
    { id: "immunization", label: "Immunization" },
    { id: "general", label: "General" }
  ];

  const filteredEvents = outreachEvents
    .filter(e => filter === "all" || e.type === filter)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getTypeColor = (type: OutreachEvent["type"]) => {
    switch (type) {
      case "screening": return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300";
      case "hiv": return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300";
      case "circumcision": return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300";
      case "maternal": return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300";
      case "immunization": return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300";
      case "general": return "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300";
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(c => (
          <Button
            key={c.id}
            variant={filter === c.id ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(c.id)}
            className="rounded-full"
            data-testid={`filter-${c.id}`}
          >
            {c.label}
          </Button>
        ))}
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed">
          <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-1">No upcoming events</h3>
          <p className="text-muted-foreground">Check back soon for new programs in this category.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => {
            const dateObj = new Date(event.date);
            const day = format(dateObj, "dd");
            const month = format(dateObj, "MMM");
            
            return (
              <div 
                key={event.id} 
                className="bg-card border rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 hover:shadow-md transition-shadow"
                data-testid="event-card"
              >
                {/* Date block */}
                <div className="shrink-0 flex flex-row md:flex-col items-center justify-center md:justify-start gap-3 md:gap-0 bg-muted/50 rounded-lg p-3 md:w-24 md:h-24">
                  <span className="text-3xl font-bold font-serif text-primary leading-none">{day}</span>
                  <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{month}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className={`capitalize ${getTypeColor(event.type)}`}>
                        {event.type}
                      </Badge>
                      {event.isFree && <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground hover:bg-secondary/30">Free</Badge>}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold font-serif mb-2">
                    {lang === 'rn' ? event.titleRn : event.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{event.location}, {event.district}</span>
                  </div>
                  
                  <p className="text-muted-foreground line-clamp-2 text-sm md:text-base mb-4">
                    {lang === 'rn' ? event.descriptionRn : event.description}
                  </p>
                </div>

                {/* Action */}
                <div className="shrink-0 flex items-center md:items-start md:pt-2">
                  <Button asChild className="w-full md:w-auto gap-2">
                    <a href={`https://wa.me/256776004277?text=Hello, I would like to register for the ${event.title} on ${event.date}`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4" />
                      Register via WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
