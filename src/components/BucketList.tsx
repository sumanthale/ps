import React, { useState, useEffect } from 'react';
import { MapPin, Coffee, Camera, Utensils, Plane, Star } from 'lucide-react';

interface BucketListProps {
  onNext: () => void;
}

const BucketList: React.FC<BucketListProps> = ({ onNext }) => {
  const [clickedItems, setClickedItems] = useState<number[]>([]);

  const STORAGE_KEY = 'bucketListSelections';

  const bucketListItems = [
    { id: 1, icon: MapPin, title: "Late-night Walk", description: "Wander under the stars 🌙", color: "bg-indigo-100 text-indigo-600" },
    { id: 2, icon: Plane, title: "Spontaneous Road Trip", description: "Pick a spot and go! 🚗💨", color: "bg-green-100 text-green-600" },
    { id: 3, icon: Coffee, title: "Make Coffee Dates", description: "Discover the city's best latte ☕️", color: "bg-yellow-100 text-yellow-600" },
    { id: 4, icon: Star, title: "Stargaze & Dream", description: "Find constellations & make wishes ✨", color: "bg-purple-100 text-purple-600" },
    { id: 5, icon: Camera, title: "Photo Booth Fun", description: "Capture goofy & cute memories 📸", color: "bg-pink-100 text-pink-600" },
    { id: 6, icon: Utensils, title: "Cook Together", description: "Make each other's favorite meal 🍝", color: "bg-red-100 text-red-600" },
    { id: 8, icon: Coffee, title: "Bookstore Date", description: "Pick books for each other 📚", color: "bg-amber-100 text-amber-600" },
    { id: 9, icon: Star, title: "Build a Blanket Fort", description: "Snuggle & watch movies 🛌🎬", color: "bg-purple-100 text-purple-600" },
    { id: 10, icon: Camera, title: "Karaoke Night", description: "Sing your hearts out 🎤", color: "bg-pink-100 text-pink-600" },
    { id: 11, icon: Plane, title: "Picnic at Sunrise", description: "Coffee & pancakes at dawn ☀️", color: "bg-green-100 text-green-600" },
    { id: 12, icon: Utensils, title: "Ice Cream Crawl", description: "Taste test the sweetest scoops 🍦", color: "bg-red-100 text-red-600" },
    { id: 13, icon: MapPin, title: "Secret Notes Exchange", description: "Hide little love notes 💌", color: "bg-blue-100 text-blue-600" },
    { id: 14, icon: Coffee, title: "Attend a Workshop", description: "Pottery, painting or dance 🎨💃", color: "bg-amber-100 text-amber-600" },
    { id: 15, icon: Star, title: "Make a Time Capsule", description: "Open it a year from now ⏳", color: "bg-purple-100 text-purple-600" },
  ];

  // Load selections from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setClickedItems(JSON.parse(stored));
    }
  }, []);

  // Save selections to localStorage
  useEffect(() => {
    if(clickedItems.length === 0) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clickedItems));
  }, [clickedItems]);

  const handleItemClick = (id: number) => {
    setClickedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const canContinue = clickedItems.length >= 5;
  const allClicked = clickedItems.length === bucketListItems.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-pink-50 via-rose-50 to-blue-50">
      <div className="max-w-md w-full text-center">

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
          Our Dreamy Bucket List 💖
        </h2>
        <p className="text-gray-600 italic text-sm sm:text-base mb-5">
          "Every adventure will be magical, because you'll be with me."
        </p>

        <div className="space-y-3 mb-5">
          {bucketListItems.map((item, index) => {
            const isClicked = clickedItems.includes(item.id);
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`relative bg-white rounded-xl p-3 shadow-md cursor-pointer transform transition-all hover:scale-102 ${
                  isClicked ? 'shadow-pink-200 ring-2 ring-pink-300' : ''
                }`}
                style={{
                  animation: `fadeIn 0.3s ease ${index * 0.04}s both`
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                  </div>
                  {isClicked && <span className="text-pink-500 text-lg animate-bounce">💕</span>}
                </div>
              </div>
            );
          })}
        </div>

        {!canContinue && (
          <p className="text-gray-500 text-xs sm:text-sm mb-4">
            Select at least <span className="font-semibold">5 adventures</span> to continue 🌸
          </p>
        )}

        {canContinue && !allClicked && (
          <button
            onClick={onNext}
            className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all transform hover:scale-105 mb-3"
          >
            Continue → 💌
          </button>
        )}

        {allClicked && (
          <div className="animate-fade-in-up">
            <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-4 shadow-md mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Adventure List Complete! 🎉</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                "So many beautiful moments waiting for us! And we can keep adding more anytime 💖"
              </p>
            </div>
            <button
              onClick={onNext}
              className="w-full bg-gradient-to-r from-blue-400 to-pink-400 hover:from-blue-500 hover:to-pink-500 text-white px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all transform hover:scale-105"
            >
              Can't wait for these! →
            </button>
          </div>
        )}

        <div className="mt-2">
          <span className="text-xs sm:text-sm text-gray-500">
            {clickedItems.length} of {bucketListItems.length} adventures selected
          </span>
        </div>
      </div>
    </div>
  );
};

export default BucketList;
