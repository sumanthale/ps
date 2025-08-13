import React, { useState, useEffect } from "react";
import { Calendar, Clock, Heart } from "lucide-react";

interface TripCountdownProps {
  onNext: () => void;
}

const TripCountdown: React.FC<TripCountdownProps> = ({ onNext }) => {
  const targetDate = new Date();
  targetDate.setMonth(targetDate.getMonth());
  targetDate.setDate(30);
  targetDate.setHours(11, 0, 0, 0);

  const calculateTimeLeft = () => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
    const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
    const seconds = Math.max(0, Math.floor((diff / 1000) % 60));

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-pink-50 via-rose-50 to-blue-50 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-300 opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${12 + Math.random() * 16}px`,
              height: `${12 + Math.random() * 16}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-sm w-full text-center relative z-10">
        <h2 className="text-3xl font-bold text-rose-600 mb-2 font-dancing">
          Counting down to our next adventure ✨
        </h2>
        <p className="text-gray-600 mb-2">
          Can’t wait to see that smile again...
        </p>
        <p className="text-sm text-pink-500 italic mb-8">
          (okay, maybe I’m counting a little 😅)
        </p>

        {/* Countdown Display */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8 border border-pink-100">
          <div className="flex items-center justify-center mb-6">
            <Calendar className="w-8 h-8 text-pink-400 mr-3" />
            <span className="text-lg font-semibold text-gray-700">
              Until we hang out again
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              {
                label: "Days",
                value: timeLeft.days,
                colors: "from-pink-100 to-pink-200",
                text: "text-pink-600",
              },
              {
                label: "Hours",
                value: timeLeft.hours,
                colors: "from-rose-100 to-rose-200",
                text: "text-rose-600",
              },
              {
                label: "Minutes",
                value: timeLeft.minutes,
                colors: "from-purple-100 to-purple-200",
                text: "text-purple-600",
              },
              {
                label: "Seconds",
                value: timeLeft.seconds,
                colors: "from-blue-100 to-blue-200",
                text: "text-blue-600",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${item.colors} rounded-2xl p-4`}
              >
                <div className={`text-3xl font-bold ${item.text}`}>
                  {item.value}
                </div>
                <div className={`${item.text.replace("600", "800")} text-sm`}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Pulsing hearts */}
          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className="w-5 h-5 text-pink-400 animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1.5s",
                }}
              />
            ))}
          </div>

          <p className="text-gray-600 text-sm">
            The days feel slower, but they’re worth the wait 💫
          </p>
        </div>

        {/* Sweet Message */}
        <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-6 shadow-lg mb-8 border border-pink-100">
          <Clock className="w-6 h-6 text-pink-400 mx-auto mb-3" />
          <p className="text-gray-700 font-dancing text-lg mb-4 italic">
            "Time moves so slowly when I'm missing you, but I know it'll fly by
            once we're together again."
          </p>
          <div className="text-sm text-gray-500 text-left">
            <p>Things I’m looking forward to:</p>
            <ul className="mt-2 space-y-1">
              <li>• Laughing at our own silly jokes 😄</li>
              <li>• Seeing that excited look when we meet ✨</li>
              <li>• Trying that place we talked about 🍽️</li>
              <li>• Just enjoying the moment 🚶‍♂️🚶‍♀️</li>
              <li>• Planning our next adventure ✨</li>
            </ul>
          </div>
        </div>

        <button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-8 py-3 rounded-full font-semibold transition-transform transform hover:scale-105 w-full shadow-md"
        >
          It’s going to be so much fun → 🎉
        </button>
      </div>
    </div>
  );
};

export default TripCountdown;
