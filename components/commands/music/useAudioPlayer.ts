"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const ERROR_MESSAGE = "Демка загружается на сервер...";

export function useAudioPlayer(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.preload = "metadata";

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

    const handleDurationChange = () => {
      if (Number.isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const handleCanPlay = () => {
      setIsReady(true);
      setError(null);
      handleDurationChange();
    };

    const handleError = () => {
      setError(ERROR_MESSAGE);
      setIsReady(false);
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("loadedmetadata", handleDurationChange);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);

    audio.load();

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("loadedmetadata", handleDurationChange);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.src = "";
      audioRef.current = null;
    };
  }, [src]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || error) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      setError(ERROR_MESSAGE);
      setIsPlaying(false);
    }
  }, [error]);

  const seek = useCallback(
    (time: number) => {
      const audio = audioRef.current;
      if (!audio || error) return;

      const clamped = Math.max(0, Math.min(time, duration || audio.duration || 0));
      audio.currentTime = clamped;
      setCurrentTime(clamped);
    },
    [duration, error],
  );

  return {
    isPlaying,
    currentTime,
    duration,
    error,
    isReady,
    togglePlay,
    seek,
  };
}

export function formatAudioTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}
