import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  const isDark =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <header className="w-full flex items-center justify-between px-6 md:px-12 py-4">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Aerosky
      </motion.h1>

      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 flex items-center justify-center"
          aria-label="Toggle dark mode"
          title="Toggle dark mode"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-300" />
          )}
        </button>
      </div>
    </header>
  );
}
