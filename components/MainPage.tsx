
import React, { useState, useEffect } from 'react';
import Envelope from './Envelope';
import Hearts from './Hearts';
import Gifts from './Gifts';

interface MainPageProps {
  birthdayMessage: string;
  isLoading: boolean;
}

const EmojisBackground: React.FC = () => {
    const emojis = ['💜', '🎂', '🎉', '💖', '✨'];
    const particles = Array.from({ length: 40 });
  
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        {particles.map((_, i) => {
          const style = {
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 15 + 10}s`,
            animationDelay: `${Math.random() * 10}s`,
            fontSize: `${Math.random() * 1.5 + 0.5}rem`,
            opacity: Math.random() * 0.5 + 0.3,
          };
          return (
            <div key={i} className="particle" style={style}>
              {emojis[i % emojis.length]}
            </div>
          );
        })}
      </div>
    );
};


const MainPage: React.FC<MainPageProps> = ({ birthdayMessage, isLoading }) => {
  const [allHeartsClicked, setAllHeartsClicked] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-purple-300 via-fuchsia-200 to-indigo-300 text-gray-800 p-4 sm:p-8 flex flex-col items-center">
      <EmojisBackground />
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-12 text-center">
        <header className="bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          {isLoading ? (
             <div className="animate-pulse space-y-3">
                <div className="h-8 bg-purple-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-purple-200 rounded w-full mx-auto"></div>
                <div className="h-4 bg-purple-200 rounded w-5/6 mx-auto"></div>
             </div>
          ) : (
            <p className="text-xl md:text-2xl font-serif text-purple-900">
              {birthdayMessage}
            </p>
          )}
        </header>

        <main className="space-y-12">
          <Envelope />
          <Hearts onAllHeartsClicked={() => setAllHeartsClicked(true)} />
          {allHeartsClicked && <Gifts />}
        </main>
      </div>
    </div>
  );
};

export default MainPage;
