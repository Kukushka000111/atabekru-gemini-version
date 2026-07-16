"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  disabled?: boolean;
}

export default function ProgressBar({
  currentTime,
  duration,
  onSeek,
  disabled = false,
}: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const seekFromClientX = useCallback(
    (clientX: number) => {
      const bar = barRef.current;
      if (!bar || disabled || duration <= 0) return;

      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      onSeek(ratio * duration);
    },
    [disabled, duration, onSeek],
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (event: MouseEvent) => {
      seekFromClientX(event.clientX);
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, seekFromClientX]);

  return (
    <div
      ref={barRef}
      data-cursor-hover
      role="slider"
      aria-valuemin={0}
      aria-valuemax={duration}
      aria-valuenow={currentTime}
      aria-label="Прогресс воспроизведения"
      className={`group relative h-1.5 w-full rounded-full bg-white/10 ${disabled ? "opacity-40" : "cursor-pointer"}`}
      onMouseDown={(event) => {
        if (disabled) return;
        setIsDragging(true);
        seekFromClientX(event.clientX);
      }}
    >
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-gold-500/80 transition-[width] duration-75"
        style={{ width: `${progress}%` }}
      />
      <div
        className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-gold-400 opacity-0 shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-opacity group-hover:opacity-100"
        style={{ left: `calc(${progress}% - 6px)` }}
      />
    </div>
  );
}
