import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, User, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { chatWithAI } from "../services/geminiService";
import { cn } from "../lib/utils";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "model", content: "Hello! I'm your Collivio AI assistant. How can I help you discover opportunities or manage your research today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Map history for Gemini API
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const aiResponse = await chatWithAI(input, history);
      setMessages(prev => [...prev, { role: "model", content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "model", content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[380px] h-[520px] bg-white rounded-3xl shadow-elegant border border-black/5 flex flex-col mb-4 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-wine-grad p-4 py-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg leading-none">Collivio AI</h3>
                  <span className="text-[10px] uppercase tracking-widest opacity-70">Always active</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-bg/30"
            >
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex flex-col max-w-[80%] gap-1",
                    m.role === "user" ? "self-end items-end" : "self-start items-start"
                  )}
                >
                  <div className={cn(
                    "p-3.5 rounded-2xl text-sm leading-relaxed",
                    m.role === "user" 
                      ? "bg-wine text-white rounded-tr-none" 
                      : "bg-white border border-black/5 text-fg shadow-sm rounded-tl-none"
                  )}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="self-start bg-white border border-black/5 p-3 px-4 rounded-2xl text-xs text-muted flex gap-1 items-center">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce [animation-delay:0.2s]">.</span>
                  <span className="animate-bounce [animation-delay:0.4s]">.</span>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-black/5 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about research hub, internships..."
                className="flex-1 text-sm bg-secondary px-4 py-2.5 rounded-xl border border-black/5 focus:outline-none focus:ring-2 focus:ring-wine/20 transition-all font-sans"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-wine-grad text-white flex items-center justify-center shadow-glow disabled:opacity-50 transition-all active:scale-95"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-elegant transition-all active:scale-95 group relative overflow-hidden",
          isOpen ? "bg-fire" : "bg-wine-grad"
        )}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity" />
        {isOpen ? <X size={24} /> : <Bot size={28} />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>
    </div>
  );
}
