import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import LoveMeter from './components/LoveMeter';
import AdventureStory from './components/AdventureStory';
import MemoryPuzzle from './components/MemoryPuzzle';
import VoiceNote from './components/VoiceNote';
import ScratchCards from './components/ScratchCards';
import BucketList from './components/BucketList';
import SongDedication from './components/SongDedication';
import SpinWheel from './components/SpinWheel';
import TripCountdown from './components/TripCountdown';
import FinalMessage from './components/FinalMessage';
import Navigation from './components/Navigation';
import EasterEgg from './components/EasterEgg';

const sections = [
  'splash',
  'lovemeter', 
  'adventure',
  'puzzle',
  'voice',
  'scratch',
  'bucketlist',
  'songs',
  'spin',
  'countdown',
  'final'
];

function App() {
  const [currentSection, setCurrentSection] = useState('splash');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload and setup
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   // Auto-advance from splash screen after 5 seconds
  //   if (currentSection === 'splash') {
  //     const timer = setTimeout(() => {
  //       setCurrentSection('lovemeter');
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [currentSection]);

  const navigateToSection = (section: string) => {
    setCurrentSection(section);
  };


  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentSection('lovemeter')} />;
      case 'lovemeter':
        return <LoveMeter onNext={() => setCurrentSection('adventure')} />;
      case 'adventure':
        return <AdventureStory onNext={() => setCurrentSection('puzzle')} />;
      case 'puzzle':
        return <MemoryPuzzle onNext={() => setCurrentSection('voice')} />;
      case 'voice':
        return <VoiceNote onNext={() => setCurrentSection('scratch')} />;
      case 'scratch':
        return <ScratchCards onNext={() => setCurrentSection('bucketlist')} />;
      case 'bucketlist':
        return <BucketList onNext={() => setCurrentSection('songs')} />;
      case 'songs':
        return <SongDedication onNext={() => setCurrentSection('spin')} />;
      case 'spin':
        return <SpinWheel onNext={() => setCurrentSection('countdown')} />;
      case 'countdown':
        return <TripCountdown onNext={() => setCurrentSection('final')} />;
      case 'final':
        return <FinalMessage />;
      default:
        return <SplashScreen onComplete={() => setCurrentSection('lovemeter')} />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
        : 'gradient-kawaii animate-gradient-shift'
    }`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-15 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 gradient-magical animate-gradient-shift"></div>
        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-parallax-float ${
              i % 4 === 0 ? 'bg-pink-300' : 
              i % 4 === 1 ? 'bg-blue-300' : 
              i % 4 === 2 ? 'bg-purple-300' : 'bg-yellow-300'
            }`}
            style={{
              width: Math.random() * 6 + 3 + 'px',
              height: Math.random() * 6 + 3 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 8 + 's',
              animationDuration: (Math.random() * 4 + 6) + 's'
            }}
          />
        ))}
        
        {/* Sparkle effects */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-sparkle"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 6 + 's',
              fontSize: Math.random() * 6 + 10 + 'px',
              color: i % 3 === 0 ? '#ffd700' : i % 3 === 1 ? '#ff69b4' : '#87ceeb'
            }}
          >
            {i % 4 === 0 ? '✨' : i % 4 === 1 ? '💫' : i % 4 === 2 ? '⭐' : '🌟'}
          </div>
        ))}
        
        {/* Floating hearts with better animation */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute text-pink-300 animate-float-smooth"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: (Math.random() * 3 + 5) + 's',
              fontSize: Math.random() * 8 + 12 + 'px',
              opacity: 0.6
            }}
          >
            💖
          </div>
        ))}
      </div>

      {/* Easter Egg */}
     {
      currentSection === 'countdown' && (
        <EasterEgg onClick={() => setShowEasterEgg(true)} />
      )
     }
      
      {/* Main Content */}
      <div className={`relative z-10 transition-all duration-1200 ${
        isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
      }`}>
        {renderCurrentSection()}
      </div>

      {/* Navigation */}
      {currentSection !== 'splash' && (
        <Navigation 
          currentSection={currentSection}
          onNavigate={navigateToSection}
          isDark={isDark}
        />
      )}

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="card-kawaii rounded-3xl p-8 max-w-sm w-full text-center animate-magical-appear shadow-dreamy sparkle-container">
            <div className="text-7xl mb-6 animate-gentle-bounce">🎉</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-glow-pink font-kalam">You found the secret!</h3>
            <p className="text-gray-600 mb-6 font-sacramento text-xl">Bonus hug unlocked when you're back! 🤗</p>
            <button 
              onClick={() => setShowEasterEgg(false)}
              className="btn-kawaii text-white px-8 py-3 rounded-full font-semibold text-lg focus-romantic interactive touch-friendly"
            >
              Aww, thanks! 💙
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;