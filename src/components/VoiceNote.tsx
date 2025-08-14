import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Heart, Sparkles } from "lucide-react";
import VoiceNoteFile from "../assets/mine.mp3";

interface VoiceNoteProps {
  onNext: () => void;
}

const VoiceNote: React.FC<VoiceNoteProps> = ({ onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(VoiceNoteFile);

    audioRef.current.addEventListener("loadedmetadata", () => {
      setDuration(audioRef.current?.duration || 0);
    });

    audioRef.current.addEventListener("timeupdate", () => {
      if (audioRef.current && duration > 0) {
        setProgress((audioRef.current.currentTime / duration) * 100);
      }
    });

    audioRef.current.addEventListener("ended", () => {
      setIsPlaying(false);
      setProgress(100);
    });

    return () => {
      audioRef.current?.pause();
      audioRef.current?.removeAttribute("src");
      audioRef.current?.load();
    };
  }, [duration]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (progress >= 100) {
        audioRef.current.currentTime = 0;
        setProgress(0);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-pink-50 to-pink-100">
      <div className="max-w-sm w-full text-center">
         <h2 className="text-4xl font-bold text-pink-600 mb-2 font-pacifico drop-shadow-lg animate-fade-in">
          Voice  Note 💌
        </h2>
        <p className="text-pink-500 mb-8 italic animate-fade-in delay-200 font-nunito mt-4">
          Just for you... straight from my heart ❤️
        </p>

        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-100 via-white to-pink-50 opacity-50 pointer-events-none"></div>

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
          </div>

          <div className="mb-6 relative z-10">
            <div className="bg-pink-100 rounded-full h-2 mb-2 overflow-hidden">
              <div
                className="bg-pink-400 h-2 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-pink-500">
              <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

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

          <div className="text-pink-600 text-sm italic min-h-[24px] transition-opacity font-medium">
            {!isPlaying && progress === 0 && "Tap to hear a special message..."}
            {isPlaying && progress < 20 && "Hey Pragna..."}
            {progress >= 20 &&
              progress < 50 &&
              "I hope you're smiling right now..."}
            {progress >= 50 &&
              progress < 80 &&
              "That smile is my favorite thing..."}
            {progress >= 80 && progress < 100 && "Can't wait to see you again! 💙"}
          </div>
        </div>

        {isPlaying && (
          <div className="relative h-16 mb-6">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className={`absolute text-pink-400 w-4 h-4 animate-float opacity-100 transition-opacity`}
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
                className={`absolute text-yellow-300 w-3 h-3 animate-float opacity-90 transition-opacity`}
                style={{
                  left: `${10 + i * 25}%`,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${3 + i * 0.4}s`,
                }}
              />
            ))}
          </div>
        )}

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
