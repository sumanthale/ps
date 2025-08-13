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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden mobile-padding">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 gradient-kawaii animate-gradient-shift"></div>

      {/* Floating Glow Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-25 blur-sm"
            style={{
              width: Math.random() * 4 + 3 + "px",
              height: Math.random() * 4 + 3 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animation: `parallax-float ${
                Math.random() * 4 + 6
              }s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + "s",
            }}
          />
        ))}
      </div>

      {/* Floating Hearts (Parallax Layer) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-300 opacity-40 animate-float-smooth"
            style={{
              width: Math.random() * 20 + 12 + "px",
              height: Math.random() * 20 + 12 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 4 + "s",
              animationDuration: Math.random() * 3 + 5 + "s",
            }}
          />
        ))}
      </div>

      {/* Doraemon Pocket */}
      <div className="relative mb-14 z-10 animate-gentle-bounce sparkle-container">
        <img
          src="https://res.cloudinary.com/dcnl1eovc/image/upload/v1755027039/pngwing.com_snothx.png"
          alt="Doraemon Pocket"
          className="w-32 h-32 object-contain drop-shadow-xl"
        />
        <Heart className="absolute -top-4 -right-4 w-6 h-6 text-pink-400 animate-love-pulse" />
        <Heart className="absolute -bottom-4 -left-4 w-5 h-5 text-pink-300 animate-love-pulse animate-delay-500" />
      </div>

      {/* Animated Text */}
      <div className="h-28 flex items-center justify-center z-10 mobile-spacing">
        <h1
          key={currentText}
          className="text-3xl sm:text-4xl font-bold text-gray-800 animate-slide-in-up px-6 leading-snug max-w-lg text-kawaii"
          style={{
            fontFamily: currentText < 2 ? "Comfortaa" : "Sacramento",
            textShadow:
              currentText < 2
                ? "0 3px 15px rgba(168, 223, 255, 0.3)"
                : "0 3px 15px rgba(255, 182, 193, 0.3)",
          }}
        >
          {texts[currentText]}
        </h1>
      </div>

      {/* Progress Dots */}
      <div className="mt-8 flex space-x-4 z-10 mobile-spacing">
        {texts.map((_, index) => (
          <div
            key={index}
            className={`h-3 rounded-full transition-all duration-700 ${
              index === currentText
                ? "bg-pink-400 w-12 shadow-kawaii animate-love-pulse"
                : "bg-gray-300 opacity-40 w-3"
            }`}
          />
        ))}
      </div>

      {/* Continue Button */}
      <button
        onClick={onComplete}
        className="mt-12 text-lg sm:text-xl font-semibold text-white btn-romantic
             px-10 py-4 rounded-full shadow-romantic
             interactive touch-friendly animate-slide-in-up animate-delay-1000 font-comfortaa"
        style={{
          textShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        ✨ Tap to Continue ✨
      </button>
    </div>
  );
};

export default SplashScreen;
