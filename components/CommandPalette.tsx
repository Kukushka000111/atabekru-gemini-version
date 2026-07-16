"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import CommandContent from "@/components/CommandContent";

const WIDE_COMMANDS: Record<string, string> = {
  "/music": "max-w-xl",
  "/freetime": "max-w-5xl",
  "/games": "max-w-md",
  "/about": "max-w-xl",
  "/bakery": "max-w-xl",
  "/contact": "max-w-md",
  "/lastphoto": "max-w-md",
};

const MENU_ITEMS = [
  { label: "О СЕБЕ", command: "/about", description: "Экспонат I — Архитектура, стек и идеалы" },
  { label: "МУЗЫКА", command: "/music", description: "Экспонат II — Золотые пластины и волны звука" },
  { label: "ГИЛЬДИЯ ХЛЕБА", command: "/bakery", description: "Экспонат III — Кьяроскуро кулинарной выпечки" },
  { label: "ИГРЫ", command: "games", commandMapped: "/games", description: "Экспонат IV — Мозаичная нить Ариадны" }, // Wait, map games to /games
  { label: "ФОТО", command: "/lastphoto", description: "Экспонат V — Картина дня в серебряных лучах" },
  { label: "СВЯЗЬ", command: "/contact", description: "Экспонат VI — Голубиная почта и пергаменты" },
  { label: "ДОСУГ", command: "/freetime", description: "Экспонат VII — Старинный астрономический календарь" },
];

export default function CommandPalette() {
  const [activeCommand, setActiveCommand] = useState<string | null>(null);

  const resetPalette = useCallback(() => {
    setActiveCommand(null);
  }, []);

  const selectCommand = useCallback((command: string) => {
    const cleanCommand = command === "games" ? "/games" : command;
    setActiveCommand(cleanCommand);
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && activeCommand) {
        event.preventDefault();
        resetPalette();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [activeCommand, resetPalette]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-12 md:py-16">
      <AnimatePresence mode="wait">
        {!activeCommand ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-4xl text-center space-y-12"
          >
            {/* Hero Section */}
            <div className="space-y-4 select-none">
              <p className="font-serif text-[10px] tracking-[0.4em] text-gold-500/60 uppercase">
                Bienvenue à la Galerie d&apos;Art
              </p>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.18em] text-gold-500 font-bold leading-tight filter drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)] text-gold-gradient py-2">
                ATABEK
              </h1>
              <div className="flex items-center justify-center gap-3">
                <span className="h-[1px] w-8 bg-gold-500/25" />
                <p className="font-serif text-[11px] sm:text-xs tracking-[0.3em] text-gold-300/60 uppercase">
                  THE ART OF SOUND AND CODE
                </p>
                <span className="h-[1px] w-8 bg-gold-500/25" />
              </div>
            </div>

            {/* Menu Navigation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 max-w-5xl mx-auto px-2">
              {MENU_ITEMS.map((item, idx) => (
                <motion.button
                  key={item.command}
                  type="button"
                  data-cursor-hover
                  onClick={() => selectCommand(item.command)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="group relative flex flex-col items-center justify-center border border-gold-500/20 bg-gold-500/[0.02] py-5 px-3 rounded-sm transition-all duration-300 hover:border-gold-500/60 hover:bg-gold-500/[0.08] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                >
                  {/* Candlelight hover glow effect inside button */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 bg-radial-gradient from-gold-500/10 via-transparent to-transparent group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <span className="font-serif text-xs font-semibold tracking-[0.2em] text-gold-400 group-hover:text-gold-300 group-hover:scale-105 transition-all duration-300">
                    {item.label}
                  </span>
                  
                  {/* Decorative tiny Roman numerals or dots */}
                  <span className="mt-2 text-[8px] font-mono tracking-widest text-white/20 group-hover:text-gold-500/60 transition-colors">
                    EXH {idx + 1}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Bottom gallery metadata */}
            <p className="text-[10px] font-serif text-gold-300/30 uppercase tracking-[0.25em]">
              Музей цифрового искусства Бекича • Все экспонаты интерактивны
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="exhibit"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`w-full overflow-hidden rounded-md border border-gold-500/20 bg-[#07070a]/90 shadow-[0_24px_80px_rgba(212,175,55,0.06)] backdrop-blur-md p-6 ${WIDE_COMMANDS[activeCommand] ?? "max-w-xl"}`}
          >
            {/* Elegant Header with Back Button */}
            <div className="flex items-center justify-between border-b border-gold-500/10 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse" />
                <span className="font-serif text-[10px] tracking-widest text-gold-500/70 uppercase">
                  SALLE {activeCommand.toUpperCase()}
                </span>
              </div>
              
              <button
                type="button"
                data-cursor-hover
                onClick={resetPalette}
                className="group flex items-center gap-1.5 border border-gold-500/20 bg-gold-500/[0.03] px-3.5 py-1 text-xs font-serif text-gold-400 rounded-sm transition-all duration-300 hover:border-gold-500 hover:bg-gold-500/10 hover:text-gold-300"
              >
                <span className="transition-transform group-hover:-translate-x-0.5">←</span> Назад
                <kbd className="hidden sm:inline-block ml-1 px-1 py-0.2 font-mono text-[9px] border border-gold-500/30 bg-[#050507] text-gold-500/60 rounded">
                  Esc
                </kbd>
              </button>
            </div>

            {/* Exhibit Content wrapper */}
            <div className="relative">
              <CommandContent commandName={activeCommand} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
