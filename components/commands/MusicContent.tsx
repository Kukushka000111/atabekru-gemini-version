"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CommandPanel from "@/components/commands/CommandPanel";
import AudioVisualizer from "@/components/commands/music/AudioVisualizer";
import ProgressBar from "@/components/commands/music/ProgressBar";
import {
  formatAudioTime,
  useAudioPlayer,
} from "@/components/commands/music/useAudioPlayer";

interface Track {
  id: string;
  title: string;
  genre: string;
  src: string;
  description: string;
}

const PLAYLIST: Track[] = [
  {
    id: "track1",
    title: "Untitled Demo (Rough Mix)",
    genre: "Atmospheric Trap / Lo-Fi",
    src: "/audio/demo.mp3",
    description: "Экспериментальный набросок с густым басом, атмосферными текстурами и винтажным сэмплом клавишных.",
  },
  {
    id: "track2",
    title: "Lofi Autumn Sketch",
    genre: "Chillhop / Jazzhop",
    src: "/audio/demo.mp3", // Использование того же файла для стабильности без сети
    description: "Мягкий расслабляющий ритм, созданный под вдохновением от дождливых вечеров в Костроме. Отлично для кодинга.",
  },
  {
    id: "track3",
    title: "Cosmic Night Drive",
    genre: "Synthwave / Retrowave",
    src: "/audio/demo.mp3", // Использование того же файла для стабильности без сети
    description: "Ретро-футуристический трек с яркими аналоговыми синтезаторами и динамичной драм-партией.",
  },
];

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M8 5.14v14.72a1 1 0 001.5.86l11.01-7.36a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M6 18l8.5-6L6 6v12zM16 6h2v12h-2V6z" />
    </svg>
  );
}

export default function MusicContent() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentTrack = PLAYLIST[currentTrackIndex];

  const { isPlaying, currentTime, duration, error, isReady, togglePlay, seek } =
    useAudioPlayer(currentTrack.src);

  const isDisabled = !!error || !isReady;

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const handleSelectTrack = (index: number) => {
    if (index === currentTrackIndex) {
      togglePlay();
    } else {
      setCurrentTrackIndex(index);
    }
  };

  return (
    <CommandPanel>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6 max-w-2xl mx-auto"
      >
        {/* Track Metadata Plaque */}
        <div className="text-center space-y-1">
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-gold-500/50">
            Раздел II • Музыкальный проигрыватель
          </p>
          <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wider text-gold-400">
            {currentTrack.title}
          </h2>
          <p className="font-serif italic text-xs text-gold-300/60">
            {currentTrack.genre} • Свиток созвучий
          </p>
        </div>

        {error ? (
          <div className="rounded-sm border border-gold-500/10 bg-[#0f0f13] px-4 py-8 text-center">
            <p className="text-sm font-serif italic text-gold-500/60">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 border border-gold-500/20 bg-[#0c0c10] p-4 sm:p-5 rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
            {/* Left side: Visualizer & Player Controls */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              {/* Concentric Circle Visualizer */}
              <div className="py-2">
                <AudioVisualizer isPlaying={isPlaying} />
              </div>

              {/* Progress Bar and Timestamps */}
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

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-6 pt-1">
                {/* Prev Button */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/20 bg-gold-500/[0.02] text-gold-500 transition-all hover:border-gold-500/55 hover:text-gold-300 active:scale-95"
                  aria-label="Предыдущий трек"
                >
                  <PrevIcon />
                </button>

                {/* Main Play/Pause */}
                <button
                  type="button"
                  data-cursor-hover
                  onClick={togglePlay}
                  disabled={isDisabled}
                  className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold-500 bg-gold-500/10 text-gold-400 transition-all duration-300 hover:border-gold-300 hover:bg-gold-500/25 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] disabled:opacity-40"
                  aria-label={isPlaying ? "Пауза" : "Воспроизведение"}
                >
                  <div className="pointer-events-none absolute inset-[-3px] rounded-full border border-gold-500/20 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
                  <span className="relative z-10">
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </span>
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/20 bg-gold-500/[0.02] text-gold-500 transition-all hover:border-gold-500/55 hover:text-gold-300 active:scale-95"
                  aria-label="Следующий трек"
                >
                  <NextIcon />
                </button>
              </div>

              {/* Description */}
              <p className="font-serif italic text-[11px] text-white/50 text-center leading-relaxed max-w-sm mx-auto">
                {currentTrack.description}
              </p>
            </div>

            {/* Right side: Playlist */}
            <div className="md:col-span-5 flex flex-col border-t md:border-t-0 md:border-l border-gold-500/15 pt-4 md:pt-0 md:pl-4 space-y-2.5">
              <h3 className="font-serif text-[10px] tracking-widest text-gold-500/60 uppercase font-bold text-center md:text-left">
                Список треков
              </h3>
              
              <div className="space-y-2 overflow-y-auto max-h-[220px] pr-1">
                {PLAYLIST.map((track, idx) => {
                  const isActive = idx === currentTrackIndex;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => handleSelectTrack(idx)}
                      className={`w-full text-left p-2.5 rounded-sm border transition-all duration-300 flex items-center gap-3 ${
                        isActive
                          ? "border-gold-500/40 bg-gold-500/10 text-gold-300"
                          : "border-gold-500/10 bg-transparent text-white/50 hover:border-gold-500/25 hover:text-white/80"
                      }`}
                    >
                      {/* Status dot or play icon */}
                      <div className="shrink-0">
                        {isActive && isPlaying ? (
                          <div className="flex items-end gap-[2px] h-3 w-3">
                            <span className="h-2 w-[2px] bg-gold-400 animate-[bounce_1s_infinite_100ms]" />
                            <span className="h-3 w-[2px] bg-gold-400 animate-[bounce_1s_infinite_300ms]" />
                            <span className="h-1.5 w-[2px] bg-gold-400 animate-[bounce_1s_infinite_500ms]" />
                          </div>
                        ) : (
                          <div className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-gold-400" : "bg-white/20"}`} />
                        )}
                      </div>

                      {/* Title and Genre */}
                      <div className="min-w-0 flex-1">
                        <p className={`font-serif text-xs truncate font-medium ${isActive ? "text-gold-300" : "text-white/80"}`}>
                          {track.title}
                        </p>
                        <p className="font-mono text-[8px] uppercase tracking-wider text-white/30 truncate mt-0.5">
                          {track.genre}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </CommandPanel>
  );
}
