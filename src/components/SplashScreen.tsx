import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [currentText, setCurrentText] = useState(0);

  const texts = [
    "Hi Beautiful 💙",
    "Welcome to our pocket universe",
    "Made with a lot of love",
    "and maybe a little help from Doraemon",
  ];

  useEffect(() => {
    const textTimer = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 2500);
    return () => clearInterval(textTimer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 animate-gradient-shift"></div>

      {/* Floating Glow Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 blur-md"
            style={{
              width: Math.random() * 6 + 4 + "px",
              height: Math.random() * 6 + 4 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animation: `floatParticle ${
                Math.random() * 6 + 8
              }s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + "s",
            }}
          />
        ))}
      </div>

      {/* Floating Hearts (Parallax Layer) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-300 opacity-30 animate-float-smooth"
            style={{
              width: Math.random() * 25 + 15 + "px",
              height: Math.random() * 25 + 15 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 4 + "s",
              animationDuration: Math.random() * 5 + 6 + "s",
            }}
          />
        ))}
      </div>

      {/* Doraemon Pocket */}
      <div className="relative mb-14 z-10 animate-bounce-slow">
        <img
          src="https://res.cloudinary.com/dcnl1eovc/image/upload/v1755027039/pngwing.com_snothx.png"
          alt="Doraemon Pocket"
          className="w-36 h-w-36 object-contain drop-shadow-lg"
        />
        <Heart className="absolute -top-5 -right-5 w-8 h-8 text-pink-400 animate-pulse-float" />
        <Heart className="absolute -bottom-5 -left-5 w-6 h-6 text-pink-300 animate-pulse-float-delayed" />
      </div>

      {/* Animated Text */}
      <div className="h-24 flex items-center justify-center z-10">
        <h1
          key={currentText}
          className="text-3xl sm:text-4xl font-bold text-gray-800 animate-fade-slide px-6 leading-snug max-w-lg"
          style={{
            fontFamily: currentText < 2 ? "Nunito" : "Dancing Script",
            textShadow:
              currentText < 2
                ? "0 2px 10px rgba(168, 223, 255, 0.4)"
                : "0 2px 10px rgba(255, 182, 193, 0.4)",
          }}
        >
          {texts[currentText]}
        </h1>
      </div>

      {/* Progress Dots */}
      <div className="mt-8 flex space-x-3 z-10">
        {texts.map((_, index) => (
          <div
            key={index}
            className={`h-3 rounded-full transition-all duration-500 ${
              index === currentText
                ? "bg-pink-400 w-10 shadow-glow"
                : "bg-gray-300 opacity-50 w-3"
            }`}
          />
        ))}
      </div>

      {/* Continue Button */}
      <button
        onClick={onComplete}
        className="mt-12 text-lg sm:text-xl font-semibold text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 
             px-8 py-3 rounded-full shadow-lg shadow-pink-300/50 
             transition-all duration-300 ease-out transform hover:scale-110 hover:shadow-pink-400/70 
             hover:brightness-110 animate-fade-in-delayed"
        style={{
          textShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        ✨ Tap to Continue ✨
      </button>
      {/* Animations */}
    </div>
  );
};

export default SplashScreen;
