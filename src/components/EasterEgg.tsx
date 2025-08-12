import React from 'react';

interface EasterEggProps {
  onClick: () => void;
}

const EasterEgg: React.FC<EasterEggProps> = ({ onClick }) => {
  return (
    <div className="fixed top-6 left-6 z-40">
      <button
        onClick={onClick}
        title="Click me! 🤖"
      >
        <div className="text-lg animate-bounce-slow">💖</div>
      </button>
    </div>
  );
};

export default EasterEgg;