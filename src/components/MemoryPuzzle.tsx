import React, { useState, useEffect } from 'react';
import { Shuffle, CheckCircle } from 'lucide-react';

interface MemoryPuzzleProps {
  onNext: () => void;
}

const MemoryPuzzle: React.FC<MemoryPuzzleProps> = ({ onNext }) => {
  const [pieces, setPieces] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Initialize puzzle pieces
  useEffect(() => {
    shufflePuzzle();
  }, []);

  const shufflePuzzle = () => {
    const shuffled = Array.from({ length: 9 }, (_, i) => i).sort(() => Math.random() - 0.5);
    setPieces(shuffled);
    setIsComplete(false);
    setShowMessage(false);
  };

  const movePiece = (index: number) => {
    const emptyIndex = pieces.indexOf(8); // Empty piece
    const canMove = Math.abs(index - emptyIndex) === 1 || Math.abs(index - emptyIndex) === 3;
    
    if (canMove) {
      const newPieces = [...pieces];
      [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
      setPieces(newPieces);
      
      // Check if complete
      const complete = newPieces.every((piece, index) => piece === index);
      if (complete) {
        setIsComplete(true);
        setTimeout(() => setShowMessage(true), 1000);
      }
    }
  };

  const getPiecePosition = (pieceNumber: number) => {
    const row = Math.floor(pieceNumber / 3);
    const col = pieceNumber % 3;
    return { x: col * 33.33, y: row * 33.33 };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Memory Puzzle</h2>
        <p className="text-gray-600 mb-6">Piece together this sweet memory!</p>

        {/* Puzzle Grid */}
        <div className="relative w-80 h-80 bg-white rounded-2xl shadow-lg mx-auto mb-6 overflow-hidden">
          {/* Background Image (when complete) */}
          {isComplete && (
            <div 
              className="absolute inset-0 opacity-90"
              style={{
                backgroundImage: 'url("https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          )}

          {/* Puzzle Pieces */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 p-2">
            {pieces.map((piece, index) => {
              const position = getPiecePosition(piece);
              return (
                <div
                  key={index}
                  onClick={() => movePiece(index)}
                  className={`relative rounded-lg transition-all duration-300 cursor-pointer ${
                    piece === 8 
                      ? 'bg-gray-100' 
                      : 'bg-blue-100 hover:bg-blue-200 transform hover:scale-105'
                  }`}
                  style={{
                    backgroundImage: piece !== 8 ? 'url("https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400")' : 'none',
                    backgroundSize: '320px 320px',
                    backgroundPosition: `-${position.x * 320/100}px -${position.y * 320/100}px`,
                    opacity: piece === 8 ? 0.3 : 1
                  }}
                >
                  {piece !== 8 && !isComplete && (
                    <div className="absolute inset-0 bg-blue-400 bg-opacity-20 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{piece + 1}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        {!isComplete && (
          <button
            onClick={shufflePuzzle}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-full mb-6 flex items-center space-x-2 mx-auto transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            <span>Shuffle Again</span>
          </button>
        )}

        {/* Completion State */}
        {isComplete && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500 mr-2" />
              <span className="text-xl font-bold text-green-600">Completed!</span>
            </div>
          </div>
        )}

        {/* Hidden Message */}
        {showMessage && (
          <div className="animate-fade-in-up bg-white rounded-2xl p-6 shadow-lg mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Hidden Message Unlocked! 💌</h3>
            <p className="text-gray-700 font-dancing text-lg">
              "Every moment with you feels like finding the missing piece of a puzzle. 
              You complete the picture in the most beautiful way. 💙"
            </p>
          </div>
        )}

        {isComplete && showMessage && (
          <button
            onClick={onNext}
            className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 w-full"
          >
            What's Next? →
          </button>
        )}

        {!isComplete && (
          <p className="text-gray-500 text-sm">
            Tap the pieces next to the empty space to move them! 🧩
          </p>
        )}
      </div>
    </div>
  );
};

export default MemoryPuzzle;