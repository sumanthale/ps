import React, { useState } from 'react';
import { Play, Pause, Heart, Music, Volume2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SongDedicationProps {
  onNext: () => void;
}

interface Song {
  id: number;
  message: string;
  title: string;
  artist: string;
  youtubeId: string;
  color: string;
  emoji: string;
}

const SongDedication: React.FC<SongDedicationProps> = ({ onNext }) => {
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [allSongsPlayed, setAllSongsPlayed] = useState<number[]>([]);

  const songs: Song[] = [
    {
      id: 1,
      message: "I've met a lot of people in my life, but nobody feels like you 💖",
      title: "Perfect",
      artist: "Ed Sheeran",
      youtubeId: "2Vv-BfVoq4g",
      color: "from-pink-100 to-rose-200",
      emoji: "💕"
    },
    {
      id: 2,
      message: "Your smile is the soundtrack to my favorite days ☀️",
      title: "Just The Way You Are",
      artist: "Bruno Mars",
      youtubeId: "LjhCEhWiKXk",
      color: "from-yellow-100 to-orange-200",
      emoji: "😊"
    },
    {
      id: 3,
      message: "I don't need a time machine, I just need you in my future 🕰️❤️",
      title: "All of Me",
      artist: "John Legend",
      youtubeId: "450p7goxZqg",
      color: "from-blue-100 to-indigo-200",
      emoji: "⏰"
    },
    {
      id: 4,
      message: "Even the stars get jealous of how much you shine ✨",
      title: "A Thousand Years",
      artist: "Christina Perri",
      youtubeId: "rtOvBOTyX00",
      color: "from-purple-100 to-pink-200",
      emoji: "⭐"
    },
    {
      id: 5,
      message: "You're the 'good morning' and 'good night' I never want to stop saying 🌙",
      title: "Can't Help Falling in Love",
      artist: "Elvis Presley",
      youtubeId: "vGJTaP6anOU",
      color: "from-green-100 to-teal-200",
      emoji: "🌙"
    }
  ];

  const playSong = (songId: number) => {
    setCurrentPlaying(songId);
    setShowPlayer(true);
    if (!allSongsPlayed.includes(songId)) {
      setAllSongsPlayed(prev => [...prev, songId]);
    }
  };

  const closePlayer = () => {
    setShowPlayer(false);
    setCurrentPlaying(null);
  };

  const currentSong = songs.find(song => song.id === currentPlaying);
  const allPlayed = allSongsPlayed.length === songs.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-pink-50 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              y: [100, -20, 100],
              x: [0, Math.sin(i) * 30, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            className="absolute text-pink-300"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${12 + Math.random() * 8}px`
            }}
          >
            💙
          </motion.div>
        ))}
      </div>

      {/* Header Section */}
      <motion.div 
        className="text-center pt-8 pb-6 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="relative mb-6">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl mb-4"
          >
            🎵
          </motion.div>
          <div className="absolute -top-2 -right-8">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl"
            >
              💙
            </motion.div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-blue-600 mb-3 font-pacifico">
          Every song reminds me of you 💙
        </h1>
        <p className="text-gray-600 font-dancing text-lg px-4 leading-relaxed">
          These are my little love notes to you, in the form of music
        </p>
      </motion.div>

      {/* Songs List */}
      <div className="px-4 pb-8 space-y-6 max-w-sm mx-auto">
        {songs.map((song, index) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="space-y-4"
          >
            {/* Personal Message */}
            <motion.div
              className="text-center"
              whileInView={{ scale: [0.95, 1] }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-700 font-dancing text-lg italic leading-relaxed px-2">
                "{song.message}"
              </p>
            </motion.div>

            {/* Song Card */}
            <motion.div
              className={`bg-gradient-to-r ${song.color} rounded-2xl p-5 shadow-lg border border-white/50`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                {/* Album Art Placeholder */}
                <div className="w-16 h-16 bg-white/70 rounded-xl flex items-center justify-center shadow-md">
                  <div className="text-2xl">{song.emoji}</div>
                </div>

                {/* Song Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg leading-tight">
                    {song.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-medium">
                    {song.artist}
                  </p>
                </div>

                {/* Play Button */}
                <motion.button
                  onClick={() => playSong(song.id)}
                  className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play className="w-5 h-5 text-blue-500 ml-0.5" />
                </motion.button>
              </div>

              {/* Played Indicator */}
              {allSongsPlayed.includes(song.id) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 flex items-center justify-center"
                >
                  <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Heart className="w-3 h-3 fill-current" />
                    <span>Played with love</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* All Songs Played Message */}
      {allPlayed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pb-6 max-w-sm mx-auto"
        >
          <div className="bg-gradient-to-r from-pink-100 to-blue-100 rounded-2xl p-6 text-center shadow-lg border border-white/50">
            <div className="text-4xl mb-3">🎶</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 font-pacifico">
              Now let's make our own love story ❤️
            </h3>
            <p className="text-gray-600 font-dancing text-lg mb-4">
              Every melody was chosen with you in mind
            </p>
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Continue Our Journey →
            </button>
          </div>
        </motion.div>
      )}

      {/* YouTube Player Modal */}
      <AnimatePresence>
        {showPlayer && currentSong && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Music className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-gray-800">Now Playing</span>
                </div>
                <button
                  onClick={closePlayer}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Song Info */}
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg text-gray-800">{currentSong.title}</h3>
                <p className="text-gray-600">{currentSong.artist}</p>
              </div>

              {/* YouTube Embed */}
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg mb-4">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1`}
                  title={`${currentSong.title} - ${currentSong.artist}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl"
                />
              </div>

              {/* Sweet Message */}
              <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-4 text-center">
                <p className="text-gray-700 font-dancing text-lg italic">
                  "This song makes me think of you 💙"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue Button (if not all played) */}
      {!allPlayed && (
        <div className="px-4 pb-8 max-w-sm mx-auto">
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-4">
              Listen to all songs to unlock the next surprise 🎵
            </p>
            <div className="flex justify-center space-x-2">
              {songs.map((song) => (
                <div
                  key={song.id}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    allSongsPlayed.includes(song.id) ? 'bg-pink-400' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongDedication;