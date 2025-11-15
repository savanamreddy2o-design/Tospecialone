
import React, { useState, useEffect, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import { generateBirthdayMessage } from './services/geminiService';

const App: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [birthdayMessage, setBirthdayMessage] = useState<string>('');
  const [isLoadingMessage, setIsLoadingMessage] = useState(true);

  const fetchMessage = useCallback(async () => {
    setIsLoadingMessage(true);
    try {
      const message = await generateBirthdayMessage();
      setBirthdayMessage(message);
    } catch (error) {
      console.error("Failed to fetch birthday message:", error);
      setBirthdayMessage("Hey Samhithaaaa, another year has passed, and it's time to celebrate YOU! 🎉 As we celebrate, I want you to know that you've grown in ways I admire. You've faced challenges with grace, and I couldn't be prouder of everything you’ve accomplished. Here’s to new adventures, laughter, and love in this next chapter. Happy Birthday, my love! 💜💫");
    } finally {
      setIsLoadingMessage(false);
    }
  }, []);

  useEffect(() => {
    if (unlocked) {
      fetchMessage();
    }
  }, [unlocked, fetchMessage]);

  const handleUnlock = () => {
    setUnlocked(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {!unlocked ? (
        <LoginPage onUnlock={handleUnlock} />
      ) : (
        <MainPage birthdayMessage={birthdayMessage} isLoading={isLoadingMessage} />
      )}
    </div>
  );
};

export default App;
