import React, { useState } from "react";
import { RotateCcw } from "lucide-react";

interface SpinWheelProps {
  onNext: () => void;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ onNext }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const prizes = [
    {
      text: "Warm Hug",
      emoji: "🤗",
      color: "#ffb6c1",
      description:
        "A big, cozy squeeze that melts away stress like magic. Bonus points if you don't let go too quickly.",
    },
    {
      text: "Snack",
      emoji: "🍪",
      color: "#fcd34d",
      description:
        "A surprise treat of your choice. Could be cookies, could be ice cream… could even be me cooking for you.",
    },
    {
      text: "Movie",
      emoji: "🎬",
      color: "#a5b4fc",
      description:
        "Your pick of a movie night, complete with snacks, blanket fort optional but highly recommended.",
    },
    {
      text: "Dance",
      emoji: "💃",
      color: "#c084fc",
      description:
        "A fun little dance together. Could be in the living room, could be in the rain no judgment.",
    },
    {
      text: "Coffee",
      emoji: "☕",
      color: "#fbbf24",
      description:
        "A shared coffee date. Maybe we talk for hours, maybe we just enjoy the silence… caffeine does the rest.",
    },
    {
      text: "Kiss",
      emoji: "😘",
      color: "#f87171",
      description:
        "The sweetest, most gentle kiss right on your forehead  to make you feel safe and cherished.",
    },
    {
      text: "Gift",
      emoji: "🎁",
      color: "#86efac",
      description:
        "A small, thoughtful surprise that says I thought of you (wrapped, of course, for dramatic effect).",
    },
    {
      text: "Adventure",
      emoji: "🗺️",
      color: "#93c5fd",
      description:
        "A spontaneous outing. Could be a park, a new café, or somewhere we've never been before.",
    },
  ];
  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    const spins = 3 + Math.random() * 4;
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + spins * 360 + randomAngle;

    // First: ensure the DOM has the current rotation
    requestAnimationFrame(() => {
      // Second: in the next frame, apply the new rotation
      requestAnimationFrame(() => {
        setRotation(totalRotation);
      });
    });

    const normalizedAngle = (360 - (totalRotation % 360)) % 360;
    const prizeIndex = Math.floor(normalizedAngle / 45);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(prizes[prizeIndex].text);
    }, 3200);
  };

  const resetWheel = () => {
    setRotation(0);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-pink-100 via-rose-50 to-white">
      <div className="w-full max-w-xs text-center mx-auto">
        <h2 className="text-2xl font-extrabold text-rose-600 mb-1 drop-shadow-sm">
          Wheel of Little Joys ✨
        </h2>
        <p className="text-rose-400 mb-5 text-sm italic">
          Your fate is just one spin away...
        </p>

        <div className="relative w-72 h-72 mx-auto mb-8">
          {/* Rotating colored segments */}
          <div
            className="absolute inset-0 rounded-full will-change-transform transition-transform duration-[3200ms] ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {/* Wheel background */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
        ${prizes
          .map((p, i) => `${p.color} ${i * 45}deg ${(i + 1) * 45}deg`)
          .join(", ")}
      )`,
              }}
            />

            {/* Prize labels */}
            {prizes.map((prize, index) => {
              const angle = index * 45 + 22.5;
              const rad = (angle * Math.PI) / 180;
              const x = 144 + 92 * Math.cos(rad - Math.PI / 2);
              const y = 144 + 92 * Math.sin(rad - Math.PI / 2);

              return (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 font-bold text-xs w-20 text-center drop-shadow-md"
                  style={{ left: x, top: y }}
                >
                  <div className="text-lg">{prize.emoji}</div>
                  <div className="truncate text-rose-900">{prize.text}</div>
                </div>
              );
            })}
          </div>

          {/* Pointer */}
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
            <div className="text-3xl drop-shadow-lg animate-pulse">❤️</div>
          </div>

          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/70 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center z-10 border-[4px] border-yellow-300">
            <div className="text-2xl">💘</div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg transition-transform hover:scale-105 disabled:scale-100 w-full"
          >
            {isSpinning ? "Spinning..." : "Spin for Treat"}
          </button>

          {result && !isSpinning && (
            <button
              onClick={resetWheel}
              className="bg-white/70 backdrop-blur-md hover:bg-white text-rose-500 px-5 py-2 rounded-full flex items-center justify-center space-x-2 mx-auto text-sm border border-rose-300 shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Spin Again</span>
            </button>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className="animate-fade-in-up mt-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-rose-200">
              <h3 className="text-lg font-bold text-rose-600">You Won! 💝</h3>
              <div className="text-4xl mt-1 mb-2">
                {prizes.find((p) => p.text === result)?.emoji}
              </div>
              <p className="text-rose-500 font-semibold">{result}</p>
              <p className="text-gray-700 text-sm mb-2">
                {prizes.find((p) => p.text === result)?.description}
              </p>
              <p className="text-gray-500 text-xs mt-2 italic">
                A special moment awaits when we meet! 💕
              </p>
            </div>
            <button
              onClick={onNext}
              className="mt-4 bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition-transform hover:scale-105 w-full text-sm"
            >
              What's Next? →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;
