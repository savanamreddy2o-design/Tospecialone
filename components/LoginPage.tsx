
import React, { useState, useEffect } from 'react';
import { HeartIcon } from './icons/HeartIcon';

interface LoginPageProps {
  onUnlock: () => void;
}

const Background: React.FC = () => {
  const particles = Array.from({ length: 30 });
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900">
      {particles.map((_, i) => {
        const style = {
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 10 + 5}s`,
          animationDelay: `${Math.random() * 5}s`,
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
          backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.2})`,
        };
        return <div key={i} className="particle" style={style}></div>;
      })}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>
  );
};

const LoginPage: React.FC<LoginPageProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [unlocking, setUnlocking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1401') {
      setError('');
      setUnlocking(true);
      setTimeout(onUnlock, 2000);
    } else {
      setError('A special date holds the key...');
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Background />
      <div className="relative z-10 text-center text-white p-8">
        {!unlocking ? (
          <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 shadow-2xl transition-all duration-500">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'cursive' }}>
              A Magical Birthday
            </h1>
            <p className="text-lg mb-6 text-purple-200">Enter the secret code to unlock the magic.</p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****"
                className="bg-purple-900/50 border-2 border-purple-400 text-white text-center text-2xl tracking-[1rem] w-48 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                maxLength={4}
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-transform duration-300 hover:scale-105"
              >
                Unlock
              </button>
            </form>
            {error && <p className="text-red-400 mt-4">{error}</p>}
          </div>
        ) : (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 w-64 h-64 portal">
              <HeartIcon className="w-full h-full text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold animate-pulse" style={{ fontFamily: 'cursive' }}>
              Entering a world of memories...
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
