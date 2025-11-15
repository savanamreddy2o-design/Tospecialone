
import React, { useState, useEffect } from 'react';
import { HeartIcon } from './icons/HeartIcon';

interface HeartsProps {
  onAllHeartsClicked: () => void;
}

const Hearts: React.FC<HeartsProps> = ({ onAllHeartsClicked }) => {
  const totalHearts = 8;
  const [clickedHearts, setClickedHearts] = useState<boolean[]>(Array(totalHearts).fill(false));
  const [allClicked, setAllClicked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleHeartClick = (index: number) => {
    if (allClicked) return;
    const newClickedHearts = [...clickedHearts];
    newClickedHearts[index] = true;
    setClickedHearts(newClickedHearts);
  };

  useEffect(() => {
    const all = clickedHearts.every(Boolean);
    if (all && !allClicked) {
      setAllClicked(true);
      onAllHeartsClicked();
    }
  }, [clickedHearts, onAllHeartsClicked, allClicked]);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-6">
        <h2 className="text-3xl font-bold text-purple-800 font-serif">Unlock My Heart</h2>
        {showTooltip && !allClicked && (
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-max bg-black text-white text-sm rounded-md px-3 py-1 shadow-lg animate-pulse">
                Please take your time with each click.
             </div>
        )}
      </div>
      <div className="grid grid-cols-4 gap-4 md:gap-6">
        {clickedHearts.map((isClicked, index) => (
          <button
            key={index}
            onClick={() => handleHeartClick(index)}
            className={`transform transition-transform duration-300 hover:scale-110 ${isClicked ? 'animate-ping once' : ''}`}
            aria-label={`Heart ${index + 1}`}
          >
            <HeartIcon
              className={`w-16 h-16 md:w-20 md:h-20 transition-colors duration-500 ${isClicked ? 'text-red-500' : 'text-gray-400'}`}
            />
          </button>
        ))}
      </div>
      {allClicked && (
        <p className="mt-8 text-2xl font-bold text-pink-600 animate-bounce">
          You unlocked my heart, piece by piece! 💖
        </p>
      )}
    </div>
  );
};

export default Hearts;
