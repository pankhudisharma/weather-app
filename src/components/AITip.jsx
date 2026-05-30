import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AITip({ tip }) {
  if (!tip) return null;

  return (
    <motion.div
      className="w-full glass-card rounded-2xl p-4 mt-6 flex items-center gap-3 relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Absolute floating bg glow */}
      <div className="absolute -left-10 -top-10 w-24 h-24 bg-sky-400/5 rounded-full blur-xl pointer-events-none" />
      
      <div className="p-2 bg-sky-500/20 text-sky-300 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
        <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
      </div>
      
      <div className="flex-1 text-left">
        <h4 className="text-xs font-semibold text-white/50 tracking-wider uppercase mb-0.5">
          Aerosky Lifestyle Insight
        </h4>
        <p className="text-sm font-medium text-white/90 leading-snug m-0">
          {tip}
        </p>
      </div>
    </motion.div>
  );
}
