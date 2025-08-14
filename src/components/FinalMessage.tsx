import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FinalMessage: React.FC = () => {
  const [currentPart, setCurrentPart] = useState(-1);

const messageParts = [
  "Laugh till your cheeks hurt,",
  "collect little moments,",
  "and hold them close to your heart...",
  "and maybe think of me,",
  "just for a second,",
  "when something makes you smile.",
  "",
  "I'll be here,",
  "waiting to hear every detail,",
  "and to make our next memory together. 💙",
];

  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];
    messageParts.forEach((_, index) => {
      timers.push(setTimeout(() => setCurrentPart(index), index * 1300));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const sendMessage = () => {
    const phoneNumber = "9948661688";
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-gradient-to-b from-pink-50 via-rose-50 to-blue-50">
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.15, 0.4, 0.15],
              y: ["0%", "-20%", "0%"],
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Heart
              className="text-pink-300"
              style={{
                width: 14 + Math.random() * 14,
                height: 14 + Math.random() * 14,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="mb-16 relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <Star className="w-12 h-12 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-800 text-center mt-8 font-pacifico bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-md">
          A Message from the Heart
        </h1>
      </motion.div>

      {/* Animated Message */}
      <div className="max-w-sm w-full text-center relative z-10">
        <div className="rounded-3xl p-6 bg-white/80 backdrop-blur-md shadow-lg min-h-[300px] flex flex-col justify-center">
          <AnimatePresence mode="popLayout">
            {messageParts.slice(0, currentPart + 1).map((part, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`text-xl leading-relaxed font-dancing text-gray-700 ${
                  part === "" ? "mb-6" : "mb-3"
                }`}
              >
                {part}
              </motion.p>
            ))}
          </AnimatePresence>

          {currentPart >= messageParts.length - 1 && (
            <motion.div
              className="mt-8 border-t border-pink-200 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <p className="text-base text-gray-500 mb-2 font-dancing">
                With warmth,
              </p>
              <p className="text-xl font-bold text-blue-600 font-pacifico">Sumanth</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Action Button */}
      {currentPart >= messageParts.length - 1 && (
        <motion.div
          className="mt-10 z-10 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <motion.button
            onClick={sendMessage}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-pink-400 to-blue-400 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 shadow border"
          >
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex items-center"
            >
              <MessageCircle className="w-6 h-6 mr-1" />
            </motion.span>
            <span>
              Send a smile <span className="animate-bounce">😊</span>
            </span>
          </motion.button>
          <span className="mt-2 text-xs text-gray-400 italic">
            (Opens WhatsApp)
          </span>
        </motion.div>
      )}
      {currentPart >= messageParts.length - 1 && (
        <motion.div
          className="mt-16 rounded-3xl p-8 border border-pink-200 shadow-lg bg-white/70 backdrop-blur-md max-w-sm text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <motion.div
            className="text-5xl mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            🎁
          </motion.div>
          <p className="text-base text-gray-600 leading-relaxed font-dancing">
            Thank you for taking this little journey with me.  
            Every smile and moment you share means the world.
          </p>
          <p className="mt-6 text-lg text-pink-500 font-bold font-dancing">
            — For Pragna, from Sumanth
          </p>
          <div className="mt-6 text-3xl">💙✨💙</div>
        </motion.div>
      )}
    </div>
  );
};

export default FinalMessage;
