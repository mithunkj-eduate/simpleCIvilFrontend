"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

const SIZE = 5;
const MAX = 12;

type Node = { x: number; y: number; value: number };

function generatePuzzle(seed?: number) {
  const grid = Array(SIZE)
    .fill(0)
    .map(() => Array(SIZE).fill(0));

  let placed = 1;

  const rand = () => (seed ? Math.abs(Math.sin(seed++)) % 1 : Math.random());

  while (placed <= MAX) {
    const x = Math.floor(rand() * SIZE);
    const y = Math.floor(rand() * SIZE);

    if (grid[y][x] === 0) {
      grid[y][x] = placed;
      placed++;
    }
  }

  return grid;
}

export default function ZipProGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [grid, setGrid] = useState(generatePuzzle());
  const [path, setPath] = useState<Node[]>([]);
  const [dragging, setDragging] = useState(false);
  const [time, setTime] = useState(0);
  const [win, setWin] = useState(false);

  const [boardSize, setBoardSize] = useState(400);

  // sound start
  const eatSound = useRef<HTMLAudioElement>(null);
  const winSound = useRef<HTMLAudioElement>(null);

  const [muted, setMuted] = useState(false);

  const playEatSound = () => {
    if (!muted && eatSound.current) {
      eatSound.current.currentTime = 0;
      eatSound.current.volume = 0.4;
      eatSound.current.play();
    }
  };

  const playWinSound = () => {
    if (!muted && winSound.current) {
      winSound.current.currentTime = 0;
      winSound.current.volume = 0.7;
      winSound.current.play();
    }
  };

  if (win) {
    playWinSound();
  }
  // sond closed

  const CELL = boardSize / SIZE;

  /* responsive board */
  useEffect(() => {
    const resize = () => {
      const size = Math.min(window.innerWidth - 40, 450);
      setBoardSize(size);
    };

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  /* timer */
  useEffect(() => {
    if (win) return;

    const t = setInterval(() => setTime((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [win]);

  /* draw line */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, boardSize, boardSize);

    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";

    ctx.beginPath();

    path.forEach((p, i) => {
      const x = p.x * CELL + CELL / 2;
      const y = p.y * CELL + CELL / 2;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();
  }, [path, boardSize]);

  const tryAdd = (x: number, y: number) => {
    const value = grid[y][x];
    if (!value) return;

    const next = path.length === 0 ? 1 : path[path.length - 1].value + 1;

    if (value === next) {
      playEatSound();

      setPath((p) => {
        if (p.find((n) => n.value === value)) return p;
        return [...p, { x, y, value }];
      });

      if (value === MAX) {
        setWin(true);

        confetti({
          particleCount: 500,
          spread: 60,
        });
      }
    }
  };

  const startDrag = (x: number, y: number) => {
    setDragging(true);
    tryAdd(x, y);
  };

  const moveDrag = (x: number, y: number) => {
    if (!dragging) return;
    tryAdd(x, y);
  };

  const endDrag = () => {
    setDragging(false);
  };

  const reset = () => {
    setGrid(generatePuzzle());
    setPath([]);
    setTime(0);
    setWin(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 text-white px-4">
      <h1 className="text-2xl md:text-3xl font-bold">ZIP Puzzle</h1>

      {/* sound */}
      <audio ref={eatSound} src="/sounds/clicksound.mp3" />
      <audio ref={winSound} src="/sounds/win.mp3" />
      {/* sound close */}

      <div className="flex gap-6 text-sm md:text-base">
        <div>⏱ {time}s</div>
        {win && <div className="text-green-400">Solved 🎉</div>}
      </div>

      {/* Board */}
      <div
        className="relative select-none"
        style={{ width: boardSize, height: boardSize }}
      >
        {/* Grid */}
        <div
          className="grid absolute"
          style={{
            gridTemplateColumns: `repeat(${SIZE},1fr)`,
            width: boardSize,
            height: boardSize,
          }}
        >
          {grid.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className="border border-gray-700 flex items-center justify-center font-bold bg-gray-900 text-lg md:text-xl"
                onPointerDown={() => startDrag(x, y)}
                onPointerEnter={() => moveDrag(x, y)}
                onPointerUp={endDrag}
              >
                {cell || ""}
              </div>
            )),
          )}
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={boardSize}
          height={boardSize}
          className="absolute top-0 left-0 pointer-events-none"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setMuted(!muted)}
          className="px-4 py-2 bg-gray-700 rounded"
        >
          {muted ? "🔇" : "🔊"}
        </button>

        <button
          onClick={reset}
          className="px-6 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          New Puzzle
        </button>
      </div>
    </div>
  );
}
