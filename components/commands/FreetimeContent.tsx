"use client";

import { motion } from "framer-motion";
import CommandPanel from "@/components/commands/CommandPanel";
import { WEEK_SCHEDULE } from "@/lib/freetime";

const ROMAN_NUMERALS: Record<string, string> = {
  mon: "I",
  tue: "II",
  wed: "III",
  thu: "IV",
  fri: "V",
  sat: "VI",
  sun: "VII",
};

// Custom majestic gold-aligned styles for medieval statuses
const MEDIEVAL_STATUS_STYLES: Record<
  "busy" | "free" | "gaming",
  { dot: string; glow: string; border: string; label: string; text: string }
> = {
  busy: {
    dot: "bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]",
    glow: "hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] hover:border-red-500/30",
    border: "border-red-500/10",
    label: "Занят",
    text: "text-red-300/60",
  },
  free: {
    dot: "bg-gold-500 shadow-[0_0_8px_rgba(212,175,55,0.7)]",
    glow: "hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:border-gold-500/40",
    border: "border-gold-500/15",
    label: "Свободен",
    text: "text-gold-300/70",
  },
  gaming: {
    dot: "bg-purple-500/80 shadow-[0_0_8px_rgba(168,85,247,0.6)]",
    glow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:border-purple-500/30",
    border: "border-purple-500/10",
    label: "Отдых / Игры",
    text: "text-purple-300/60",
  },
};

export default function FreetimeContent() {
  return (
    <CommandPanel>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-6 py-2"
      >
        {/* Astronomical Table Header */}
        <div className="text-center space-y-1">
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-gold-500/50">
            Раздел VII • Расписание
          </p>
          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-gold-400">
            КАЛЕНДАРЬ И ДОСУГ
          </h2>
          <div className="mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-gold-500/35 to-transparent" />
        </div>

        {/* Arch-shaped medieval grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 max-w-5xl mx-auto pt-4">
          {WEEK_SCHEDULE.map((day, index) => {
            const styles = MEDIEVAL_STATUS_STYLES[day.status];
            const roman = ROMAN_NUMERALS[day.id];

            return (
              <motion.div
                key={day.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className={`group flex flex-col items-center justify-between rounded-t-full border border-b-2 border-b-gold-500/10 bg-[#0a0a0d] p-3 pt-6 pb-4 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 ${styles.border} ${styles.glow} ${index === 6 ? "col-span-2 sm:col-span-3 lg:col-span-1" : ""}`}
              >
                {/* Roman Numeral Indicator inside circle */}
                <div className="flex flex-col items-center space-y-1.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-500/25 bg-[#050507] text-[11px] font-serif font-bold text-gold-400 select-none">
                    {roman}
                  </div>
                  <span className="font-serif text-[10px] tracking-widest text-gold-500/50 uppercase select-none">
                    {day.shortName}
                  </span>
                </div>

                {/* Day status badge */}
                <div className="my-4 flex items-center justify-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${styles.dot}`} />
                  <span className={`font-serif text-[8px] uppercase tracking-wider ${styles.text}`}>
                    {styles.label}
                  </span>
                </div>

                {/* Day description message */}
                <div className="space-y-0.5">
                  <p className="font-serif text-[9px] uppercase tracking-widest text-white/20 select-none">
                    {day.name}
                  </p>
                  <p className="font-serif text-[10px] italic leading-relaxed text-white/50 max-w-[110px] mx-auto">
                    {day.message}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </CommandPanel>
  );
}
