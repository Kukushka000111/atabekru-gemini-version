"use client";

import { motion } from "framer-motion";
import CommandPanel from "@/components/commands/CommandPanel";

function GildedWheatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-5 w-5 text-gold-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v18M12 5c-1.5 2-3 2.5-3 5.5s1.5 4.5 3 4.5M12 5c1.5 2 3 2.5 3 5.5s-1.5 4.5-3 4.5M12 10c-1.5 2-3 2.5-3 5.5s1.5 4.5 3 4.5M12 10c1.5 2 3 2.5 3 5.5s-1.5 4.5-3 4.5"
      />
    </svg>
  );
}

export default function BakeryContent() {
  return (
    <CommandPanel>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-md border border-gold-500/15 bg-gradient-to-br from-[#07070a] via-[#0b0a0f] to-[#040406] p-6 sm:p-8"
      >
        {/* Caravaggio Dramatic Spotlight (Chiaroscuro) */}
        <div className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 h-44 w-44 rounded-full bg-gold-500/[0.05] blur-3xl mix-blend-screen" />

        <div className="relative text-center space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-500/50">
              Exhibit III • Divine Bakers Guild
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-gold-400">
              ГИЛЬДИЯ ХЛЕБА
            </h2>
            <div className="mx-auto h-[1px] w-20 bg-gradient-to-r from-transparent via-gold-500/35 to-transparent" />
          </div>

          {/* Golden Illuminated Quote (Chiaroscuro ambiance) */}
          <div className="max-w-md mx-auto space-y-4">
            <p className="font-serif italic text-white/90 text-sm leading-relaxed">
              «В глубоких тенях печи рождается истинное золото жизни — хрустящий багет, овеянный теплом вечного пламени».
            </p>
            <p className="font-serif text-xs text-gold-300/40 tracking-wide">
              Каноническая выпечка по секретным пергаментам Артемия Лебедева.
            </p>
          </div>

          {/* Interactive Wax Seal Stamp Button (Сургучная Печать) */}
          <div className="flex justify-center pt-4">
            <a
              href="#"
              data-cursor-hover
              onClick={(event) => event.preventDefault()}
              className="group relative flex items-center justify-center"
            >
              {/* Outer soft shadow on hover */}
              <div className="absolute inset-0 rounded-full bg-red-700/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Wax Seal Body */}
              <div className="relative flex items-center gap-2.5 rounded-full border-2 border-red-800 bg-gradient-to-br from-red-700 via-red-800 to-red-950 px-6 py-3.5 font-serif text-xs font-bold uppercase tracking-widest text-gold-300 shadow-[0_6px_20px_rgba(153,27,27,0.35)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_25px_rgba(153,27,27,0.55)]">
                {/* Stamp Outer Ring Line */}
                <div className="absolute inset-1 rounded-full border border-red-600/30 pointer-events-none" />
                
                <span className="text-gold-400 group-hover:rotate-12 transition-transform duration-500">
                  <GildedWheatIcon />
                </span>
                <span className="font-serif font-bold tracking-[0.15em] text-gold-100">
                  Заказать углеводы
                </span>
              </div>
            </a>
          </div>
        </div>
      </motion.div>
    </CommandPanel>
  );
}
