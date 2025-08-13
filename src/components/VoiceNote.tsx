import React, { useState } from "react";
import { Play, Pause, Volume2, Heart, Sparkles } from "lucide-react";

interface VoiceNoteProps {
  onNext: () => void;
}

const VoiceNote: React.FC<VoiceNoteProps> = ({ onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!isPlaying) {
      if (progress >= 100) {
        setProgress(0);
      }
      setIsPlaying(true);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 150);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-pink-50 to-pink-100">
      <div className="max-w-sm w-full text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-2 animate-fade-in">
          Voice Love Note 💌
        </h2>
        <p className="text-pink-500 mb-8 italic animate-fade-in delay-200">
          Just for you... straight from my heart ❤️
        </p>

        {/* Voice Player */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8 relative overflow-hidden">
          {/* Soft glowing background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-100 via-white to-pink-50 opacity-50 pointer-events-none"></div>

          {/* Doraemon-style circle with glow */}
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-gradient-to-b from-pink-400 to-pink-500 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-pink-200">
              <div className="w-24 h-24 bg-gradient-to-b from-pink-600 to-pink-700 rounded-full flex items-center justify-center">
                <Volume2
                  className={`w-10 h-10 text-white ${
                    isPlaying ? "animate-pulse" : ""
                  }`}
                />
              </div>
            </div>
            {/* Sound waves */}
          </div>

          {/* Progress Bar */}
          <div className="mb-6 relative z-10">
            <div className="bg-pink-100 rounded-full h-2 mb-2 overflow-hidden">
              <div
                className="bg-pink-400 h-2 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-pink-500">
              <span>0:00</span>
              <span>2:30</span>
            </div>
          </div>

          {/* Play Button */}
          <button
            onClick={togglePlay}
            className="bg-pink-400 hover:bg-pink-500 text-white w-16 h-16 rounded-full flex items-center justify-center transition-all transform hover:scale-105 mx-auto mb-4 shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </button>

          {/* Romantic Message Flow */}
          <div className="text-pink-600 text-sm italic min-h-[24px] transition-opacity">
            {!isPlaying && progress === 0 && "Tap to hear a special message..."}
            {isPlaying && progress < 30 && "Hey pragna..."}
            {progress >= 30 &&
              progress < 60 &&
              "I hope you're smiling right now..."}
            {progress >= 60 &&
              progress < 90 &&
              "Because that smile is my favorite thing..."}
            {progress >= 90 && "Can't wait to see you again! 💙"}
          </div>
        </div>

        {/* Floating Hearts & Sparkles */}
        {
          isPlaying && <div className="relative h-16 mb-6">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className={`absolute text-pink-400 w-4 h-4 animate-float ${
                isPlaying ? "opacity-100" : "opacity-0"
              } transition-opacity`}
              style={{
                left: `${20 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.5}s`,
              }}
            />
          ))}
          {[...Array(3)].map((_, i) => (
            <Sparkles
              key={i}
              className={`absolute text-yellow-300 w-3 h-3 animate-float ${
                isPlaying ? "opacity-90" : "opacity-0"
              } transition-opacity`}
              style={{
                left: `${10 + i * 25}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${3 + i * 0.4}s`,
              }}
            />
          ))}
        </div>
        }

        {/* Final Romantic Reveal */}
        {progress >= 100 && (
          <div className="animate-fade-in-up">
            <div className="bg-pink-50 rounded-2xl p-4 mb-6 shadow-inner">
              <p className="text-pink-700 font-dancing text-lg leading-relaxed">
                "With you, even the smallest moments feel special 💕"
              </p>
            </div>
            <button
              onClick={onNext}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 w-full shadow-lg"
            >
              You're kinda amazing → 💫
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceNote;
