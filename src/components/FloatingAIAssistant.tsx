import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FloatingAIAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: "ai", text: "Hi 👋 I'm Nexa. Ask me anything about your workforce." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMsgs((m) => [...m, { role: "user", text: input }, { role: "ai", text: "Analyzing your data… here's a quick insight based on real-time signals." }]);
    setInput("");
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-3rem)] h-[480px] glass-card rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-border flex items-center justify-between gradient-bg">
              <div className="flex items-center gap-2 text-primary-foreground">
                <Sparkles className="w-4 h-4" />
                <div>
                  <p className="font-semibold text-sm">Nexa AI</p>
                  <p className="text-[10px] opacity-80">Always listening</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="text-primary-foreground hover:bg-white/10 h-7 w-7"><X className="w-4 h-4" /></Button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
                  <div className={`max-w-[80%] text-sm px-3 py-2 rounded-2xl ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{m.text}</div>
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-border flex gap-1.5">
              <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0"><Mic className="w-4 h-4" /></Button>
              <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask Nexa…" className="h-9" />
              <Button onClick={send} size="icon" className="h-9 w-9 shrink-0"><Send className="w-4 h-4" /></Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-bg shadow-xl flex items-center justify-center z-50 group"
      >
        <span className="absolute inset-0 rounded-full gradient-bg opacity-50 animate-ping" />
        <Sparkles className="w-6 h-6 text-primary-foreground relative z-10" />
      </motion.button>
    </>
  );
}