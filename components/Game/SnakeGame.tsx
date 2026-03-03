"use client";
import React, { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type FoodType = "apple" | "banana" | "berry" | "boost";

const TILE_COUNT = 20;
const BASE_SPEED = 140;

const foods = {
  apple: { emoji: "🍎", score: 1 },
  banana: { emoji: "🍌", score: 3 },
  berry: { emoji: "🍇", score: 5 },
  boost: { emoji: "⚡", score: 0 },
};

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const eatSound = useRef<HTMLAudioElement | null>(null);

  const [snake, setSnake] = useState<Point[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
  ]);
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 });
  const [food, setFood] = useState(generateFood());
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(BASE_SPEED);
  const [gameOver, setGameOver] = useState(false);

  function generateFood() {
    const keys = Object.keys(foods) as FoodType[];
    const type = keys[Math.floor(Math.random() * keys.length)];
    return {
      type,
      position: {
        x: Math.floor(Math.random() * TILE_COUNT),
        y: Math.floor(Math.random() * TILE_COUNT),
      },
    };
  }

  // preload sound
  useEffect(() => {
    eatSound.current = new Audio("/sounds/eat.mp3");
  }, []);

  // keyboard control
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && direction.y === 0)
        setDirection({ x: 0, y: -1 });
      if (e.key === "ArrowDown" && direction.y === 0)
        setDirection({ x: 0, y: 1 });
      if (e.key === "ArrowLeft" && direction.x === 0)
        setDirection({ x: -1, y: 0 });
      if (e.key === "ArrowRight" && direction.x === 0)
        setDirection({ x: 1, y: 0 });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  // game loop
  useEffect(() => {
    if (gameOver) return;

    const loop = setInterval(() => {
      setSnake((prev) => {
        const head = {
          x: prev[0].x + direction.x,
          y: prev[0].y + direction.y,
        };

        if (
          head.x < 0 ||
          head.y < 0 ||
          head.x >= TILE_COUNT ||
          head.y >= TILE_COUNT ||
          prev.some((p) => p.x === head.x && p.y === head.y)
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [head, ...prev];

        if (
          head.x === food.position.x &&
          head.y === food.position.y
        ) {
          const f = foods[food.type];
          setScore((s) => s + f.score);

          // 🔊 play sound
          eatSound.current?.play().catch(() => {});

          if (food.type === "boost") {
            setSpeed((s) => Math.max(60, s - 20));
          }

          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(loop);
  }, [direction, food, gameOver, speed]);

  // draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 420;
    const tile = size / TILE_COUNT;
    canvas.width = size;
    canvas.height = size;

    // background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, "#020617");
    gradient.addColorStop(1, "#0f172a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // snake
    snake.forEach((s, i) => {
      const centerX = s.x * tile + tile / 2;
      const centerY = s.y * tile + tile / 2;

      if (i === 0) {
        ctx.font = `${tile * 0.9}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("😄", centerX, centerY);
      } else {
        ctx.fillStyle = "#4ade80";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#22c55e";
        ctx.fillRect(s.x * tile, s.y * tile, tile - 2, tile - 2);
      }
    });

    // food emoji centered
    const f = foods[food.type];
    ctx.font = `${tile * 0.9}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      f.emoji,
      food.position.x * tile + tile / 2,
      food.position.y * tile + tile / 2
    );
  }, [snake, food]);

  const restart = () => {
    setSnake([{ x: 10, y: 10 }, { x: 9, y: 10 }]);
    setScore(0);
    setSpeed(BASE_SPEED);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold text-green-400">
        🐍 Emoji Snake
      </h1>

      <canvas ref={canvasRef} className="rounded-xl border border-gray-700" />

      <div className="text-white text-lg">
        Score: <span className="text-green-400">{score}</span>
      </div>

      {gameOver && (
        <button
          onClick={restart}
          className="px-6 py-2 bg-green-500 text-white rounded-lg"
        >
          Restart
        </button>
      )}

      <p className="text-gray-400 text-sm text-center">
        🍎 +1 | 🍌 +3 | 🍇 +5 | ⚡ speed boost
      </p>
    </div>
  );
}
