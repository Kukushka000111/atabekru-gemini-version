"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CommandPanel from "@/components/commands/CommandPanel";

export default function LastPhotoContent() {
  return (
    <CommandPanel>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center p-4 sm:p-6"
      >
        <p className="mb-4 text-[10px] font-serif uppercase tracking-[0.25em] text-gold-500/50">
          Exhibit V — Снимок дня
        </p>

        {/* Polaroid frame styled in antique marble and gold */}
        <div className="relative border border-gold-500/20 bg-[#0f0f13] p-4 pb-8 shadow-[0_15px_35px_rgba(212,175,55,0.06)] rounded-sm max-w-sm w-full">
          {/* Gilded Inner frame */}
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-gold-500/10 rounded-sm">
            <Image
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800"
              alt="Renaissance Art Exhibit"
              fill
              className="object-cover brightness-[0.75] contrast-[1.1] sepia-[0.1] transition-all duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
              sizes="(max-w-sm) 100vw, 400px"
            />
            {/* Ambient golden dust overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gold-500/10 via-transparent to-transparent mix-blend-color-burn" />
          </div>

          {/* Caption in golden italic calligraphy */}
          <div className="mt-5 text-center">
            <p className="font-serif italic text-gold-400 text-sm tracking-wide">
              «Золотое сечение вдохновения»
            </p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-white/30">
              Кострома • Июль 2026
            </p>
          </div>
        </div>

        <p className="mt-5 text-center font-serif text-xs text-gold-300/45 leading-relaxed max-w-xs">
          Светотень Караваджо запечатлена в цифровом слепке нашей эпохи. Экспонат обновляется с восходом солнца.
        </p>
      </motion.div>
    </CommandPanel>
  );
}
