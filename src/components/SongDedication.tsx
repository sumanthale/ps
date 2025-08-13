import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Heart } from "lucide-react";
import { motion } from "framer-motion";
import PerfectSong from "../assets/perfect.mp3";
import BeautifulSong from "../assets/beautiful.mp3";
import ChirunamaSong from "../assets/chirunama.mp3";
import ChoosiSong from "../assets/choosi.mp3";
import JabilliSong from "../assets/jabilli.mp3";
import NaakosamSong from "../assets/naakosam.mp3";
import NeeveSong from "../assets/neeve.mp3";
import NinnuchudaganeSong from "../assets/ninnuchudagane.mp3";

// choosi.mp3,Choosi Chudangane by Anurag Kulakarni

//   jabilli.mp3, Jabilli Kosam by S. P. Balasubrahmanyam
//  naakosam.mp3, Naa Kosam by Sid Sriram
//  neeve.mp3, Neeve Neeve by G. V. Prakash Kuma
//  ninnuchudagane.mp3 , Ninnu chudagane by DSP

interface SongDedicationProps {
  onNext: () => void;
}

interface Song {
  id: number;
  message: string;
  title: string;
  artist: string;
  audioSrc: string;
  color: string;
  emoji: string;
}

const SongDedication: React.FC<SongDedicationProps> = ({ onNext }) => {
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const [allSongsPlayed, setAllSongsPlayed] = useState<number[]>([]);
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement | null }>({});
  const [progress, setProgress] = useState<{ [key: number]: number }>({});

  const songs: Song[] = [
    {
      id: 1,
      message:
        "When I listen to this, I imagine us dancing under the stars, lost in our own world 💖",
      title: "Perfect",
      artist: "Ed Sheeran",
      audioSrc: PerfectSong,
      color: "from-pink-100 to-rose-200",
      emoji: "💕",
    },
    {
      id: 3,
      message:
        "No matter where life takes us, I want you in every tomorrow 🕰️❤️",
      title: "Chirunama Thana Chirunama",
      artist: "Yazin Nizar",
      audioSrc: ChirunamaSong,
      color: "from-blue-100 to-indigo-200",
      emoji: "⏰",
    },
    {
      id: 4,
      message: "You are the tune my heart hums, even in silence 🎶",
      title: "Choosi Chudangane",
      artist: "Anurag Kulakarni",
      audioSrc: ChoosiSong,
      color: "from-green-100 to-teal-200",
      emoji: "🎵",
    },
    {
      id: 2,
      message: "Every time you smile, I feel like the luckiest person alive ☀️",
      title: "What Makes You Beautiful",
      artist: "One Direction",
      audioSrc: BeautifulSong,
      color: "from-yellow-100 to-orange-200",
      emoji: "😊",
    },

    {
      id: 5,
      message: "Your love is the rhythm that keeps my heart beating 💓",
      title: "Jabilli Kosam",
      artist: "S. P. Balasubrahmanyam",
      audioSrc: JabilliSong,
      color: "from-purple-100 to-violet-200",
      emoji: "💖",
    },
    {
      id: 6,
      message: "Every day with you is a love song I never want to end 🎤",
      title: "Naa Kosam",
      artist: "Sid Sriram",
      audioSrc: NaakosamSong,
      color: "from-pink-200 to-red-300",
      emoji: "🎤",
    },
    {
      id: 7,
      message: "You are my music, my heartbeat, and my forever ❤️🎶",
      title: "Neeve Neeve",
      artist: "G. V. Prakash Kumar",
      audioSrc: NeeveSong,
      color: "from-yellow-200 to-orange-300",
      emoji: "❤️",
    },
    {
      id: 8,
      message:
        "This is the final note in my heart’s playlist… I can’t say more than this, you are everything 🎼💞",
      title: "Ninnu Chudagane",
      artist: "Devi Sri Prasad (DSP)",
      audioSrc: NinnuchudaganeSong,
      color: "from-blue-200 to-indigo-300",
      emoji: "🎼",
    },
  ];

  const togglePlay = (songId: number) => {
    const audio = audioRefs.current[songId];
    if (!audio) return;

    if (currentPlaying === songId) {
      audio.pause();
      setCurrentPlaying(null);
    } else {
      // Pause any currently playing audio
      Object.values(audioRefs.current).forEach((a) => a?.pause());
      audio.play();
      setCurrentPlaying(songId);

      if (!allSongsPlayed.includes(songId)) {
        setAllSongsPlayed((prev) => [...prev, songId]);
      }
    }
  };

  const handleTimeUpdate = (songId: number) => {
    const audio = audioRefs.current[songId];
    if (!audio) return;
    setProgress((prev) => ({
      ...prev,
      [songId]: (audio.currentTime / audio.duration) * 100 || 0,
    }));
  };

  useEffect(() => {
    // Stop all audio when component unmounts
    return () => {
      Object.values(audioRefs.current).forEach((a) => a?.pause());
    };
  }, []);

  const allPlayed = allSongsPlayed.length === songs.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-pink-50 relative overflow-hidden">
      {/* Header */}
      <motion.div
        className="text-center pt-8 pb-6 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl font-bold text-blue-600 mb-3 font-pacifico">
          Every song reminds me of you 💙
        </h1>
        <p className="text-gray-600 font-dancing text-lg px-4">
          These are my little love notes to you, in the form of music
        </p>
      </motion.div>

      {/* Songs */}
      <div className="px-4 pb-8 space-y-6 max-w-sm mx-auto">
        {songs.map((song, index) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className={`relative bg-gradient-to-r ${song.color} rounded-3xl p-5 shadow-2xl border border-white/40 overflow-hidden`}
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Cassette Body */}
            <div className="bg-gradient-to-b from-gray-50 to-gray-200 rounded-xl p-4 shadow-inner relative border border-gray-300">
              {/* Cassette Top Label */}
              <div className="bg-white/90 backdrop-blur-sm rounded-md px-3 py-1 text-xs italic text-gray-700 font-dancing mb-4 text-center shadow-sm border border-pink-200">
                {song.message}
              </div>

              {/* Cassette Window */}
              <div className="flex items-center justify-between relative bg-gray-100 rounded-lg px-6 py-3 border border-gray-300 shadow-inner">
                {/* Left Reel */}
                <motion.div
                  animate={
                    currentPlaying === song.id ? { rotate: 360 } : { rotate: 0 }
                  }
                  transition={{
                    repeat: currentPlaying === song.id ? Infinity : 0,
                    duration: 3,
                    ease: "linear",
                  }}
                  className="w-12 h-12 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full border-4 border-gray-600 shadow-inner relative"
                >
                  <div className="absolute inset-2 rounded-full bg-gray-200 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-500" />
                  </div>
                </motion.div>

                {/* Tape Strip */}
                <div className="absolute top-1/2 left-[72px] right-[72px] h-1 bg-gray-700" />

                {/* Right Reel */}
                <motion.div
                  animate={
                    currentPlaying === song.id
                      ? { rotate: -360 }
                      : { rotate: 0 }
                  }
                  transition={{
                    repeat: currentPlaying === song.id ? Infinity : 0,
                    duration: 3,
                    ease: "linear",
                  }}
                  className="w-12 h-12 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full border-4 border-gray-600 shadow-inner relative"
                >
                  <div className="absolute inset-2 rounded-full bg-gray-200 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-500" />
                  </div>
                </motion.div>
              </div>

              {/* Play/Pause */}
              <motion.button
                onClick={() => togglePlay(song.id)}
                className={`mt-4 w-full rounded-lg flex items-center justify-center shadow-lg border-2 border-pink-400 py-3 text-lg font-semibold transition-all ${
                  currentPlaying === song.id
                    ? "bg-pink-500 text-white"
                    : "bg-white text-pink-500"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentPlaying === song.id ? "Pause" : "Play"}
              </motion.button>

              {/* Song Info */}
              <div className="mt-4 text-center">
                <h3 className="font-bold text-gray-800 text-lg">
                  {song.title}
                </h3>
                <p className="text-gray-500 text-sm">{song.artist}</p>
              </div>
            </div>

            {/* Audio */}
            <audio
              ref={(el) => (audioRefs.current[song.id] = el)}
              src={song.audioSrc}
              onTimeUpdate={() => handleTimeUpdate(song.id)}
              onEnded={() => setCurrentPlaying(null)}
            />
          </motion.div>
        ))}
      </div>

      {/* Unlock Button */}
      {allPlayed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pb-6 max-w-sm mx-auto"
        >
          <div className="bg-gradient-to-r from-pink-100 to-blue-100 rounded-2xl p-6 text-center shadow-lg border border-white/50">
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
    </div>
  );
};

export default SongDedication;
