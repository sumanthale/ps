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
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'gradient-romantic animate-gradient-shift'
    }`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 animate-gradient-shift"></div>
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float ${
              i % 3 === 0 ? 'bg-pink-300' : i % 3 === 1 ? 'bg-blue-300' : 'bg-purple-300'
            }`}
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: (Math.random() * 3 + 4) + 's'
            }}
          />
        ))}
        
        {/* Sparkle effects */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute text-yellow-300 animate-sparkle"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 4 + 's',
              fontSize: Math.random() * 8 + 8 + 'px'
            }}
          >
            ✨
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
      <div className={`relative z-10 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
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
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card-romantic rounded-3xl p-8 max-w-sm w-full text-center animate-bounce-in shadow-dreamy">
            <div className="text-7xl mb-6 animate-heart-beat">🎉</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3 text-glow-pink">You found the secret!</h3>
            <p className="text-gray-600 mb-6 font-dancing text-lg">Bonus hug unlocked when you're back! 🤗</p>
            <button 
              onClick={() => setShowEasterEgg(false)}
              className="btn-romantic text-white px-8 py-3 rounded-full font-semibold text-lg focus-romantic"
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