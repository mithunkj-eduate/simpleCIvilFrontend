"use client";

import { useState } from "react";
import SnakeGame from "@/components/Games/SnakeGame";
import SodakuGame from "@/components/Games/Sodaku";
import NameWheelGame from "@/components/Games/NameWheelGame";
import BounceGame from "@/components/Games/BounceGame";

export default function Page() {
  const [game, setGame] = useState<"snake" | "sudoku" | "NameWheelGame" | "BounceGame" | null>(
    null,
  );

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-black via-slate-900 to-black p-6">
      {/* Game Selector */}
      {!game && (
        <div className="flex flex-col gap-6 items-center">
          <h1 className="text-4xl font-bold text-cyan-400 drop-shadow-[0_0_20px_cyan]">
            🎮 Mini Games
          </h1>

          <div className="flex gap-6 flex-wrap justify-center">
            <button
              onClick={() => setGame("snake")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-green-400 to-cyan-500 text-black font-bold shadow-[0_0_25px_cyan] hover:scale-105 transition"
            >
              🐍 Play Snake
            </button>

            <button
              onClick={() => setGame("sudoku")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-[0_0_25px_pink] hover:scale-105 transition"
            >
              🧩 Play Sudoku
            </button>

            <button
              onClick={() => setGame("NameWheelGame")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold shadow-[0_0_25px_pink] hover:scale-105 transition"
            >
              🎡 Play Lucky Wheel
            </button>

             <button
              onClick={() => setGame("BounceGame")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold shadow-[0_0_25px_pink] hover:scale-105 transition"
            >
              🎡 Play Bounce Game
            </button>
          </div>
        </div>
      )}

      {/* Game Area */}
      {game === "snake" && (
        <div className="flex flex-col items-center gap-4">
          <SnakeGame />
          <button
            onClick={() => setGame(null)}
            className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            ⬅ Back
          </button>
        </div>
      )}

      {game === "sudoku" && (
        <div className="flex flex-col items-center gap-4">
          <SodakuGame />
          <button
            onClick={() => setGame(null)}
            className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            ⬅ Back
          </button>
        </div>
      )}

      {game === "NameWheelGame" && (
        <div className="flex flex-col items-center gap-4">
          <NameWheelGame />

          <button
            onClick={() => setGame(null)}
            className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            ⬅ Back
          </button>
        </div>
      )}

        {game === "BounceGame" && (
        <div className="flex flex-col items-center gap-4">
          <BounceGame />

          <button
            onClick={() => setGame(null)}
            className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            ⬅ Back
          </button>
        </div>
      )}
    </main>
  );
}
