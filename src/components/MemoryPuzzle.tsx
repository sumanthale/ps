import React, { useState, useEffect } from "react";
import { Shuffle, CheckCircle, Clock, Zap } from "lucide-react";

interface MemoryPuzzleProps {
  onNext: () => void;
}

const MemoryPuzzle: React.FC<MemoryPuzzleProps> = ({ onNext }) => {
  const [pieces, setPieces] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [autoSolveOption, setAutoSolveOption] = useState(false);

  const imageURL =
    "https://res.cloudinary.com/dcnl1eovc/image/upload/v1755038871/WhatsApp_Image_2025-08-13_at_04.17.11_993f7f82_scbkdc.jpg";

  // Initialize puzzle pieces
  useEffect(() => {
    shufflePuzzle();
  }, []);

  // Timer logic
  useEffect(() => {
    if (isComplete) return;
    if (timeLeft <= 0) {
      setAutoSolveOption(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isComplete]);

  const shufflePuzzle = () => {
    const arr = Array.from({ length: 9 }, (_, i) => i); // [0,1,2,...8] (0 is empty tile)

    // Simple function to swap two positions
    const swap = (i, j) => {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    };

    // Simulate a few random legal moves
    const moveTile = () => {
      const emptyIndex = arr.indexOf(0);
      const row = Math.floor(emptyIndex / 3);
      const col = emptyIndex % 3;

      // Find possible moves (up, down, left, right)
      const moves = [];
      if (row > 0) moves.push(emptyIndex - 3);
      if (row < 2) moves.push(emptyIndex + 3);
      if (col > 0) moves.push(emptyIndex - 1);
      if (col < 2) moves.push(emptyIndex + 1);

      // Pick a random move and swap with empty
      const move = moves[Math.floor(Math.random() * moves.length)];
      swap(emptyIndex, move);
    };

    // Do 10–20 random legal moves for an easy puzzle
    for (let i = 0; i < 15; i++) {
      moveTile();
    }

    setPieces(arr);
    setIsComplete(false);
    setShowMessage(false);
    setAutoSolveOption(false);
    setTimeLeft(180);
  };

  const movePiece = (index: number) => {
    const emptyIndex = pieces.indexOf(8);
    const canMove =
      Math.abs(index - emptyIndex) === 1 || Math.abs(index - emptyIndex) === 3;

    if (canMove) {
      const newPieces = [...pieces];
      [newPieces[index], newPieces[emptyIndex]] = [
        newPieces[emptyIndex],
        newPieces[index],
      ];
      setPieces(newPieces);

      // Check completion
      const complete = newPieces.every((piece, idx) => piece === idx);
      if (complete) handleComplete();
    }
  };

  const handleComplete = () => {
    setIsComplete(true);
    setTimeout(() => setShowMessage(true), 1000);
  };

  const autoSolve = () => {
    setPieces(Array.from({ length: 9 }, (_, i) => i));
    handleComplete();
  };

  const getPiecePosition = (pieceNumber: number) => {
    const row = Math.floor(pieceNumber / 3);
    const col = pieceNumber % 3;
    return { x: col * 33.33, y: row * 33.33 };
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-pink-100 py-4">
      <div className="max-w-sm w-full text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
          Memory Puzzle
        </h2>
        <p className="text-gray-600 mb-6">
          Piece together this sweet memory! 🧩
        </p>

        {/* Timer */}
        {!isComplete && (
          <div className="flex items-center justify-center mb-4 text-lg font-semibold text-gray-700">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            {formatTime(timeLeft)}
          </div>
        )}

        {/* Puzzle Grid */}
        <div className="relative w-80 h-80 bg-gray-200 rounded-2xl shadow-lg mx-auto mb-6 overflow-hidden">
          {isComplete ? (
            <img
              src={imageURL}
              alt="Completed Puzzle"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 p-2">
              {pieces.map((piece, index) => {
                const position = getPiecePosition(piece);
                return (
                  <div
                    key={index}
                    onClick={() => movePiece(index)}
                    className={`relative rounded-lg transition-all duration-300 cursor-pointer ${
                      piece === 8
                        ? "bg-gray-100"
                        : "bg-blue-100 hover:bg-blue-200 transform hover:scale-105"
                    }`}
                    style={{
                      backgroundImage:
                        piece !== 8 ? `url("${imageURL}")` : "none",
                      backgroundSize: "320px 320px",
                      backgroundPosition: `-${(position.x * 320) / 100}px -${
                        (position.y * 320) / 100
                      }px`,
                      opacity: piece === 8 ? 0.3 : 1,
                    }}
                  >
                    {piece !== 8 && !isComplete && (
                      <div className="absolute inset-0 bg-blue-400 bg-opacity-20 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {piece + 1}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="max-w-xs mx-auto">
          {/* Controls */}
          {!isComplete && !autoSolveOption && (
            <button
              onClick={shufflePuzzle}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-full mb-6 flex items-center space-x-2 mx-auto transition-colors"
            >
              <Shuffle className="w-4 h-4" />
              <span>Shuffle Again</span>
            </button>
          )}

          {/* Auto Solve Option */}
          {autoSolveOption && !isComplete && (
            <button
              onClick={autoSolve}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-full mb-6 flex items-center space-x-2 mx-auto transition-colors"
            >
              <Zap className="w-4 h-4" />
              <span>Time's Up! Solve Automatically</span>
            </button>
          )}

          {/* Completion State */}
          {isComplete && (
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-500 mr-2" />
                <span className="text-xl font-bold text-green-600">
                  Completed!
                </span>
              </div>
            </div>
          )}

          {/* Hidden Message */}
          {showMessage && (
            <div className="animate-fade-in-up bg-white rounded-2xl p-6 shadow-lg mb-6 border border-pink-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Hidden Message Unlocked! 💌
              </h3>
              <p className="text-gray-700 font-dancing text-lg">
                "Every moment with you feels like finding the missing piece of a
                puzzle. You complete the picture in the most beautiful way 💙"
              </p>
            </div>
          )}

          {/* Next Button */}
          {isComplete && showMessage && (
            <button
              onClick={onNext}
              className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-2 rounded-full font-semibold transition-all transform hover:scale-105 w-48"
            >
              What's Next? →
            </button>
          )}

          {!isComplete && !autoSolveOption && (
            <p className="text-gray-500 text-sm">
              Tap the pieces next to the empty space to move them! 🧩
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryPuzzle;
