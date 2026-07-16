"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CANVAS_SIZE,
  CELL_SIZE,
  GRID_SIZE,
  TICK_MS,
  type Direction,
  type GameState,
  createInitialState,
  stepGame,
} from "@/components/commands/snake/snakeLogic";

function drawGame(ctx: CanvasRenderingContext2D, state: GameState) {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // Draw Glazed Mosaic Tile Grid (Terracotta & Dark Marble tiles)
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      // Alternate tile colors to simulate checkerboard mosaic pavement
      const isAlt = (x + y) % 2 === 0;
      ctx.fillStyle = isAlt ? "#131317" : "#0e0e11";
      ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

      // Render fine tile grout borders
      ctx.strokeStyle = "rgba(212, 175, 55, 0.08)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }

  // Draw Glistening Ruby Food (Экспонат Рубин)
  ctx.save();
  const rx = state.food.x * CELL_SIZE + CELL_SIZE / 2;
  const ry = state.food.y * CELL_SIZE + CELL_SIZE / 2;
  const rSize = CELL_SIZE / 2 - 1.5;

  ctx.shadowColor = "rgba(239, 68, 68, 0.95)";
  ctx.shadowBlur = 12;
  ctx.fillStyle = "#ef4444";
  
  // Draw diamond-cut shape for the ruby
  ctx.beginPath();
  ctx.moveTo(rx, ry - rSize); // Top
  ctx.lineTo(rx + rSize, ry); // Right
  ctx.lineTo(rx, ry + rSize); // Bottom
  ctx.lineTo(rx - rSize, ry); // Left
  ctx.closePath();
  ctx.fill();

  // Draw gem reflections
  ctx.strokeStyle = "#fecaca";
  ctx.lineWidth = 0.75;
  ctx.stroke();
  ctx.restore();

  // Draw Ariadne's Golden Thread (Змейка)
  state.snake.forEach((segment, index) => {
    ctx.save();
    const isHead = index === 0;
    const padding = isHead ? 1.5 : 2.5;
    
    // Glowing golden thread style
    ctx.shadowColor = "rgba(212, 175, 55, 0.85)";
    ctx.shadowBlur = isHead ? 14 : 8;
    ctx.fillStyle = isHead ? "#f3e5ab" : "#d4af37";

    // Draw segment as elegant circular bead/mosaic stone
    const cx = segment.x * CELL_SIZE + CELL_SIZE / 2;
    const cy = segment.y * CELL_SIZE + CELL_SIZE / 2;
    const radius = CELL_SIZE / 2 - padding;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    // Golden core outline
    ctx.strokeStyle = "rgba(170, 130, 10, 0.6)";
    ctx.lineWidth = 0.5;
    ctx.stroke();

    ctx.restore();
  });

  // Gilded Gilded Frame Border
  ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(1, 1, CANVAS_SIZE - 2, CANVAS_SIZE - 2);
}

interface UseSnakeGameOptions {
  onGameOver?: () => void;
}

export function useSnakeGame({ onGameOver }: UseSnakeGameOptions = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(createInitialState());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [score, setScore] = useState(0);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawGame(ctx, stateRef.current);
  }, []);

  const stopLoop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startLoop = useCallback(() => {
    stopLoop();
    intervalRef.current = setInterval(() => {
      const prev = stateRef.current;
      const next = stepGame(prev);
      stateRef.current = next;
      setScore(next.score);
      render();

      if (next.isGameOver && !prev.isGameOver) {
        stopLoop();
        onGameOver?.();
      }
    }, TICK_MS);
  }, [onGameOver, render, stopLoop]);

  const resetGame = useCallback(() => {
    stateRef.current = createInitialState();
    setScore(0);
    render();
    startLoop();
  }, [render, startLoop]);

  const queueDirection = useCallback((direction: Direction) => {
    if (stateRef.current.isGameOver) return;

    const active = stateRef.current.nextDirection;
    const opposite =
      (direction === "UP" && active === "DOWN") ||
      (direction === "DOWN" && active === "UP") ||
      (direction === "LEFT" && active === "RIGHT") ||
      (direction === "RIGHT" && active === "LEFT");

    if (!opposite && direction !== active) {
      stateRef.current = { ...stateRef.current, nextDirection: direction };
    }
  }, []);

  useEffect(() => {
    render();
    startLoop();

    const handleVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else if (!stateRef.current.isGameOver) {
        startLoop();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopLoop();
      document.removeEventListener("visibilitychange", handleVisibility);
      stateRef.current = createInitialState();
    };
  }, [render, startLoop, stopLoop]);

  return {
    canvasRef,
    resetGame,
    queueDirection,
    stopLoop,
    score,
    isGameOver: () => stateRef.current.isGameOver,
  };
}
