import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Heart } from 'lucide-react';

interface TripCountdownProps {
  onNext: () => void;
}

const TripCountdown: React.FC<TripCountdownProps> = ({ onNext }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;
        let newDays = prev.days;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }

        return {
          days: Math.max(0, newDays),
          hours: Math.max(0, newHours),
          minutes: Math.max(0, newMinutes),
          seconds: Math.max(0, newSeconds)
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Reunion Countdown</h2>
        <p className="text-gray-600 mb-2">Not that I'm counting or anything... 😏</p>
        <p className="text-sm text-pink-600 font-dancing mb-8">
          (Okay, maybe I am a little bit 💕)
        </p>

        {/* Countdown Display */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="flex items-center justify-center mb-6">
            <Calendar className="w-8 h-8 text-blue-400 mr-3" />
            <span className="text-lg font-semibold text-gray-700">Until we meet again</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-4">
              <div className="text-3xl font-bold text-pink-600">{timeLeft.days}</div>
              <div className="text-sm text-pink-800">Days</div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4">
              <div className="text-3xl font-bold text-blue-600">{timeLeft.hours}</div>
              <div className="text-sm text-blue-800">Hours</div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-4">
              <div className="text-3xl font-bold text-purple-600">{timeLeft.minutes}</div>
              <div className="text-sm text-purple-800">Minutes</div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-4">
              <div className="text-3xl font-bold text-green-600">{timeLeft.seconds}</div>
              <div className="text-sm text-green-800">Seconds</div>
            </div>
          </div>

          {/* Animated Hearts */}
          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 text-pink-400 animate-pulse`}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </div>

          <p className="text-gray-600 text-sm">
            Every second feels like forever when you're not here! 💙
          </p>
        </div>

        {/* Sweet Message */}
        <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-6 shadow-lg mb-8">
          <Clock className="w-6 h-6 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-700 font-dancing text-lg mb-4">
            "Time moves so slowly when I'm missing you, but I know it'll fly by once we're together again."
          </p>
          <div className="text-sm text-gray-500">
            <p>Until then, I'll be here thinking of:</p>
            <ul className="mt-2 space-y-1">
              <li>• Your amazing laugh 😄</li>
              <li>• All our inside jokes 😂</li>
              <li>• Your warm hugs 🤗</li>
              <li>• Planning our next adventure ✨</li>
            </ul>
          </div>
        </div>

        <button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 w-full"
        >
          The wait will be worth it! →
        </button>
      </div>
    </div>
  );
};

export default TripCountdown;