"use client";

import { motion } from "framer-motion";
import CommandPanel from "@/components/commands/CommandPanel";
import AudioVisualizer from "@/components/commands/music/AudioVisualizer";
import ProgressBar from "@/components/commands/music/ProgressBar";
import {
  formatAudioTime,
  useAudioPlayer,
} from "@/components/commands/music/useAudioPlayer";

const AUDIO_SRC = "/audio/demo.mp3";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M8 5.14v14.72a1 1 0 001.5.86l11.01-7.36a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}

export default function MusicContent() {
  const { isPlaying, currentTime, duration, error, isReady, togglePlay, seek } =
    useAudioPlayer(AUDIO_SRC);

  const isDisabled = !!error || !isReady;

  return (
    <CommandPanel>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Track Metadata - Neoclassical Plaque style */}
        <div className="text-center space-y-1">
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-gold-500/50">
            Exhibit II • Sacred Audio Plate
          </p>
          <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wider text-gold-400">
            Atabek — Untitled Demo (Rough Mix)
          </h2>
          <p className="font-serif italic text-xs text-gold-300/60">
            Atmospheric Trap / Lo-Fi • Свиток созвучий
          </p>
        </div>

        {error ? (
          <div className="rounded-sm border border-gold-500/10 bg-[#0f0f13] px-4 py-8 text-center">
            <p className="text-sm font-serif italic text-gold-500/60">{error}</p>
          </div>
        ) : (
          <div className="border border-gold-500/20 bg-[#0c0c10] p-5 sm:p-6 rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.6)] space-y-6">
            {/* Concentric Circle Visualizer */}
            <AudioVisualizer isPlaying={isPlaying} />

            {/* Seek Bar and Timestamps */}
            <div className="space-y-2">
              <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSeek={seek}
                disabled={isDisabled}
              />
              <div className="flex justify-between font-mono text-[10px] text-gold-300/40 uppercase tracking-widest">
                <span>{formatAudioTime(currentTime)}</span>
                <span>{formatAudioTime(duration)}</span>
              </div>
            </div>

            {/* Circular Gilded Playback Plate Button */}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                data-cursor-hover
                onClick={togglePlay}
                disabled={isDisabled}
                className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold-500 bg-gold-500/10 text-gold-400 transition-all duration-300 hover:border-gold-300 hover:bg-gold-500/25 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] disabled:opacity-40"
                aria-label={isPlaying ? "Пауза" : "Воспроизведение"}
              >
                {/* Ancient ring pattern highlight on hover */}
                <div className="pointer-events-none absolute inset-[-3px] rounded-full border border-gold-500/20 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
                
                <span className="relative z-10 transition-transform group-hover:scale-105">
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </CommandPanel>
  );
}
