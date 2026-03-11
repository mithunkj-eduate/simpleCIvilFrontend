// "use client";

// import { useEffect, useRef, useState } from "react";

// type Player = {
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
//   radius: number;
//   onGround: boolean;
// };

// const GRAVITY = 0.5;
// const MOVE_SPEED = 0.6;
// const FRICTION = 0.9;
// const JUMP = -13;

// export default function BounceUltimate() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const keys = useRef({
//     left: false,
//     right: false,
//   });

//   const [player, setPlayer] = useState<Player>({
//     x: 60,
//     y: 200,
//     vx: 0,
//     vy: 0,
//     radius: 12,
//     onGround: false,
//   });

//   const [score, setScore] = useState(0);
//   const [gameOver, setGameOver] = useState(false);
//   const [win, setWin] = useState(false);

//   const platforms = [
//     { x: 0, y: 380, w: 900, h: 20 },
//     { x: 200, y: 320, w: 120, h: 10 },
//     { x: 380, y: 270, w: 120, h: 10 },
//     { x: 600, y: 230, w: 120, h: 10 },
//   ];

//   const breakBlocks = [{ x: 500, y: 340, w: 40, h: 20, broken: false }];

//   const spikes = [
//     { x: 300, y: 370 },
//     { x: 450, y: 370 },
//   ];

//   const water = {
//     x: 700,
//     y: 350,
//     w: 200,
//     h: 50,
//   };

//   const goal = { x: 860, y: 340 };

//   const [rings, setRings] = useState([
//     { x: 230, y: 290 },
//     { x: 410, y: 240 },
//     { x: 630, y: 200 },
//   ]);

//   /* GAME LOOP */
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (gameOver || win) return;

//       setPlayer((p) => {
//         let vx = p.vx;
//         let vy = p.vy + GRAVITY;
//         let x = p.x;
//         let y = p.y;
//         let onGround = false;

//         /* horizontal movement */
//         if (keys.current.left) vx -= MOVE_SPEED;
//         if (keys.current.right) vx += MOVE_SPEED;

//         vx *= FRICTION;

//         x += vx;
//         y += vy;

//         /* water physics */
//         if (x > water.x && x < water.x + water.w && y > water.y) {
//           vy *= 0.8;
//         }

//         /* platform collision */
//         platforms.forEach((pl) => {
//           if (
//             x > pl.x - p.radius &&
//             x < pl.x + pl.w + p.radius &&
//             y >= pl.y - p.radius &&
//             y <= pl.y &&
//             vy > 0
//           ) {
//             y = pl.y - p.radius;
//             vy = -vy * 0.3;
//             onGround = true;
//           }
//         });

//         /* breakable blocks */
//         breakBlocks.forEach((b) => {
//           if (!b.broken) {
//             if (x > b.x && x < b.x + b.w && y > b.y && y < b.y + b.h) {
//               b.broken = true;
//               vy = -6;
//             }
//           }
//         });

//         /* spikes */
//         spikes.forEach((s) => {
//           if (Math.abs(x - s.x) < 15 && Math.abs(y - s.y) < 15) {
//             setGameOver(true);
//           }
//         });

//         /* goal */
//         if (Math.abs(x - goal.x) < 20 && Math.abs(y - goal.y) < 20) {
//           setWin(true);
//         }

//         /* fall detection */
//         if (y > 450) setGameOver(true);

//         return { ...p, x, y, vx, vy, onGround };
//       });

//       /* ring collection */
//       setRings((prev) =>
//         prev.filter((r) => {
//           const dx = r.x - player.x;
//           const dy = r.y - player.y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < 18) {
//             setScore((s) => s + 1);
//             return false;
//           }

//           return true;
//         }),
//       );
//     }, 20);

//     return () => clearInterval(interval);
//   }, [
//     player,
//     gameOver,
//     win,
//     water.h,
//     water.w,
//     water.x,
//     water.y,
//     spikes,
//     platforms,
//     breakBlocks,
//     goal.x,
//     goal.y,
//   ]);

//   /* DRAW */
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     /* player */
//     ctx.beginPath();
//     ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
//     ctx.fillStyle = "red";
//     ctx.fill();

//     /* platforms */
//     ctx.fillStyle = "#22c55e";
//     platforms.forEach((p) => {
//       ctx.fillRect(p.x, p.y, p.w, p.h);
//     });

//     /* break blocks */
//     ctx.fillStyle = "#f59e0b";
//     breakBlocks.forEach((b) => {
//       if (!b.broken) ctx.fillRect(b.x, b.y, b.w, b.h);
//     });

//     /* spikes */
//     ctx.fillStyle = "white";
//     spikes.forEach((s) => {
//       ctx.beginPath();
//       ctx.moveTo(s.x, s.y);
//       ctx.lineTo(s.x - 10, s.y + 10);
//       ctx.lineTo(s.x + 10, s.y + 10);
//       ctx.closePath();
//       ctx.fill();
//     });

//     /* water */
//     ctx.fillStyle = "rgba(0,150,255,0.5)";
//     ctx.fillRect(water.x, water.y, water.w, water.h);

//     /* rings */
//     ctx.strokeStyle = "yellow";
//     ctx.lineWidth = 3;
//     rings.forEach((r) => {
//       ctx.beginPath();
//       ctx.arc(r.x, r.y, 8, 0, Math.PI * 2);
//       ctx.stroke();
//     });

//     /* goal */
//     ctx.fillStyle = "cyan";
//     ctx.fillRect(goal.x, goal.y, 20, 40);
//   }, [player, rings]);

//   /* jump */
//   const jump = () => {
//     setPlayer((p) => {
//       if (!p.onGround) return p;
//       return { ...p, vy: JUMP };
//     });
//   };

//   const restart = () => {
//     setPlayer({
//       x: 60,
//       y: 200,
//       vx: 0,
//       vy: 0,
//       radius: 12,
//       onGround: false,
//     });

//     setScore(0);
//     setGameOver(false);
//     setWin(false);

//     setRings([
//       { x: 230, y: 290 },
//       { x: 410, y: 240 },
//       { x: 630, y: 200 },
//     ]);
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 text-white">
//       <h1 className="text-3xl font-bold">🔴 Bounce Ultimate</h1>

//       <div className="text-yellow-400">Rings: {score}</div>

//       <canvas
//         ref={canvasRef}
//         width={900}
//         height={420}
//         className="bg-black border w-full max-w-[700px] rounded"
//       />

//       {/* Mobile controls */}
//       <div className="flex gap-6 mt-2">
//         <button
//           onTouchStart={() => (keys.current.left = true)}
//           onTouchEnd={() => (keys.current.left = false)}
//           className="px-6 py-3 bg-blue-500 rounded text-xl"
//         >
//           ◀
//         </button>

//         <button
//           onClick={jump}
//           className="px-6 py-3 bg-green-500 rounded text-xl"
//         >
//           ⬆
//         </button>

//         <button
//           onTouchStart={() => (keys.current.right = true)}
//           onTouchEnd={() => (keys.current.right = false)}
//           className="px-6 py-3 bg-blue-500 rounded text-xl"
//         >
//           ▶
//         </button>
//       </div>

//       {(gameOver || win) && (
//         <button onClick={restart} className="px-6 py-3 bg-red-500 rounded">
//           Restart
//         </button>
//       )}

//       {gameOver && <div className="text-red-400">Game Over</div>}
//       {win && <div className="text-green-400">Level Complete 🎉</div>}
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

type Player = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  onGround: boolean;
};

// type Platform = { x: number; y: number; w: number; h: number };
type Ring = { x: number; y: number };
// type Spike = { x: number; y: number };

const GRAVITY = 0.5;
const MOVE_SPEED = 0.7;
const FRICTION = 0.9;
const JUMP = -13;

// const LEVELS = Array.from({ length: 10 }, (_, i) => ({
//   width: 900 + i * 200,

//   platforms: [
//     { x: 0, y: 380, w: 2000, h: 20 },
//     { x: 200 + i * 20, y: 320, w: 120, h: 10 },
//     { x: 380 + i * 40, y: 270, w: 120, h: 10 },
//     { x: 600 + i * 60, y: 230, w: 120, h: 10 },
//   ],

//   rings: [
//     { x: 230 + i * 20, y: 290 },
//     { x: 410 + i * 40, y: 240 },
//     { x: 630 + i * 60, y: 200 },
//   ],

//   spikes: [
//     { x: 300 + i * 30, y: 370 },
//     { x: 500 + i * 40, y: 370 },
//   ],

//   goal: { x: 820 + i * 200, y: 340 },
// }));
const LEVELS = Array.from({ length: 10 }, (_, i) => ({
  width: 900 + i * 200,

  platforms: [
    /* main ground */
    { x: 0, y: 380, w: 900 + i * 200, h: 20 },

    // /* extra bottom bars */
    // { x: 250 + i * 50, y: 360, w: 150, h: 15 },
    // { x: 500 + i * 60, y: 350, w: 150, h: 15 },
    // { x: 750 + i * 70, y: 360, w: 150, h: 15 },

    /* upper platforms */
    { x: 200 + i * 20, y: 320, w: 120, h: 10 },
    { x: 380 + i * 40, y: 270, w: 120, h: 10 },
    { x: 600 + i * 60, y: 230, w: 120, h: 10 },
    // { x: 810 + i * 80, y: 190, w: 120, h: 10 },
  ],

  rings: [
    { x: 230 + i * 20, y: 290 },
    { x: 410 + i * 40, y: 240 },
    { x: 630 + i * 60, y: 200 },
    // { x: 780 + i * 80, y: 160 }, // extra ring
  ],

  spikes: [
    { x: 300 + i * 30, y: 370 },
    { x: 500 + i * 40, y: 370 },
    { x: 700 + i * 50, y: 370 }, // extra spike
  ],

  goal: { x: 820 + i * 200, y: 340 },
}));

export default function BounceGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const keys = useRef({
    left: false,
    right: false,
  });

  const [level, setLevel] = useState(0);

  const [player, setPlayer] = useState<Player>({
    x: 60,
    y: 200,
    vx: 0,
    vy: 0,
    radius: 12,
    onGround: false,
  });

  const [rings, setRings] = useState<Ring[]>(LEVELS[level].rings);
  const [score, setScore] = useState(0);
  const [cameraX, setCameraX] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const levelData = LEVELS[level];

  /* GAME LOOP */
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver || win) return;

      setPlayer((p) => {
        let vx = p.vx;
        let vy = p.vy + GRAVITY;
        let x = p.x;
        let y = p.y;
        let onGround = false;

        if (keys.current.left) vx -= MOVE_SPEED;
        if (keys.current.right) vx += MOVE_SPEED;

        vx *= FRICTION;

        x += vx;
        y += vy;

        /* platform collision */
        levelData.platforms.forEach((pl) => {
          if (
            x > pl.x - p.radius &&
            x < pl.x + pl.w + p.radius &&
            y >= pl.y - p.radius &&
            y <= pl.y &&
            vy > 0
          ) {
            y = pl.y - p.radius;
            vy = -vy * 0.3;
            onGround = true;
          }
        });

        /* spikes */
        levelData.spikes.forEach((s) => {
          if (Math.abs(x - s.x) < 15 && Math.abs(y - s.y) < 15) {
            setGameOver(true);
          }
        });

        /* goal */
        if (
          rings.length === 0 &&
          Math.abs(x - levelData.goal.x) < 20 &&
          Math.abs(y - levelData.goal.y) < 20
        ) {
          setWin(true);
          confetti({
            particleCount: 200,
            spread: 90,
          });
        }

        if (y > 450) setGameOver(true);

        return { ...p, x, y, vx, vy, onGround };
      });

      /* ring collection */
      setRings((prev) =>
        prev.filter((r) => {
          const dx = r.x - player.x;
          const dy = r.y - player.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 18) {
            setScore((s) => s + 1);
            return false;
          }

          return true;
        }),
      );

      /* camera follow */
      setCameraX(player.x - 350);
    }, 20);

    return () => clearInterval(interval);
  }, [player, rings, gameOver, win, level]);

  /* DRAW */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(-cameraX, 0);

    /* player */
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    /* platforms */
    ctx.fillStyle = "#22c55e";
    levelData.platforms.forEach((p) => {
      ctx.fillRect(p.x, p.y, p.w, p.h);
    });

    /* spikes */
    ctx.fillStyle = "white";
    levelData.spikes.forEach((s) => {
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - 10, s.y + 10);
      ctx.lineTo(s.x + 10, s.y + 10);
      ctx.closePath();
      ctx.fill();
    });

    /* rings */
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 3;

    rings.forEach((r) => {
      ctx.beginPath();
      ctx.arc(r.x, r.y, 8, 0, Math.PI * 2);
      ctx.stroke();
    });

    /* goal */
    ctx.fillStyle = "cyan";
    ctx.fillRect(levelData.goal.x, levelData.goal.y, 20, 50);

    ctx.restore();
  }, [player, rings, cameraX, level]);

  /* jump */
  const jump = () => {
    setPlayer((p) => {
      if (!p.onGround) return p;
      return { ...p, vy: JUMP };
    });
  };

  useEffect(() => {
    const levelData = LEVELS[level];

    setPlayer({
      x: 60,
      y: 200,
      vx: 0,
      vy: 0,
      radius: 12,
      onGround: false,
    });

    setRings([...levelData.rings]);
  }, [level]);

  const restart = () => {
    setLevel(0);
    setScore(0);
    setGameOver(false);
    setWin(false);

    setPlayer({
      x: 60,
      y: 200,
      vx: 0,
      vy: 0,
      radius: 12,
      onGround: false,
    });

    setRings(LEVELS[0].rings);
  };

  const nextLevel = () => {
    if (level >= LEVELS.length - 1) {
      alert("🎉 You finished all levels!");
      restart();
      return;
    }

    const newLevel = level + 1;

    setLevel(newLevel);
    setWin(false);
    setGameOver(false);

    setPlayer({
      x: 60,
      y: 200,
      vx: 0,
      vy: 0,
      radius: 12,
      onGround: false,
    });

    setRings([...LEVELS[newLevel].rings]);

    setCameraX(0);
  };

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") {
        keys.current.left = true;
      }

      if (e.key === "ArrowRight" || e.key === "d") {
        keys.current.right = true;
      }

      if (e.key === "ArrowUp" || e.key === " " || e.key === "w") {
        jump();
      }
    };

    const keyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") {
        keys.current.left = false;
      }

      if (e.key === "ArrowRight" || e.key === "d") {
        keys.current.right = false;
      }
    };

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, []);
  return (
    <div className="flex flex-col items-center gap-4 text-white">
      <h1 className="text-3xl font-bold">🔴 Bounce Game</h1>

      <div className="flex gap-6">
        <div>Level: {level + 1}/10</div>
        <div className="text-yellow-400">Rings: {score}</div>
      </div>

      <canvas
        ref={canvasRef}
        width={900}
        height={420}
        className="bg-black border rounded w-full max-w-[700px]"
      />

      {/* Controls */}
      <div className="flex gap-6">
        <button
          onTouchStart={() => (keys.current.left = true)}
          onTouchEnd={() => (keys.current.left = false)}
          className="px-6 py-3 bg-blue-500 rounded text-xl"
        >
          ◀
        </button>

        <button
          onClick={jump}
          className="px-6 py-3 bg-green-500 rounded text-xl"
        >
          ⬆
        </button>

        <button
          onTouchStart={() => (keys.current.right = true)}
          onTouchEnd={() => (keys.current.right = false)}
          className="px-6 py-3 bg-blue-500 rounded text-xl"
        >
          ▶
        </button>
      </div>

      {gameOver && (
        <button onClick={restart} className="px-6 py-3 bg-red-500 rounded">
          Restart
        </button>
      )}

      {win && (
        <button onClick={nextLevel} className="px-6 py-3 bg-green-500 rounded">
          Next Level
        </button>
      )}

      {gameOver && <div className="text-red-400">Game Over</div>}
      {win && <div className="text-green-400">Level Complete 🎉</div>}
    </div>
  );
}
