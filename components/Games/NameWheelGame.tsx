"use client";

import { useRef, useState } from "react";
import confetti from "canvas-confetti";

export default function PointWheel() {
  const wheelRef = useRef<HTMLDivElement>(null);
  const rotation = useRef(0);
  const spinning = useRef(false);

  const [winner, setWinner] = useState<number | null>(null);

  // sound start
  const winSound = useRef<HTMLAudioElement>(null);

  const [muted, setMuted] = useState(false);

  const playWinSound = () => {
    if (!muted && winSound.current) {
      winSound.current.currentTime = 0;
      winSound.current.volume = 0.7;
      winSound.current.play();
    }
  };

  if (winner) {
    playWinSound();
  }
  // sond closed

  const TOTAL = 100;

  const colors = ["#ff4d4d", "#4dd2ff", "#4dff88", "#ffe44d", "#ff4da6"];

  const generateGradient = () => {
    const segment = 360 / TOTAL;
    let gradient = "conic-gradient(";

    for (let i = 0; i < TOTAL; i++) {
      const start = i * segment;
      const end = start + segment;
      const color = colors[i % colors.length];

      gradient += `${color} ${start}deg ${end}deg,`;
    }

    return gradient.slice(0, -1) + ")";
  };

  const spinWheel = () => {
    if (spinning.current) return;

    spinning.current = true;

    const segment = 360 / TOTAL;
    const randomNumber = Math.floor(Math.random() * TOTAL) + 1;

    const spin = 360 * 8 + (360 - (randomNumber - 1) * segment - segment / 2);

    rotation.current += spin;

    if (wheelRef.current) {
      wheelRef.current.style.transition =
        "transform 5s cubic-bezier(.17,.67,.83,.67)";
      wheelRef.current.style.transform = `rotate(${rotation.current}deg)`;
    }

    setTimeout(() => {
      setWinner(randomNumber);

      confetti({
        particleCount: 200,
        spread: 90,
      });

      spinning.current = false;
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center gap-6 text-white">
      {/* sound */}
      <audio ref={winSound} src="/sounds/win.mp3" />
      {/* sound close */}

      <h1 className="text-3xl font-bold text-yellow-400">
        🎡 1 - 100 Lucky Wheel
      </h1>

      {/* Wheel */}
      <div className="relative flex items-center justify-center">
        <div className="absolute -top-6 text-red-500 text-4xl z-10">▼</div>

        <div
          ref={wheelRef}
          className="w-80 h-80 md:w-96 md:h-96 rounded-full border-8 border-yellow-400 shadow-[0_0_40px_gold]"
          style={{ background: generateGradient() }}
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
          onClick={spinWheel}
          className="bg-green-500 px-10 py-3 rounded text-xl font-bold hover:bg-green-400"
        >
          SPIN
        </button>
      </div>

      {winner && (
        <div className="text-2xl font-bold text-green-400">
          🎉 Winning Number: {winner}
        </div>
      )}
    </div>
  );
}
