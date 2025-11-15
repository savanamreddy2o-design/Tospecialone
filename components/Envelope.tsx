
import React, { useState } from 'react';

const Envelope: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center perspective-1000">
      <h2 className="text-3xl font-bold text-purple-800 mb-4 font-serif">A Letter for You</h2>
      <div
        className={`relative w-80 h-52 cursor-pointer transition-transform duration-700 ${isOpen ? 'transform -translate-y-16' : ''}`}
        onClick={toggleEnvelope}
      >
        <div className="absolute w-full h-full bg-pink-300 rounded-lg shadow-2xl"></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-32 h-32 bg-pink-400 rounded-full flex items-center justify-center">
             <span className="text-4xl">💌</span>
          </div>
        </div>
        <div 
          className={`absolute top-0 left-0 w-full h-26 bg-pink-400 origin-top transition-transform duration-700 ease-in-out rounded-t-lg ${isOpen ? 'transform rotate-x-180' : ''}`}
          style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
        >
          <div className="absolute inset-0 bg-pink-300"></div>
        </div>

        <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-auto bg-white rounded-lg shadow-xl p-6 transition-all duration-700 ease-in-out ${isOpen ? 'opacity-100 transform -translate-y-16' : 'opacity-0 transform -translate-y-4'}`}>
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-contain bg-no-repeat" style={{backgroundImage: "url('https://picsum.photos/id/1060/100/100?blur=1')"}}></div>
           <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-contain bg-no-repeat" style={{backgroundImage: "url('https://picsum.photos/id/1060/100/100?blur=1')"}}></div>
          <h3 className="text-xl font-bold text-pink-600 mb-2">Happy Birthday Samhithaaaa! 🎉</h3>
          <p className="text-gray-700">
            You’ve been an incredible person, full of strength and grace, and I’m blessed to have you in my life. This year will be your year, filled with happiness and love. Let’s make this year unforgettable. 💜🎂
          </p>
        </div>
      </div>
    </div>
  );
};

export default Envelope;
