import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, X, ArrowLeft, RotateCcw, Phone, MessageCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { symptomQuestions, results } from "@/data/symptom-guide";

export function EmergencyGuide() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [currentId, setCurrentId] = useState("start");
  const [resultId, setResultId] = useState<string | null>(null);

  const currentQuestion = symptomQuestions.find(q => q.id === currentId);
  const result = resultId ? results[resultId as keyof typeof results] : null;

  const handleOptionClick = (nextId: string | null, result?: string) => {
    if (result) {
      setResultId(result);
    } else if (nextId) {
      setHistory([...history, currentId]);
      setCurrentId(nextId);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prevId = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentId(prevId);
    }
  };

  const handleRestart = () => {
    setHistory([]);
    setCurrentId("start");
    setResultId(null);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.3 }}
          onClick={() => setIsOpen(true)}
          className="bg-red-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:bg-red-600 transition-colors flex items-center gap-3 group relative overflow-hidden"
          data-testid="button-emergency-guide"
        >
          <div className="absolute inset-0 bg-red-400 opacity-20 animate-ping rounded-full" />
          <Stethoscope className="w-6 h-6 relative z-10" />
          <span className="hidden sm:block font-bold text-sm uppercase tracking-wide relative z-10">
            {lang === 'rn' ? 'Ni Amabara?' : 'Is it an Emergency?'}
          </span>
        </motion.button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-background/80 backdrop-blur-sm" data-testid="modal-emergency-guide">
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border overflow-hidden flex flex-col max-h-[90dvh]"
            >
              <div className="p-4 border-b flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-2 font-bold text-foreground">
                  <Stethoscope className="w-5 h-5 text-red-500" />
                  {lang === 'rn' ? 'Obuhwezi bw\'Amabara' : 'Symptom Guide'}
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 overflow-y-auto">
                {result ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 
                      ${result.level === 'emergency' ? 'bg-red-100 text-red-600' : 
                        result.level === 'urgent' ? 'bg-orange-100 text-orange-600' : 
                        result.level === 'soon' ? 'bg-yellow-100 text-yellow-600' : 
                        'bg-green-100 text-green-600'}`}
                    >
                      <AlertTriangle className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold font-serif mb-3">
                      {lang === 'rn' ? result.titleRn : result.title}
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      {lang === 'rn' ? result.descriptionRn : result.description}
                    </p>
                    <div className="space-y-3">
                      <Button asChild size="lg" className={`w-full gap-2 ${result.level === 'emergency' ? 'bg-red-600 hover:bg-red-700' : ''}`}>
                        <a href={result.actionLink} target={result.actionLink.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                          {result.actionLink.startsWith('tel:') ? <Phone className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
                          {lang === 'rn' ? result.actionRn : result.action}
                        </a>
                      </Button>
                      <Button variant="outline" size="lg" className="w-full gap-2" onClick={handleRestart} data-testid="button-restart">
                        <RotateCcw className="w-4 h-4" />
                        {lang === 'rn' ? 'Tandika Busya' : 'Start Over'}
                      </Button>
                    </div>
                  </motion.div>
                ) : currentQuestion ? (
                  <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-bold font-serif mb-6 leading-snug">
                      {lang === 'rn' ? currentQuestion.questionRn : currentQuestion.question}
                    </h3>
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionClick(option.nextId, option.result)}
                          className="w-full text-left p-4 rounded-xl border bg-card hover:bg-muted/50 hover:border-primary/50 transition-all font-medium flex items-center justify-between group"
                          data-testid={`button-option-${i}`}
                        >
                          <span>{lang === 'rn' ? option.labelRn : option.label}</span>
                          <div className="w-6 h-6 rounded-full border border-muted-foreground/30 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 text-primary">
                            <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      ))}
                    </div>
                    {history.length > 0 && (
                      <div className="mt-8">
                        <Button variant="ghost" onClick={handleBack} className="gap-2 text-muted-foreground" data-testid="button-back">
                          <ArrowLeft className="w-4 h-4" />
                          {lang === 'rn' ? 'Garuka' : 'Back'}
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ) : null}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
