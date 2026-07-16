"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import CommandPanel from "@/components/commands/CommandPanel";

function VignetteOrnament() {
  return (
    <svg
      viewBox="0 0 100 24"
      fill="none"
      stroke="currentColor"
      className="mx-auto h-8 w-auto text-gold-500/80 mb-4"
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

const SKILL_CATEGORIES = [
  {
    title: "Веб-технологии",
    skills: [
      { name: "React / Next.js 15", level: "90%" },
      { name: "TypeScript / JS", level: "85%" },
      { name: "Tailwind CSS", level: "95%" },
      { name: "Node.js / Express", level: "75%" },
    ],
  },
  {
    title: "Музыкальный Продакшн",
    skills: [
      { name: "FL Studio", level: "90%" },
      { name: "Сведение & Мастеринг", level: "80%" },
      { name: "Саунд-дизайн", level: "85%" },
      { name: "Аранжировка", level: "85%" },
    ],
  },
  {
    title: "Ремесло & Хобби",
    skills: [
      { name: "Закваски & Хлеб", level: "95%" },
      { name: "Холодное брожение", level: "90%" },
      { name: "Классические багеты", level: "85%" },
      { name: "Эпические стратегии", level: "80%" },
    ],
  },
];

const TIMELINE_EVENTS = [
  {
    period: "2024 — Настоящее",
    title: "Веб-инженерия & Творчество",
    description: "Разработка современных веб-приложений на Next.js и React. Интеграция интерактивных интерфейсов с высокой производительностью и адаптивностью.",
  },
  {
    period: "2023 — Настоящее",
    title: "Музыкальный саунд-дизайн",
    description: "Написание битов, аранжировок и сведение треков в FL Studio. Эксперименты с атмосферным Lo-Fi и современными урбан-жанрами.",
  },
  {
    period: "2022 — Настоящее",
    title: "Ремесленная пекарня",
    description: "Освоение искусства выпечки классического хлеба на натуральной закваске длительного созревания. Хобби, переросшее в мастерство.",
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
  const [activeTab, setActiveTab] = useState<"bio" | "skills" | "timeline">("bio");

  return (
    <CommandPanel>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center space-y-6 max-w-2xl mx-auto py-2"
      >
        {/* Golden Vignette Ornament */}
        <motion.div variants={itemVariants}>
          <VignetteOrnament />
        </motion.div>

        {/* Header */}
        <motion.div variants={itemVariants} className="space-y-1.5">
          <p className="text-[9px] font-mono tracking-[0.3em] text-gold-500/50 uppercase">
            Раздел I • Личный Профиль
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-gold-400 uppercase">
            АТАБЕК
          </h2>
          <div className="mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
        </motion.div>

        {/* Sub-Navigation Tabs */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center border-b border-gold-500/10 max-w-md mx-auto"
        >
          {(["bio", "skills", "timeline"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="relative px-4 py-2 font-serif text-[11px] sm:text-xs uppercase tracking-widest transition-colors duration-300"
            >
              <span className={activeTab === tab ? "text-gold-400 font-bold" : "text-white/40 hover:text-white/80"}>
                {tab === "bio" ? "О себе" : tab === "skills" ? "Навыки" : "Хроника"}
              </span>
              {activeTab === tab && (
                <motion.div
                  layoutId="aboutActiveLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Tab Content Area with AnimatePresence */}
        <div className="min-h-[220px] pt-2">
          <AnimatePresence mode="wait">
            {activeTab === "bio" && (
              <motion.div
                key="bio"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="font-serif italic text-white/80 text-sm sm:text-base leading-loose max-w-md mx-auto">
                  «Привет! Я Атабек. Занимаюсь веб-разработкой, созданием музыки и кулинарным творчеством. Стремлюсь писать чистый, производительный код и создавать качественные проекты, которые звучат и работают превосходно».
                </p>

                {/* Grid details */}
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                  {FACTS.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-center justify-center gap-2.5 rounded-sm border border-gold-500/10 bg-gold-500/[0.01] px-4 py-3 text-xs text-gold-300/80 transition-all duration-300 hover:border-gold-500/30 hover:bg-gold-500/[0.04]"
                    >
                      <span className="text-gold-500/60">{fact.icon}</span>
                      <span className="font-serif tracking-widest uppercase text-[10px]">{fact.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "skills" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-2xl mx-auto"
              >
                {SKILL_CATEGORIES.map((category) => (
                  <div
                    key={category.title}
                    className="border border-gold-500/10 bg-gold-500/[0.01] p-4 rounded-sm space-y-3 hover:border-gold-500/20 transition-all"
                  >
                    <h3 className="font-serif text-[11px] font-bold text-gold-400 uppercase tracking-wider border-b border-gold-500/15 pb-1">
                      {category.title}
                    </h3>
                    <div className="space-y-2.5">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between text-[10px] font-mono tracking-wide text-white/70">
                            <span>{skill.name}</span>
                            <span className="text-gold-500/70">{skill.level}</span>
                          </div>
                          {/* Elegant minimal progress bar */}
                          <div className="h-[2px] w-full bg-gold-500/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: skill.level }}
                              transition={{ duration: 0.8, delay: 0.1 }}
                              className="h-full bg-gold-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "timeline" && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 max-w-lg mx-auto text-left relative pl-4 sm:pl-6 border-l border-gold-500/20 py-2"
              >
                {TIMELINE_EVENTS.map((event) => (
                  <div key={event.title} className="relative pb-6 last:pb-2">
                    {/* Glowing gold dot */}
                    <div className="absolute -left-[21px] sm:-left-[29px] top-1 h-2 w-2 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                    
                    <span className="font-mono text-[9px] tracking-wider text-gold-500 uppercase block mb-0.5">
                      {event.period}
                    </span>
                    <h3 className="font-serif text-xs font-bold text-white uppercase tracking-wider mb-1">
                      {event.title}
                    </h3>
                    <p className="font-serif text-xs leading-relaxed text-white/60">
                      {event.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </CommandPanel>
  );
}
