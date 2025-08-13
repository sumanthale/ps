import React, { useState } from "react";
import { Gift, Sparkles } from "lucide-react";

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
    {
      id: 1,
      title: "Cozy Coupon",
      content: "Redeem for one extra-long hug 🤗",
      emoji: "🫂",
      scratched: false,
    },
    {
      id: 2,
      title: "Sweet Treat",
      content: "Ice cream date (I’m buying) 🍦",
      emoji: "🍨",
      scratched: false,
    },
    {
      id: 3,
      title: "Hoodie Pass",
      content: "Steal my hoodie anytime 😉",
      emoji: "👕",
      scratched: false,
    },
    {
      id: 4,
      title: "Movie Night",
      content: "Your pick even if it’s scary 🎬",
      emoji: "🎬",
      scratched: false,
    },
  ]);

  const scratchCard = (cardId: number) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, scratched: true } : card
      )
    );
  };

  const allScratched = cards.every((card) => card.scratched);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <div className="max-w-sm w-full text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-2 font-dancing">
          Scratch & Reveal 💖
        </h2>
        <p className="text-pink-500 mb-8 font-medium">
          Little surprises to make you smile ✨
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-5 mb-8">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => !card.scratched && scratchCard(card.id)}
              className={`relative h-36 rounded-2xl overflow-hidden cursor-pointer transition-all transform hover:scale-105 shadow-lg ${
                card.scratched
                  ? "shadow-pink-300/50"
                  : "hover:shadow-pink-200/80"
              }`}
            >
              {/* Revealed Content */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 p-4 flex flex-col items-center justify-center">
                <div className="text-3xl mb-2">{card.emoji}</div>
                <h4 className="font-bold text-sm text-pink-700 mb-1">
                  {card.title}
                </h4>
                <p className="text-xs text-pink-600 text-center leading-snug">
                  {card.content}
                </p>
              </div>

              {/* Scratch Layer */}
              {!card.scratched && (
                <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-pink-400 flex items-center justify-center animate-pulse">
                  <Gift className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              )}
              {card.scratched && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-300 opacity-50 animate-flash-hide"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        {!allScratched && (
          <p className="text-pink-500 text-sm mb-6">
            Tap each card to reveal something just for you 💌
          </p>
        )}

        {/* Completion Message */}
        {allScratched && (
          <div className="animate-fade-in-up">
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 border border-pink-200">
              <h3 className="text-xl font-bold text-pink-600 mb-3">
                All Revealed! 🎉
              </h3>
              <p className="text-pink-500 font-dancing text-lg">
                "These little coupons are just my way of saying… I love making
                you smile 💕"
              </p>
            </div>
            <button
              onClick={onNext}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 w-full shadow-lg"
            >
              Aww, you’re the cutest → 🌸
            </button>
          </div>
        )}

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mt-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                card.scratched ? "bg-pink-500" : "bg-pink-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScratchCards;
