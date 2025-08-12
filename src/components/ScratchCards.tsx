import React, { useState } from 'react';
import { Gift } from 'lucide-react';

interface ScratchCardsProps {
  onNext: () => void;
}

interface Card {
  id: number;
  title: string;
  content: string;
  emoji: string;
  scratched: boolean;
}

const ScratchCards: React.FC<ScratchCardsProps> = ({ onNext }) => {
  const [cards, setCards] = useState<Card[]>([
    { id: 1, title: "Cozy Coupon", content: "One warm hug when I see you next 🤗", emoji: "🫂", scratched: false },
    { id: 2, title: "Sweet Treat", content: "Ice cream date - my treat! 🍦", emoji: "🍨", scratched: false },
    { id: 3, title: "Hoodie Pass", content: "Steal my hoodie whenever you want", emoji: "👕", scratched: false },
    { id: 4, title: "Movie Night", content: "Pick any movie, I'll watch (even if it's scary)", emoji: "🎬", scratched: false }
  ]);

  const scratchCard = (cardId: number) => {
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, scratched: true } : card
    ));
  };

  const allScratched = cards.every(card => card.scratched);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Scratch & Reveal</h2>
        <p className="text-gray-600 mb-8">Little surprises just for you! 💝</p>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => !card.scratched && scratchCard(card.id)}
              className={`relative h-32 rounded-xl overflow-hidden cursor-pointer transition-all transform hover:scale-105 ${
                card.scratched ? '' : 'hover:shadow-lg'
              }`}
            >
              {/* Background (revealed content) */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 p-3 flex flex-col items-center justify-center">
                <div className="text-2xl mb-1">{card.emoji}</div>
                <h4 className="font-bold text-xs text-gray-800 mb-1">{card.title}</h4>
                <p className="text-xs text-gray-700 text-center leading-tight">{card.content}</p>
              </div>

              {/* Scratch Layer */}
              {!card.scratched && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center animate-pulse">
                  <Gift className="w-8 h-8 text-white" />
                </div>
              )}

              {/* Scratch Animation */}
              {card.scratched && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-300 opacity-50 animate-flash"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        {!allScratched && (
          <p className="text-gray-500 text-sm mb-6">
            Tap each card to scratch and reveal your surprise! ✨
          </p>
        )}

        {/* Completion Message */}
        {allScratched && (
          <div className="animate-fade-in-up">
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">All Revealed! 🎉</h3>
              <p className="text-gray-700 font-dancing text-lg">
                "These might be silly little coupons, but each one comes with unlimited love and the biggest smile I can give! 💙"
              </p>
            </div>
            <button
              onClick={onNext}
              className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 w-full"
            >
              These are so cute! →
            </button>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2">
          {cards.map(card => (
            <div
              key={card.id}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                card.scratched ? 'bg-pink-400' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScratchCards;