import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Star } from 'lucide-react';

const FinalMessage: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentPart, setCurrentPart] = useState(0);

  const messageParts = [
    "Enjoy every laugh,",
    "every silly moment,",
    "every beautiful view...",
    "and maybe think of me",
    "when you see something",
    "that makes you smile.",
    "",
    "I'll be here,",
    "ready for our next story. 💙"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showMessage && currentPart < messageParts.length - 1) {
      const timer = setTimeout(() => {
        setCurrentPart(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [showMessage, currentPart]);

  const sendMessage = () => {
    const message = "Just saw your adorable website and I'm smiling so big right now! 😊💙";
    const encodedMessage = encodeURIComponent(message);
    
    // Try to open default messaging app
    window.open(`sms:?body=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="max-w-sm w-full text-center relative z-10">
        {/* Floating Hearts Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(25)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-pink-200 animate-float opacity-40"
              style={{
                width: Math.random() * 16 + 12 + 'px',
                height: Math.random() * 16 + 12 + 'px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div className="mb-16 relative z-10">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full mx-auto mb-8 flex items-center justify-center animate-pulse-glow shadow-dreamy">
            <Star className="w-12 h-12 text-white animate-sparkle" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-6 font-pacifico text-glow-pink">
            A Message from the Heart
          </h1>
        </div>

        {/* Animated Message */}
        {showMessage && (
          <div className="card-romantic rounded-3xl p-10 shadow-dreamy mb-10 relative z-10">
            <div className="min-h-[240px] flex flex-col justify-center">
              {messageParts.slice(0, currentPart + 1).map((part, index) => (
                <p
                  key={index}
                  className={`text-xl leading-relaxed font-dancing text-gray-700 animate-fade-in-up ${
                    part === "" ? "mb-6" : "mb-3"
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    textShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                >
                  {part}
                </p>
              ))}
            </div>

            {currentPart >= messageParts.length - 1 && (
              <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="border-t border-pink-200 pt-8">
                  <p className="text-base text-gray-500 mb-6 font-dancing">
                    With all my love,
                  </p>
                  <p className="text-xl font-bold text-blue-600 text-glow-blue">
                    Your Someone Special 💙
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        {currentPart >= messageParts.length - 1 && (
          <div className="animate-fade-in-up relative z-10 mb-8" style={{ animationDelay: '1s' }}>
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 text-white px-10 py-5 rounded-full font-bold text-xl transition-all transform hover:scale-105 w-full flex items-center justify-center space-x-4 shadow-dreamy animate-pulse-glow focus-romantic"
            >
              <MessageCircle className="w-7 h-7" />
              <span>Send me a smile 😊</span>
            </button>
            
            <p className="text-sm text-gray-400 mt-6 font-dancing">
              (This will open your messaging app with a sweet pre-written message)
            </p>
          </div>
        )}

        {/* Extra Touch */}
        {currentPart >= messageParts.length - 1 && (
          <div className="mt-16 animate-fade-in-up relative z-10" style={{ animationDelay: '1.5s' }}>
            <div className="card-dreamy rounded-3xl p-8 border border-pink-200 shadow-romantic">
              <div className="text-5xl mb-6 animate-heart-beat">🎁</div>
              <p className="text-base text-gray-600 leading-relaxed font-dancing">
                Thank you for taking this little journey through our pocket universe. 
                Every click, every smile, every moment you spent here means the world to me.
              </p>
              <div className="mt-6 text-3xl">
                💙✨💙
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalMessage;