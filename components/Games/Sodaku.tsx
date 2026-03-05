"use client";
import React, { useEffect, useState, useRef } from "react";

type Difficulty = "easy" | "medium" | "hard";

const emptyBoard = Array.from({ length: 9 }, () => Array(9).fill(0));

export default function App() {
  const [board, setBoard] = useState<number[][]>([]);
  const [initialBoard, setInitialBoard] = useState<number[][]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadBestTime();
    generateNewGame(difficulty);
  }, [difficulty]);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  const startTimer = () => {
    stopTimer();
    setTime(0);
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const loadBestTime = () => {
    const saved = localStorage.getItem(`sudoku-best-${difficulty}`);
    if (saved) setBestTime(parseInt(saved));
    else setBestTime(null);
  };

  const saveBestTime = (newTime: number) => {
    const key = `sudoku-best-${difficulty}`;
    const saved = localStorage.getItem(key);
    if (!saved || newTime < parseInt(saved)) {
      localStorage.setItem(key, newTime.toString());
      setBestTime(newTime);
    }
  };

  const shuffle = (arr: number[]) => arr.sort(() => Math.random() - 0.5);

  const isValid = (
    board: number[][],
    row: number,
    col: number,
    num: number,
  ) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if (board[r][c] === num) return false;
      }
    }
    return true;
  };

  const solveSudoku = (board: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (const num of nums) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudoku(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const generateFullSolution = () => {
    const newBoard = emptyBoard.map((row) => [...row]);
    solveSudoku(newBoard);
    return newBoard;
  };

  const getRemoveCount = (level: Difficulty) => {
    return level === "easy" ? 30 : level === "medium" ? 40 : 50;
  };

  const removeCells = (board: number[][], count: number) => {
    const puzzle = board.map((row) => [...row]);
    let removed = 0;
    while (removed < count) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0;
        removed++;
      }
    }
    return puzzle;
  };

  const generateNewGame = (level: Difficulty) => {
    const solution = generateFullSolution();
    const puzzle = removeCells(solution, getRemoveCount(level));
    setBoard(puzzle);
    setInitialBoard(puzzle.map((r) => [...r]));
    setMessage("");
    startTimer();
  };

  const handleChange = (row: number, col: number, value: string) => {
    if (!/^[1-9]?$/.test(value)) return;
    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = value === "" ? 0 : parseInt(value);
    setBoard(newBoard);
  };

  const checkSolution = () => {
    const newBoard = board.map((r) => [...r]);
    if (
      solveSudoku(newBoard) &&
      JSON.stringify(newBoard) === JSON.stringify(board)
    ) {
      stopTimer();
      saveBestTime(time);
      setMessage("🎉 Correct! Puzzle Solved!");
    } else {
      setMessage("❌ Incorrect Solution");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-3xl font-bold mb-2 animate-pulse">Sudoku Master</h1>

      <div className="flex gap-4 mb-4">
        <div>⏱ {formatTime(time)}</div>
        <div>🏆 Best: {bestTime ? formatTime(bestTime) : "--:--"}</div>
      </div>

      <div className="flex gap-3 mb-4">
        {(["easy", "medium", "hard"] as Difficulty[]).map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`px-3 py-1 rounded-full capitalize transition-all duration-300
              ${
                difficulty === level
                  ? "bg-white text-purple-600 scale-110"
                  : "bg-purple-400"
              }`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-9 bg-white p-2 rounded-xl shadow-2xl w-full max-w-sm">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const thickRight = colIndex % 3 === 2 && colIndex !== 8;
            const thickBottom = rowIndex % 3 === 2 && rowIndex !== 8;

            return (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                maxLength={1}
                value={cell === 0 ? "" : cell}
                disabled={initialBoard[rowIndex][colIndex] !== 0}
                onChange={(e) =>
                  handleChange(rowIndex, colIndex, e.target.value)
                }
                className={`aspect-square text-center font-bold text-black text-lg
          transition-all duration-200
          ${
            initialBoard[rowIndex][colIndex] !== 0
              ? "bg-gray-200"
              : "bg-white hover:bg-indigo-100"
          }
          border border-gray-400
          ${thickRight ? "border-r-4 border-r-black" : ""}
          ${thickBottom ? "border-b-4 border-b-black" : ""}`}
              />
            );
          }),
        )}
      </div>

      <button
        onClick={() => {
          const newBoard = board.map((r) => [...r]);
          solveSudoku(newBoard);
          setBoard(newBoard);
        }}
        className="mt-3 px-6 py-2 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all"
      >
        Solve
      </button>

      <button
        onClick={checkSolution}
        className="mt-6 px-6 py-2 bg-yellow-400 text-black font-bold rounded-xl shadow-lg hover:scale-105 transition-all"
      >
        Submit
      </button>

      {message && (
        <p className="mt-4 text-lg font-semibold animate-bounce">{message}</p>
      )}
    </div>
  );
}
