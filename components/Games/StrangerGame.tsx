"use client";
import { useState } from "react";

const questions = {
  1: [
    {
      english: "What small thing made you happy today?",
      kannada: "ಇಂದು ನಿಮ್ಮನ್ನು ಸಂತೋಷಪಡಿಸಿದ ಚಿಕ್ಕ ವಿಷಯ ಯಾವುದು?",
    },
    {
      english: "What's the best meal you've eaten recently?",
      kannada: "ಇತ್ತೀಚಿಗೆ ತಿಂದ ಅತ್ಯುತ್ತಮ ಊಟ ಯಾವುದು?",
    },
    {
      english:
        "If you could have dinner with any person (dead or alive), who would it be?",
      kannada:
        "ಯಾವುದೇ ವ್ಯಕ್ತಿಯೊಂದಿಗೆ (ಸತ್ತವರಾಗಲಿ ಬದುಕಿರುವವರಾಗಲಿ) ಊಟ ಮಾಡಬಹುದಾದರೆ, ಯಾರು?",
    },
    {
      english: "What's a song that always makes you smile?",
      kannada: "ಯಾವ ಹಾಡು ಯಾವಾಗಲೂ ನಿಮ್ಮನ್ನು ನಗಿಸುತ್ತದೆ?",
    },
    {
      english: "What's something you're surprisingly good at?",
      kannada: "ನೀವು ಆಶ್ಚರ್ಯಕರವಾಗಿ ಚೆನ್ನಾಗಿ ಮಾಡುವ ಒಂದು ವಿಷಯ ಏನು?",
    },
  ],
  2: [
    {
      english: "What is a memory you never forget?",
      kannada: "ನೀವು ಎಂದಿಗೂ ಮರೆಯದ ನೆನಪು ಯಾವುದು?",
    },
    {
      english: "What is something people often misunderstand about you?",
      kannada:
        "ಜನರು ನಿಮ್ಮ ಬಗ್ಗೆ ಸಾಮಾನ್ಯವಾಗಿ ತಪ್ಪಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಒಂದು ವಿಷಯ ಏನು?",
    },
    {
      english: "What moment changed your perspective on life the most?",
      kannada: "ನಿಮ್ಮ ಜೀವನದ ನೋಟವನ್ನು ಹೆಚ್ಚು ಬದಲಾಯಿಸಿದ ಕ್ಷಣ ಯಾವುದು?",
    },
    {
      english: "What fear has shaped many of your decisions?",
      kannada: "ಯಾವ ಭಯವು ನಿಮ್ಮ ಅನೇಕ ನಿರ್ಧಾರಗಳನ್ನು ರೂಪಿಸಿದೆ?",
    },
    {
      english: "What's something you wish you had known earlier in life?",
      kannada:
        "ಜೀವನದಲ್ಲಿ ಮೊದಲೇ ತಿಳಿದಿದ್ದರೆ ಚೆನ್ನಾಗಿತ್ತು ಎಂದು ನೀವು ಬಯಸುವುದು ಏನು?",
    },
  ],
  3: [
    {
      english: "When did you last cry, and why?",
      kannada: "ಕೊನೆಯ ಬಾರಿ ನೀವು ಯಾವಾಗ ಅಳಿದ್ದೀರಿ, ಮತ್ತು ಏಕೆ?",
    },
    {
      english: "What makes you feel truly alive?",
      kannada: "ನಿಮಗೆ ನಿಜವಾಗಿ ಜೀವಂತವಾಗಿರುವಂತೆ ಭಾಸವಾಗುವುದು ಏನು?",
    },
    {
      english:
        "What's something you wish more people truly understood about you?",
      kannada:
        "ಹೆಚ್ಚಿನ ಜನರು ನಿಮ್ಮ ಬಗ್ಗೆ ನಿಜವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬೇಕೆಂದು ನೀವು ಬಯಸುವುದು ಏನು?",
    },
    {
      english:
        "If today was your last day, what would you most regret not saying to someone?",
      kannada:
        "ಇಂದು ನಿಮ್ಮ ಕೊನೆಯ ದಿನವಾದರೆ, ಯಾರಿಗಾದರೂ ಹೇಳದೇ ಇರುವುದಕ್ಕೆ ಹೆಚ್ಚು ವಿಷಾದಿಸುತ್ತೀರಾ?",
    },
    {
      english:
        "What's a personal dream or fear you've never shared with most people?",
      kannada: "ಹೆಚ್ಚಿನ ಜನರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳದ ಒಂದು ವೈಯಕ್ತಿಕ ಕನಸು ಅಥವಾ ಭಯ ಏನು?",
    },
  ],
};

const questionsFriends = {
  1: [
    // Level 1 – Light & Playful (Warm-up with friends)
    {
      english: "What's one small thing that made you smile today?",
      kannada: "ಇಂದು ನಿಮ್ಮನ್ನು ನಗಿಸಿದ ಒಂದು ಚಿಕ್ಕ ವಿಷಯ ಏನು?",
    },
    {
      english: "If we were to hang out right now, what would you want to do?",
      kannada: "ಈಗ ನಾವು ಒಟ್ಟಿಗೆ ಇದ್ದರೆ, ನೀವು ಏನು ಮಾಡಲು ಇಷ್ಟಪಡುತ್ತೀರಿ?",
    },
    {
      english: "What's the funniest thing that's happened to you this week?",
      kannada: "ಈ ವಾರ ನಿಮಗೆ ನಡೆದ ಅತ್ಯಂತ ತಮಾಷೆಯ ಸಂಗತಿ ಯಾವುದು?",
    },
    {
      english: "What's your current favorite song or reel you keep replaying?",
      kannada: "ಈಗ ನೀವು ಪದೇ ಪದೇ ಕೇಳುತ್ತಿರುವ ಹಾಡು ಅಥವಾ ರೀಲ್ ಯಾವುದು?",
    },
    {
      english:
        "If you could teleport anywhere with friends right now, where would it be?",
      kannada:
        "ಈಗ ಸ್ನೇಹಿತರೊಂದಿಗೆ ಎಲ್ಲಿಗಾದರೂ ಟೆಲಿಪೋರ್ಟ್ ಆಗಬಹುದಾದರೆ, ಎಲ್ಲಿ ಹೋಗುತ್ತೀರಿ?",
    },
  ],
  2: [
    // Level 2 – Deeper & Real (Things friends usually don't ask)
    {
      english:
        "What's something you're going through right now that not many people know?",
      kannada:
        "ಈಗ ನೀವು ಏನನ್ನಾದರೂ ಎದುರಿಸುತ್ತಿದ್ದೀರಾ — ಹೆಚ್ಚಿನ ಜನರಿಗೆ ಗೊತ್ತಿಲ್ಲದ್ದು?",
    },
    {
      english:
        "What's a moment with a friend (maybe even me) that you'll always remember?",
      kannada:
        "ಒಬ್ಬ ಸ್ನೇಹಿತನೊಂದಿಗೆ (ನನ್ನೊಂದಿಗೂ ಆಗಿರಬಹುದು) ನೀವು ಎಂದಿಗೂ ಮರೆಯದ ಕ್ಷಣ ಯಾವುದು?",
    },
    {
      english:
        "What's one thing you wish your friends understood about you better?",
      kannada:
        "ನಿಮ್ಮ ಸ್ನೇಹಿತರು ನಿಮ್ಮ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ಚೆನ್ನಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬೇಕೆಂದು ಬಯಸುವ ಒಂದು ವಿಷಯ ಏನು?",
    },
    {
      english: "What's been the hardest part of the last year for you?",
      kannada: "ಕಳೆದ ಒಂದು ವರ್ಷದಲ್ಲಿ ನಿಮಗೆ ಅತ್ಯಂತ ಕಷ್ಟಕರವಾಗಿದ್ದ ಭಾಗ ಯಾವುದು?",
    },
    {
      english:
        "What's something you're secretly proud of but don't talk about much?",
      kannada: "ನೀವು ಗುಟ್ಟಾಗಿ ಹೆಮ್ಮೆಪಡುವ ಆದರೆ ಹೆಚ್ಚಾಗಿ ಮಾತನಾಡದ ವಿಷಯ ಏನು?",
    },
  ],
  3: [
    // Level 3 – Heart-to-Heart (Deep trust level)
    {
      english:
        "When was the last time you really cried — and what was it about?",
      kannada: "ಕೊನೆಯ ಬಾರಿ ನೀವು ನಿಜವಾಗಿ ಅಳಿದ್ದು ಯಾವಾಗ — ಮತ್ತು ಏಕೆ?",
    },
    {
      english: "What's one thing you wish you could tell your younger self?",
      kannada: "ನಿಮ್ಮ ಚಿಕ್ಕ ವಯಸ್ಸಿನ ನಿಮಗೆ ಹೇಳಲು ಬಯಸುವ ಒಂದು ವಿಷಯ ಏನು?",
    },
    {
      english: "What makes you feel most loved and cared for by your friends?",
      kannada:
        "ಸ್ನೇಹಿತರಿಂದ ನೀವು ಅತ್ಯಧಿಕ ಪ್ರೀತಿ ಮತ್ತು ಕಾಳಜಿ ಅನುಭವಿಸುವುದು ಯಾವಾಗ?",
    },
    {
      english:
        "If you could change one thing about how our friendship works, what would it be?",
      kannada:
        "ನಮ್ಮ ಸ್ನೇಹದ ರೀತಿಯಲ್ಲಿ ಒಂದು ವಿಷಯ ಬದಲಾಯಿಸಬಹುದಾದರೆ, ಏನು ಬದಲಾಯಿಸುತ್ತೀರಿ?",
    },
    {
      english:
        "What's a fear or dream you've been carrying that you haven't shared with many people — even close friends?",
      kannada:
        "ಹೆಚ್ಚಿನ ಜನರೊಂದಿಗೆ — ಸ್ನೇಹಿತರೊಂದಿಗೂ — ಹಂಚಿಕೊಳ್ಳದ ಒಂದು ಭಯ ಅಥವಾ ಕನಸು ಯಾವುದು?",
    },
  ],
};

interface Props {
  querstions: "Strangers" | "Friends";
}

export default function StrangerGame({ querstions }: Props) {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [langMode, setLangMode] = useState<"both" | "english" | "kannada">(
    "both",
  );
  const [currentQ, setCurrentQ] = useState(questions[1][0]);

  const getRandomQuestion = (lvl: 1 | 2 | 3) => {
    const list =
      querstions === "Friends" ? questionsFriends[lvl] : questions[lvl];
    return list[Math.floor(Math.random() * list.length)];
  };

  const nextQuestion = () => {
    setCurrentQ(getRandomQuestion(level));
  };

  const goToNextLevel = () => {
    if (level === 1) setLevel(2);
    else if (level === 2) setLevel(3);
  };

  // Dynamic title based on language mode
  const getTitle = () => {
    if (langMode === "english") return "Connect Deeply";
    if (langMode === "kannada") return "ಆಳವಾಗಿ ಸಂಪರ್ಕಿಸಿ";
    return "Connect Deeply\nಆಳವಾಗಿ ಸಂಪರ್ಕಿಸಿ";
  };

  const canGoNext = level < 3;

  const displayEnglish = langMode === "both" || langMode === "english";
  const displayKannada = langMode === "both" || langMode === "kannada";

  // Level name (bilingual always)
  const levelName =
    level === 1
      ? langMode === "kannada"
        ? "ಮಟ್ಟ 1 – ಸರಳ ಮತ್ತು ಸಂತೋಷಕರ"
        : langMode === "english"
          ? "Level 1 – Light & Fun"
          : "Level 1 – Light & Fun / ಮಟ್ಟ 1 – ಸರಳ ಮತ್ತು ಸಂತೋಷಕರ"
      : level === 2
        ? langMode === "kannada"
          ? "ಮಟ್ಟ 2 – ಆಳವಾದ"
          : langMode === "english"
            ? "Level 2 – Deeper"
            : "Level 2 – Deeper / ಮಟ್ಟ 2 – ಆಳವಾದ"
        : langMode === "kannada"
          ? "ಮಟ್ಟ 3 – ಹೃದಯದಿಂದ ಹೃದಯಕ್ಕೆ"
          : langMode === "english"
            ? "Level 3 – Heart to Heart"
            : "Level 3 – Heart to Heart / ಮಟ್ಟ 3 – ಹೃದಯದಿಂದ ಹೃದಯಕ್ಕೆ";

  // Button texts based on language mode
  const nextQuestionText =
    langMode === "english"
      ? "Next Question"
      : langMode === "kannada"
        ? "ಮುಂದಿನ ಪ್ರಶ್ನೆ"
        : "Next Question / ಮುಂದಿನ ಪ್ರಶ್ನೆ";

  const nextLevelText =
    langMode === "english"
      ? "Next Level →"
      : langMode === "kannada"
        ? "ಮುಂದಿನ ಮಟ್ಟ →"
        : "Next Level → / ಮುಂದಿನ ಮಟ್ಟ →";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-950 via-indigo-950 to-black text-white p-6 -p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-1 whitespace-pre-line text-center leading-tight">
        {getTitle()}
      </h1>
      <p className="text-lg md:text-xl opacity-80 mb-8 text-center">
        {levelName}
      </p>

      <div className="bg-white/10 backdrop-blur-xl p-6 md:p-10 rounded-2xl text-center max-w-lg w-full border border-white/20 shadow-2xl">
        <div className="min-h-[160px] md:min-h-[140px] flex flex-col items-center justify-center mb-8">
          {displayEnglish && (
            <p className="text-xl md:text-1xl leading-relaxed mb-4">
              {currentQ.english}
            </p>
          )}
          {displayKannada && (
            <p
              className={`text-xl md:text-1xl leading-relaxed ${displayEnglish ? "opacity-90 italic" : ""}`}
            >
              {currentQ.kannada}
            </p>
          )}
        </div>

        {/* Language Selector */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setLangMode("both")}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition ${langMode === "both" ? "bg-purple-600 shadow-md" : "bg-purple-800/60 hover:bg-purple-700"}`}
          >
            Both / ಎರಡೂ
          </button>
          <button
            onClick={() => setLangMode("english")}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition ${langMode === "english" ? "bg-purple-600 shadow-md" : "bg-purple-800/60 hover:bg-purple-700"}`}
          >
            English
          </button>
          <button
            onClick={() => setLangMode("kannada")}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition ${langMode === "kannada" ? "bg-purple-600 shadow-md" : "bg-purple-800/60 hover:bg-purple-700"}`}
          >
            ಕನ್ನಡ
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={nextQuestion}
            className="px-8 py-4 bg-pink-600 hover:bg-pink-500 active:bg-pink-700 rounded-xl font-medium transition-colors shadow-lg min-w-[180px]"
          >
            {nextQuestionText}
          </button>

          {canGoNext && (
            <button
              onClick={goToNextLevel}
              className="px-8 py-4 bg-purple-600/70 hover:bg-purple-600 active:bg-purple-800 rounded-xl font-medium transition-colors border border-purple-400/30 shadow-lg min-w-[180px]"
            >
              {nextLevelText}
            </button>
          )}
        </div>
      </div>

      <p className="mt-10 text-sm md:text-base opacity-70 text-center max-w-md">
        {langMode === "kannada"
          ? "ಪ್ರಾಮಾಣಿಕವಾಗಿ ಉತ್ತರಿಸಿ. ಹೃದಯದಿಂದ ಕೇಳಿ. ❤️"
          : langMode === "english"
            ? "Answer honestly. Listen with your heart. ❤️"
            : "Answer honestly. Listen with your heart. ❤️ ಪ್ರಾಮಾಣಿಕವಾಗಿ ಉತ್ತರಿಸಿ. ಹೃದಯದಿಂದ ಕೇಳಿ."}
      </p>
    </div>
  );
}
