import React, { useState } from 'react';
import { Play, Pause, Volume2, Heart } from 'lucide-react';

interface VoiceNoteProps {
  onNext: () => void;
}

const VoiceNote: React.FC<VoiceNoteProps> = ({ onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      // Simulate audio playing
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Voice Message</h2>
        <p className="text-gray-600 mb-8">A little something from my heart to yours 💙</p>

        {/* Voice Player */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          {/* Doraemon Pocket */}
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full mx-auto flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-b from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <Volume2 className={`w-10 h-10 text-white ${isPlaying ? 'animate-pulse' : ''}`} />
              </div>
            </div>
            {/* Sound waves */}
            {isPlaying && (
              <>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-blue-300 rounded-full animate-ping opacity-30"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-blue-200 rounded-full animate-ping opacity-20" style={{ animationDelay: '0.5s' }}></div>
              </>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-blue-400 h-2 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>0:00</span>
              <span>2:30</span>
            </div>
          </div>

          {/* Play Button */}
          <button
            onClick={togglePlay}
            className="bg-blue-400 hover:bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center transition-all transform hover:scale-105 mx-auto mb-4"
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </button>

          {/* Message Preview */}
          <div className="text-gray-600 text-sm italic">
            {!isPlaying && progress === 0 && "Tap to hear a special message..."}
            {isPlaying && progress < 30 && "Hey beautiful..."}
            {progress >= 30 && progress < 60 && "I hope you're smiling right now..."}
            {progress >= 60 && progress < 90 && "Because that smile is my favorite thing..."}
            {progress >= 90 && "Can't wait to see you again! 💙"}
          </div>
        </div>

        {/* Floating Hearts */}
        <div className="relative h-16 mb-6">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className={`absolute text-pink-400 w-4 h-4 animate-float ${isPlaying ? 'opacity-100' : 'opacity-0'} transition-opacity`}
              style={{
                left: `${20 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.5}s`
              }}
            />
          ))}
        </div>

        {progress >= 100 && (
          <div className="animate-fade-in-up">
            <div className="bg-pink-50 rounded-2xl p-4 mb-6">
              <p className="text-pink-700 font-dancing text-lg">
                "Hope that made you smile as much as you make me smile every day! 💕"
              </p>
            </div>
            <button
              onClick={onNext}
              className="bg-pink-400 hover:bg-pink-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 w-full"
            >
              That was so sweet! →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceNote;