import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface SpinWheelProps {
  onNext: () => void;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ onNext }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const prizes = [
    { text: "Warm Hug", emoji: "🤗", color: "bg-pink-400" },
    { text: "Favorite Snack", emoji: "🍪", color: "bg-yellow-400" },
    { text: "Movie Pick", emoji: "🎬", color: "bg-blue-400" },
    { text: "Silly Dance", emoji: "💃", color: "bg-purple-400" },
    { text: "Coffee Date", emoji: "☕", color: "bg-amber-400" },
    { text: "Forehead Kiss", emoji: "😘", color: "bg-red-400" },
    { text: "Surprise Gift", emoji: "🎁", color: "bg-green-400" },
    { text: "Adventure Day", emoji: "🗺️", color: "bg-indigo-400" }
  ];

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    // Random spin amount (multiple full rotations + random position)
    const spins = 3 + Math.random() * 5;
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + (spins * 360) + randomAngle;
    
    setRotation(totalRotation);

    // Determine which prize was selected
    const normalizedAngle = (360 - (totalRotation % 360)) % 360;
    const prizeIndex = Math.floor(normalizedAngle / 45);
    
    setTimeout(() => {
      setIsSpinning(false);
      setResult(prizes[prizeIndex].text);
    }, 3000);
  };

  const resetWheel = () => {
    setRotation(0);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Spin the Wheel</h2>
        <p className="text-gray-600 mb-8">What surprise awaits you? 🎰</p>

        {/* Wheel Container */}
        <div className="relative w-80 h-80 mx-auto mb-8">
          {/* Wheel */}
          <div 
            className={`w-full h-full rounded-full shadow-2xl transition-all duration-3000 ease-out ${
              isSpinning ? 'animate-spin-custom' : ''
            }`}
            style={{ 
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(
                ${prizes.map((prize, index) => 
                  `${prize.color.replace('bg-', '').replace('-400', '')} ${index * 45}deg ${(index + 1) * 45}deg`
                ).join(', ')}
              )`
            }}
          >
            {/* Prize Segments */}
            {prizes.map((prize, index) => {
              const angle = (index * 45) + 22.5;
              const radian = (angle * Math.PI) / 180;
              const x = 130 + 80 * Math.cos(radian - Math.PI/2);
              const y = 130 + 80 * Math.sin(radian - Math.PI/2);

              return (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xs text-center"
                  style={{ left: x, top: y }}
                >
                  <div className="text-lg mb-1">{prize.emoji}</div>
                  <div className="text-xs">{prize.text}</div>
                </div>
              );
            })}
          </div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-gray-800"></div>
          </div>

          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center z-10">
            <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 disabled:scale-100 w-full"
          >
            {isSpinning ? 'Spinning... 🎯' : 'Spin the Wheel! 🎰'}
          </button>

          {result && !isSpinning && (
            <button
              onClick={resetWheel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-full flex items-center space-x-2 mx-auto transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Spin Again</span>
            </button>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className="animate-fade-in-up mt-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">You Won!</h3>
              <div className="text-4xl mb-3">
                {prizes.find(p => p.text === result)?.emoji}
              </div>
              <p className="text-xl font-bold text-blue-600 mb-3">{result}</p>
              <p className="text-gray-600 font-dancing">
                "Your prize is ready for pickup whenever I see you next! 💙"
              </p>
            </div>
            <button
              onClick={onNext}
              className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 w-full"
            >
              Yay! What's Next? →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;