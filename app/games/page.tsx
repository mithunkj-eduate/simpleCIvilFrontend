// "use client";

// import { useState } from "react";
// import SnakeGame from "@/components/Games/SnakeGame";
// import SodakuGame from "@/components/Games/Sodaku";
// import NameWheelGame from "@/components/Games/NameWheelGame";
// import BounceGame from "@/components/Games/BounceGame";
// import ZipProGame from "@/components/Games/ZipProGame";
// import StrangerGame from "@/components/Games/StrangerGame";
// import ArrowPuzzle from "@/components/Games/ArrowPuzzle";

// export default function Page() {
//   const [game, setGame] = useState<
//     | "snake"
//     | "sudoku"
//     | "NameWheelGame"
//     | "BounceGame"
//     | "ZipProGame"
//     | "StrangerGame"
//     | "FriendsGame"
//     | "ArrowPuzzleGame"
//     | null
//   >(null);

//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-black via-slate-900 to-black p-6">
//       {/* Game Selector */}
//       {!game && (
//         <div className="flex flex-col gap-6 items-center">
//           <h1 className="text-4xl font-bold text-cyan-400 drop-shadow-[0_0_20px_cyan]">
//             🎮 Mini Games
//           </h1>

//           <div className="flex gap-6 flex-wrap justify-center">
//             <button
//               onClick={() => setGame("snake")}
//               className="px-8 py-4 rounded-xl bg-gradient-to-r from-green-400 to-cyan-500 text-black font-bold shadow-[0_0_25px_cyan] hover:scale-105 transition"
//             >
//               🐍 Play Snake
//             </button>

//             <button
//               onClick={() => setGame("sudoku")}
//               className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-[0_0_25px_pink] hover:scale-105 transition"
//             >
//               🧩 Play Sudoku
//             </button>

//             <button
//               onClick={() => setGame("NameWheelGame")}
//               className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold shadow-[0_0_25px_pink] hover:scale-105 transition"
//             >
//               🎡 Play Lucky Wheel
//             </button>

//             <button
//               onClick={() => setGame("BounceGame")}
//               className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold shadow-[0_0_25px_pink] hover:scale-105 transition"
//             >
//               🔴 Play Bounce Game
//             </button>
//             <button
//               onClick={() => setGame("ZipProGame")}
//               className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold shadow-[0_0_25px_pink] hover:scale-105 transition"
//             >
//               🎡 Zip Game
//             </button>
//             <button
//               onClick={() => setGame("StrangerGame")}
//               className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold shadow-[0_0_25px_pink] hover:scale-105 transition"
//             >
//               🎡 Stranger Game
//             </button>
//             <button
//               onClick={() => setGame("FriendsGame")}
//               className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold shadow-[0_0_25px_pink] hover:scale-105 transition"
//             >
//               🎡 Friends Game
//             </button>

//             <button
//               onClick={() => setGame("ArrowPuzzleGame")}
//               className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold shadow-[0_0_25px_pink] hover:scale-105 transition"
//             >
//               🎡 Arrow Puzzle Game
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Game Area */}
//       {game === "snake" && (
//         <div className="flex flex-col items-center gap-4">
//           <SnakeGame />
//           <button
//             onClick={() => setGame(null)}
//             className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
//           >
//             ⬅ Back
//           </button>
//         </div>
//       )}

//       {game === "sudoku" && (
//         <div className="flex flex-col items-center gap-4">
//           <SodakuGame />
//           <button
//             onClick={() => setGame(null)}
//             className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
//           >
//             ⬅ Back
//           </button>
//         </div>
//       )}

//       {game === "NameWheelGame" && (
//         <div className="flex flex-col items-center gap-4">
//           <NameWheelGame />

//           <button
//             onClick={() => setGame(null)}
//             className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
//           >
//             ⬅ Back
//           </button>
//         </div>
//       )}

//       {game === "BounceGame" && (
//         <div className="flex flex-col items-center gap-4">
//           <BounceGame />

//           <button
//             onClick={() => setGame(null)}
//             className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
//           >
//             ⬅ Back
//           </button>
//         </div>
//       )}

//       {game === "ZipProGame" && (
//         <div className="flex flex-col items-center gap-4">
//           <ZipProGame />

//           <button
//             onClick={() => setGame(null)}
//             className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
//           >
//             ⬅ Back
//           </button>
//         </div>
//       )}

//       {game === "StrangerGame" && (
//         <div className="flex flex-col items-center gap-4">
//           <StrangerGame querstions={"Strangers"} />

//           <button
//             onClick={() => setGame(null)}
//             className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
//           >
//             ⬅ Back
//           </button>
//         </div>
//       )}

//       {game === "FriendsGame" && (
//         <div className="flex flex-col items-center gap-4">
//           <StrangerGame querstions={"Friends"} />

//           <button
//             onClick={() => setGame(null)}
//             className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
//           >
//             ⬅ Back
//           </button>
//         </div>
//       )}

//       {game === "ArrowPuzzleGame" && (
//         <div className="flex flex-col items-center gap-4">
//           <ArrowPuzzle />

//           <button
//             onClick={() => setGame(null)}
//             className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
//           >
//             ⬅ Back
//           </button>
//         </div>
//       )}
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import SnakeGame from "@/components/Games/SnakeGame";
import SodakuGame from "@/components/Games/Sodaku";
import NameWheelGame from "@/components/Games/NameWheelGame";
import BounceGame from "@/components/Games/BounceGame";
import ZipProGame from "@/components/Games/ZipProGame";
import StrangerGame from "@/components/Games/StrangerGame";
import ArrowPuzzle from "@/components/Games/ArrowPuzzle";

type GameType =
  | "snake"
  | "sudoku"
  | "NameWheelGame"
  | "BounceGame"
  | "ZipProGame"
  | "StrangerGame"
  | "FriendsGame"
  | "ArrowPuzzleGame"
  | null;

const games = [
  { key: "snake", label: "🐍 Snake", color: "from-green-400 to-cyan-500" },
  { key: "sudoku", label: "🧩 Sudoku", color: "from-purple-500 to-pink-500" },
  {
    key: "NameWheelGame",
    label: "🎡 Wheel",
    color: "from-red-500 to-pink-500",
  },
  {
    key: "BounceGame",
    label: "🔴 Bounce",
    color: "from-orange-500 to-red-500",
  },
  {
    key: "ZipProGame",
    label: "⚡ Zip Game",
    color: "from-yellow-400 to-orange-500",
  },
  {
    key: "StrangerGame",
    label: "💬 Stranger",
    color: "from-indigo-500 to-blue-500",
  },
  {
    key: "FriendsGame",
    label: "👫 Friends",
    color: "from-teal-400 to-green-500",
  },
  {
    key: "ArrowPuzzleGame",
    label: "➡️ Puzzle",
    color: "from-pink-500 to-purple-600",
  },
];

export default function Page() {
  const [game, setGame] = useState<GameType>(null);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black p-4 sm:p-6">
        {/* HEADER */}
        {!game && (
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400 drop-shadow-[0_0_20px_cyan]">
              🎮 Mini Games
            </h1>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              Choose a game and start playing 🚀
            </p>
          </div>
        )}

        {/* GAME GRID */}
        {!game && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {games.map((g) => (
              <button
                key={g.key}
                onClick={() => setGame(g.key as GameType)}
                className={`
                p-5 rounded-2xl text-white font-semibold
                bg-gradient-to-r ${g.color}
                shadow-lg hover:scale-105 active:scale-95
                transition-all duration-200
                flex items-center justify-center text-lg
              `}
              >
                {g.label}
              </button>
            ))}
          </div>
        )}

        {/* GAME AREA */}
        {game && (
          <div className="flex flex-col items-center gap-4 mt-6">
            <div className="w-full max-w-4xl flex justify-between items-center">
              <h2 className="text-white text-lg sm:text-xl font-bold">
                {game}
              </h2>

              <button
                onClick={() => setGame(null)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                ⬅ Back
              </button>
            </div>

            <div className="w-full flex justify-center">
              {game === "snake" && <SnakeGame />}
              {game === "sudoku" && <SodakuGame />}
              {game === "NameWheelGame" && <NameWheelGame />}
              {game === "BounceGame" && <BounceGame />}
              {game === "ZipProGame" && <ZipProGame />}
              {game === "StrangerGame" && (
                <StrangerGame querstions="Strangers" />
              )}
              {game === "FriendsGame" && <StrangerGame querstions="Friends" />}
              {game === "ArrowPuzzleGame" && <ArrowPuzzle />}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
