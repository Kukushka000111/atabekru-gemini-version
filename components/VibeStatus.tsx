"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { VIBES } from "@/lib/vibes";

// Classical Gilded Angel/Statue Icon
function AngelStatueIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6 text-gold-500 transition-transform duration-500 group-hover:scale-110"
    >
      {/* Gilded wings of statue/angel */}
      <path
        d="M6 7c-2 0-3 2-3 4s3 5 5 2M18 7c2 0 3 2 3 4s-3 5-5 2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Neoclassical Column Pedestal */}
      <path
        d="M8 21h8M9 21v-4h6v4M10 17v-8h4v8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Statue head / Halo */}
      <circle cx="12" cy="5.5" r="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VibeStatus() {
  const [index, setIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(true);
  const vibe = VIBES[index];

  const cycleVibe = () => {
    setIndex((prev) => (prev + 1) % VIBES.length);
    // Make sure popup flashes/animates when changing state
    setShowPopup(false);
    setTimeout(() => setShowPopup(true), 50);
  };

  // Close popup after some idle time or keep it persistent? Let's keep it persistent, but cycle on click!
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      
      {/* Scroll-Cloud Popup above the Statue */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none relative max-w-[280px] rounded-sm border border-gold-500/20 bg-[#0d0d12]/95 px-4 py-3 shadow-[0_10px_30px_rgba(212,175,55,0.06)] backdrop-blur-md"
          >
            {/* Gilded subtle frame corners */}
            <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-gold-500/40" />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-gold-500/40" />
            <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-gold-500/40" />
            <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-gold-500/40" />

            <div className="space-y-1 text-right sm:text-left">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold-500/50 block">
                Статус • {vibe.label}
              </span>
              <p className="font-serif italic text-xs leading-relaxed text-gold-300">
                «{vibe.text}»
              </p>
            </div>
            
            {/* Elegant miniature decorative pointer downwards */}
            <div className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 border-r border-b border-gold-500/20 bg-[#0d0d12]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Gilded Angel/Statue Button */}
      <motion.button
        type="button"
        data-cursor-hover
        onClick={cycleVibe}
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/25 bg-[#050507]/90 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:border-gold-500/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
        aria-label="Сменить священный статус"
      >
        <AngelStatueIcon />
      </motion.button>
    </div>
  );
}
