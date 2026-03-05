"use client";
import React, { useEffect, useRef, useState } from "react";

type Position = { x: number; y: number };

const tileCount = 20;

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const directionRef = useRef<Position>({ x: 0, y: 0 });
  const foodRef = useRef<Position>({ x: 5, y: 5 });

  const eatSound = useRef<HTMLAudioElement | null>(null);

  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Dynamic tile size (responsive)
  const getTileSize = () => {
    if (typeof window === "undefined") return 20;
    const size = Math.min(window.innerWidth - 40, 500);
    return size / tileCount;
  };

  const tileSize = getTileSize();

  useEffect(() => {
    const saved = localStorage.getItem("snakeHighScore");
    if (saved) setHighScore(Number(saved));
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("snakeHighScore", score.toString());
    }
  }, [score]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current.y !== 1)
            directionRef.current = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (directionRef.current.y !== -1)
            directionRef.current = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (directionRef.current.x !== 1)
            directionRef.current = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (directionRef.current.x !== -1)
            directionRef.current = { x: 1, y: 0 };
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const generateFood = (snakeBody: Position[]) => {
    let newFood: { x: number; y: number; };
    do {
      newFood = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
      };
    } while (
      snakeBody.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y,
      )
    );
    return newFood;
  };

  const updateGame = () => {
    if (gameOver) return;

    const dir = directionRef.current;
    if (dir.x === 0 && dir.y === 0) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: head.x + dir.x,
        y: head.y + dir.y,
      };

      if (
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= tileCount ||
        newHead.y >= tileCount
      ) {
        setGameOver(true);
        return prevSnake;
      }

      if (
        prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y,
        )
      ) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];
      const currentFood = foodRef.current;

      if (newHead.x === currentFood.x && newHead.y === currentFood.y) {
        eatSound.current?.play();
        setScore((prev) => prev + 1);

        const newFood = generateFood(newSnake);
        setFood(newFood);
        foodRef.current = newFood;

        return newSnake;
      }

      newSnake.pop();
      return newSnake;
    });
  };

  useEffect(() => {
    const interval = setInterval(updateGame, 120);
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = tileSize * tileCount;
    canvas.height = tileSize * tileCount;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    snake.forEach((segment) => {
      ctx.fillStyle = "#22d3ee";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#22d3ee";
      ctx.fillRect(
        segment.x * tileSize,
        segment.y * tileSize,
        tileSize,
        tileSize,
      );
    });

    ctx.fillStyle = "#f472b6";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#f472b6";
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

    ctx.shadowBlur = 0;
  }, [snake, food, tileSize]);

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setScore(0);
    setGameOver(false);
    directionRef.current = { x: 0, y: 0 };
    const newFood = generateFood([{ x: 10, y: 10 }]);
    setFood(newFood);
    foodRef.current = newFood;
  };

  const move = (dir: Position) => {
    if (
      dir.x !== -directionRef.current.x ||
      dir.y !== -directionRef.current.y
    ) {
      directionRef.current = dir;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black text-white p-4">
      <audio
        ref={eatSound}
        src="/sounds/eat.mp3"
      />

      <h1 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-4 drop-shadow-[0_0_20px_#22d3ee]">
        🐍 Neon Snake
      </h1>

      <div className="flex gap-6 mb-4 text-lg md:text-xl">
        <span className="text-cyan-300">Score: {score}</span>
        <span className="text-pink-400">High: {highScore}</span>
      </div>

      <canvas
        ref={canvasRef}
        className="rounded-2xl border-4 border-cyan-400 shadow-[0_0_40px_#22d3ee]"
      />

      {gameOver && (
        <div className="text-red-500 mt-4 text-2xl animate-pulse">
          Game Over
        </div>
      )}

      <button
        onClick={restartGame}
        className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 active:scale-95 transition transform shadow-[0_0_25px_#f472b6]"
      >
        Restart Game
      </button>

      {/* Modern Mobile Controls */}
      <div className="mt-8 grid grid-cols-3 gap-4 w-56 md:hidden">
        <div></div>
        <ControlButton onClick={() => move({ x: 0, y: -1 })}>↑</ControlButton>
        <div></div>

        <ControlButton onClick={() => move({ x: -1, y: 0 })}>←</ControlButton>
        <div></div>
        <ControlButton onClick={() => move({ x: 1, y: 0 })}>→</ControlButton>

        <div></div>
        <ControlButton onClick={() => move({ x: 0, y: 1 })}>↓</ControlButton>
        <div></div>
      </div>
    </div>
  );
}

function ControlButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-cyan-500/20 backdrop-blur-lg border border-cyan-400 text-cyan-300 text-2xl py-4 rounded-xl shadow-[0_0_20px_#22d3ee] hover:scale-110 active:scale-95 transition"
    >
      {children}
    </button>
  );
}
