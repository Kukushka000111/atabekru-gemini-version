"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import CommandPanel from "@/components/commands/CommandPanel";
import { useSnakeGame } from "@/components/commands/snake/useSnakeGame";
import { CANVAS_SIZE } from "@/components/commands/snake/snakeLogic";

export default function GamesContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const restartRef = useRef<HTMLButtonElement>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
    requestAnimationFrame(() => restartRef.current?.focus());
  }, []);

  const { canvasRef, resetGame, queueDirection, stopLoop, score } = useSnakeGame({
    onGameOver: handleGameOver,
  });

  const handleRestart = useCallback(() => {
    setIsGameOver(false);
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    containerRef.current?.focus();
    const input = document.querySelector<HTMLInputElement>(
      'input[placeholder*="команду"]',
    );
    input?.blur();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
        const map = {
          ArrowUp: "UP",
          ArrowDown: "DOWN",
          ArrowLeft: "LEFT",
          ArrowRight: "RIGHT",
        } as const;
        queueDirection(map[event.key as keyof typeof map]);
        return;
      }

      if (isGameOver && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        handleRestart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      stopLoop();
    };
  }, [queueDirection, isGameOver, handleRestart, stopLoop]);

  return (
    <CommandPanel>
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative mx-auto w-fit outline-none"
      >
        {/* Game Headers */}
        <div className="mb-4 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-500/50">
              Раздел IV • Интерактив
            </p>
            <h3 className="font-serif text-sm font-bold tracking-wider text-gold-400">
              ИГРА ЗМЕЙКА
            </h3>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
              Собрано очков
            </p>
            <p className="font-serif text-base font-bold text-red-500 shadow-sm">
              ◆ {score}
            </p>
          </div>
        </div>

        {/* Canvas Display Wrapper */}
        <div className="relative border border-gold-500/10 p-1.5 bg-[#0b0a0f] rounded-sm">
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="rounded-sm bg-[#060608]"
            aria-label="Игровое поле Нить Ариадны"
          />

          <AnimatePresence>
            {isGameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center rounded-sm bg-black/85 backdrop-blur-sm"
              >
                <div className="space-y-5 px-6 text-center">
                  <p className="font-serif text-lg leading-relaxed text-gold-400 font-bold">
                    Игра окончена
                    <br />
                    <span className="text-xs font-serif italic text-white/60 font-normal">
                      Попробуйте снова
                    </span>
                  </p>
                  
                  <button
                    ref={restartRef}
                    type="button"
                    data-cursor-hover
                    onClick={handleRestart}
                    className="rounded-sm border border-gold-500/30 bg-gold-500/10 px-5 py-2 text-xs font-serif text-gold-300 tracking-widest uppercase transition-all duration-300 hover:border-gold-500 hover:bg-gold-500/20"
                  >
                    Начать заново
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* On-screen controls for mobile/touch devices */}
        <div className="mt-6 flex flex-col items-center gap-2 md:hidden">
          <p className="font-serif text-[9px] uppercase tracking-wider text-gold-500/40 mb-1">
            Сенсорный компас
          </p>
          
          {/* Up Button */}
          <button
            type="button"
            onClick={() => queueDirection("UP")}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/20 bg-gold-500/[0.02] text-gold-400 active:bg-gold-500/10 active:border-gold-500/60 active:scale-95 transition-all duration-200"
            aria-label="Вверх"
          >
            <span className="text-sm font-bold">▲</span>
          </button>
          
          {/* Left / Right Buttons */}
          <div className="flex gap-10">
            <button
              type="button"
              onClick={() => queueDirection("LEFT")}
              className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/20 bg-gold-500/[0.02] text-gold-400 active:bg-gold-500/10 active:border-gold-500/60 active:scale-95 transition-all duration-200"
              aria-label="Влево"
            >
              <span className="text-sm font-bold">◀</span>
            </button>
            
            {/* Elegant central medallion decorative space */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/10 bg-[#060608] select-none text-[10px] text-gold-500/30 font-serif italic">
              ✦
            </div>

            <button
              type="button"
              onClick={() => queueDirection("RIGHT")}
              className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/20 bg-gold-500/[0.02] text-gold-400 active:bg-gold-500/10 active:border-gold-500/60 active:scale-95 transition-all duration-200"
              aria-label="Вправо"
            >
              <span className="text-sm font-bold">▶</span>
            </button>
          </div>
          
          {/* Down Button */}
          <button
            type="button"
            onClick={() => queueDirection("DOWN")}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/20 bg-gold-500/[0.02] text-gold-400 active:bg-gold-500/10 active:border-gold-500/60 active:scale-95 transition-all duration-200"
            aria-label="Вниз"
          >
            <span className="text-sm font-bold">▼</span>
          </button>
        </div>

        {/* Controls label */}
        <p className="mt-4 text-center font-serif text-[10px] text-gold-300/30 uppercase tracking-[0.2em]">
          ▲ ▼ ◀ ▶ — управление змейкой
        </p>
      </div>
    </CommandPanel>
  );
}
