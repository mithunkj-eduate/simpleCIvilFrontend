"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

const arrows = ["⬆", "⬇", "⬅", "➡"];

type Pos = { x: number; y: number };

function gridSize(level: number) {
  if (level <= 10) return 4;
  if (level <= 20) return 5;
  if (level <= 35) return 6;
  return 7;
}

function generateLevel(level: number) {
  const size = gridSize(level);

  const grid = Array.from({ length: size }, () => Array(size).fill(""));

  let x = 0;
  let y = 0;

  while (x < size - 1 || y < size - 1) {
    if (x === size - 1) {
      grid[y][x] = "⬇";
      y++;
    } else if (y === size - 1) {
      grid[y][x] = "➡";
      x++;
    } else {
      if (Math.random() > 0.5) {
        grid[y][x] = "➡";
        x++;
      } else {
        grid[y][x] = "⬇";
        y++;
      }
    }
  }

  grid[size - 1][size - 1] = "🏁";

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === "") {
        grid[i][j] = arrows[Math.floor(Math.random() * 4)];
      }
    }
  }

  return { grid, size, goal: { x: size - 1, y: size - 1 } };
}

export default function ArrowPuzzlePro() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [win, setWin] = useState(false);

  const { grid, size, goal } = generateLevel(level);

  const [player, setPlayer] = useState<Pos>({ x: 0, y: 0 });
  const [animating, setAnimating] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const startTouch = useRef<Pos | null>(null);

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
    confetti({
      particleCount: 500,
      spread: 60,
    });
    playWinSound();
  }
  // sond closed

  /* TIMER */

  useEffect(() => {
    const t = setInterval(() => {
      setTime((s) => s + 1);
    }, 1000);

    return () => clearInterval(t);
  }, []);

  /* MOVE PLAYER */

  const movePlayer = (dir: string) => {
    if (animating || gameOver) return;

    let { x, y } = player;

    if (dir === "⬆") y--;
    if (dir === "⬇") y++;
    if (dir === "⬅") x--;
    if (dir === "➡") x++;

    setAnimating(true);

    setTimeout(() => {
      if (x < 0 || y < 0 || x >= size || y >= size) {
        setGameOver(true);
        setAnimating(false);
        return;
      }

      setPlayer({ x, y });
      setScore((s) => s + 10);

      if (x === goal.x && y === goal.y) {
        setWin(true);

        setScore((s) => s + 100);
        setLevel((l) => l + 1);
        setPlayer({ x: 0, y: 0 });
        setTime(0);
      }

      setAnimating(false);
    }, 250);
  };

  /* FOLLOW ARROW */
  const followArrow = () => {
    // STOP if already at goal
    if (player.x === goal.x && player.y === goal.y) return;

    const dir = grid[player.y][player.x];
    if (!gameOver) {
      playEatSound();
    }
    movePlayer(dir);
  };

  /* SWIPE CONTROLS */

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    startTouch.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!startTouch.current) return;

    const t = e.changedTouches[0];

    const dx = t.clientX - startTouch.current.x;
    const dy = t.clientY - startTouch.current.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 40) movePlayer("➡");
      else if (dx < -40) movePlayer("⬅");
    } else {
      if (dy > 40) movePlayer("⬇");
      else if (dy < -40) movePlayer("⬆");
    }
  };

  /* RESTART */

  const restart = () => {
    setPlayer({ x: 0, y: 0 });
    setScore(0);
    setLevel(1);
    setGameOver(false);
    setTime(0);
  };

  useEffect(() => {
    setWin(false);
  }, [level]);

  return (
    <div
      className="flex flex-col items-center text-white p-4"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <h1 className="text-3xl font-bold mb-2">Arrow Puzzle</h1>

      {/* sound */}
      <audio ref={eatSound} src="/sounds/clicksound.mp3" />
      <audio ref={winSound} src="/sounds/win.mp3" />
      {/* sound close */}

      <div className="flex gap-6 mb-4">
        <div>Level: {level}</div>
        <div>Score: {score}</div>
        <div>Time: {time}s</div>
      </div>

      {/* GRID */}

      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${size},${gridSize(level) === 5 ? "50px" : gridSize(level) === 6 ? "40px" : gridSize(level) === 7 ? "40px" : "60px"})`,
        }}
      >
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={x + "-" + y}
              className={`w-[${gridSize(level) === 5 ? "50px" : gridSize(level) === 6 ? "40px" : gridSize(level) === 7 ? "40px" : "60px"}] h-[${gridSize(level) === 5 ? "50px" : gridSize(level) === 6 ? "40px" : gridSize(level) === 7 ? "40px" : "60px"}] flex items-center justify-center text-2xl border
              
              ${
                player.x === x && player.y === y
                  ? "bg-green-500"
                  : "bg-gray-800"
              }

              ${goal.x === x && goal.y === y ? "bg-yellow-500" : ""}
              `}
            >
              {cell}
            </div>
          )),
        )}
      </div>

      {/* CONTROLS */}

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setMuted(!muted)}
          className="px-4 py-2 bg-gray-700 rounded"
        >
          {muted ? "🔇" : "🔊"}
        </button>
        <button onClick={followArrow} className="px-6 py-2 bg-blue-500 rounded">
          Follow Arrow
        </button>

        <button onClick={restart} className="px-6 py-2 bg-red-500 rounded">
          Restart
        </button>
      </div>

      {gameOver && <div className="mt-4 text-red-400 text-xl">Game Over</div>}
    </div>
  );
}
