"use client";

import { motion, Variants } from "framer-motion";
import CommandPanel from "@/components/commands/CommandPanel";

// Neoclassical Golden Vignette / Ornament SVG
function VignetteOrnament() {
  return (
    <svg
      viewBox="0 0 100 24"
      fill="none"
      stroke="currentColor"
      className="mx-auto h-8 w-auto text-gold-500/80 mb-6"
    >
      <path
        d="M10 12 C 25 2, 45 22, 50 12 C 55 22, 75 2, 90 12"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="50" cy="12" r="3" className="fill-gold-500" />
      <path
        d="M20 12 C 35 18, 45 18, 50 12 C 55 18, 65 18, 80 12"
        strokeWidth="0.5"
        strokeDasharray="2 2"
      />
      <path d="M40 12 L45 12 M55 12 L60 12" strokeWidth="1" />
    </svg>
  );
}

const FACTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    label: "20 лет",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6M12 2v20" />
      </svg>
    ),
    label: "Инженер Веба",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    label: "Битмейкер",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Кострома",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutContent() {
  return (
    <CommandPanel>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center space-y-6 max-w-xl mx-auto py-2"
      >
        {/* Golden Vignette Ornament */}
        <motion.div variants={itemVariants}>
          <VignetteOrnament />
        </motion.div>

        {/* Majestic Exhibit Header */}
        <motion.div variants={itemVariants} className="space-y-1.5">
          <p className="text-[9px] font-mono tracking-[0.3em] text-gold-500/50 uppercase">
            Экспонат I • Личный пергамент
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-gold-400 uppercase">
            АТАБЕК. ЭКСПОНАТ I
          </h2>
          <div className="mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        </motion.div>

        {/* Biography text aligned center with elevated line spacing */}
        <motion.p
          variants={itemVariants}
          className="font-serif italic text-white/80 text-sm sm:text-base leading-loose max-w-md mx-auto"
        >
          «Я Бекич. Создал этот храм цифрового созидания. 
          Скромность — мое истинное украшение, а сотворение созвучий и чистого кода — мое вечное призвание».
        </motion.p>

        {/* Classic marble-inspired table details */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto pt-4"
        >
          {FACTS.map((fact) => (
            <div
              key={fact.label}
              className="flex items-center justify-center gap-2.5 rounded-sm border border-gold-500/10 bg-gold-500/[0.01] px-4 py-3 text-xs text-gold-300/80 transition-all duration-300 hover:border-gold-500/30 hover:bg-gold-500/[0.04]"
            >
              <span className="text-gold-500/60">{fact.icon}</span>
              <span className="font-serif tracking-widest uppercase text-[10px]">{fact.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </CommandPanel>
  );
}
