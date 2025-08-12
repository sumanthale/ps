import React, { useState } from 'react';
import { MapPin, Coffee, Camera, Utensils, Plane, Star } from 'lucide-react';

interface BucketListProps {
  onNext: () => void;
}

const BucketList: React.FC<BucketListProps> = ({ onNext }) => {
  const [clickedItems, setClickedItems] = useState<number[]>([]);

  const bucketListItems = [
    { 
      id: 1, 
      icon: Utensils, 
      title: "Street Food Adventure", 
      description: "Eat till we can't move 🍜",
      color: "bg-red-100 text-red-600 hover:bg-red-200"
    },
    { 
      id: 2, 
      icon: MapPin, 
      title: "Get Lost Together", 
      description: "In a new city 🗺️",
      color: "bg-blue-100 text-blue-600 hover:bg-blue-200"
    },
    { 
      id: 3, 
      icon: Coffee, 
      title: "Café Hopping", 
      description: "Find the perfect latte ☕",
      color: "bg-amber-100 text-amber-600 hover:bg-amber-200"
    },
    { 
      id: 4, 
      icon: Star, 
      title: "Midnight Stargazing", 
      description: "Make wishes together ✨",
      color: "bg-purple-100 text-purple-600 hover:bg-purple-200"
    },
    { 
      id: 5, 
      icon: Camera, 
      title: "Photo Booth Spree", 
      description: "Silly faces required 📸",
      color: "bg-pink-100 text-pink-600 hover:bg-pink-200"
    },
    { 
      id: 6, 
      icon: Plane, 
      title: "Spontaneous Trip", 
      description: "Pack light, dream big ✈️",
      color: "bg-green-100 text-green-600 hover:bg-green-200"
    }
  ];

  const handleItemClick = (id: number) => {
    if (!clickedItems.includes(id)) {
      setClickedItems(prev => [...prev, id]);
    }
  };

  const allClicked = clickedItems.length === bucketListItems.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Future Bucket List</h2>
        <p className="text-gray-600 mb-8">Adventures waiting for us! ✨</p>

        {/* Bucket List Items */}
        <div className="space-y-4 mb-8">
          {bucketListItems.map((item, index) => {
            const isClicked = clickedItems.includes(item.id);
            const Icon = item.icon;
            
            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`relative bg-white rounded-2xl p-4 shadow-lg cursor-pointer transition-all transform hover:scale-105 ${
                  isClicked ? 'scale-105 shadow-xl' : ''
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center transition-all duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  {isClicked && (
                    <div className="text-pink-500 animate-bounce">
                      💕
                    </div>
                  )}
                </div>

                {/* Sparkle effect */}
                {isClicked && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-xs">✨</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        {!allClicked && (
          <p className="text-gray-500 text-sm mb-6">
            Tap each adventure to add it to our future plans! 💫
          </p>
        )}

        {/* Completion Message */}
        {allClicked && (
          <div className="animate-fade-in-up">
            <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-6 shadow-lg mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Adventure List Complete! 🎉</h3>
              <p className="text-gray-700 font-dancing text-lg">
                "So many beautiful moments waiting for us! Every adventure will be perfect because you'll be there with me. 💙"
              </p>
            </div>
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-blue-400 to-pink-400 hover:from-blue-500 hover:to-pink-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 w-full"
            >
              Can't wait for these! →
            </button>
          </div>
        )}

        {/* Progress */}
        <div className="flex justify-center space-x-2">
          <span className="text-sm text-gray-500">
            {clickedItems.length} of {bucketListItems.length} dreams selected
          </span>
        </div>
      </div>
    </div>
  );
};

export default BucketList;