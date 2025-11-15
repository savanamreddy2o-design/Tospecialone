
import React, { useState } from 'react';
import { generateGiftImage } from '../services/geminiService';
import { GiftIcon } from './icons/GiftIcon';
import Modal from './ui/Modal';
import { GIFT_PROMPT_1, GIFT_PROMPT_2 } from '../constants';

const Gifts: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGiftClick = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const imageUrl = await generateGiftImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (e) {
      console.error(e);
      setError('A little magic is needed to open this. Please try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setGeneratedImage(null);
    setError(null);
  }

  return (
    <div className="flex flex-col items-center mt-12">
      <h2 className="text-3xl font-bold text-purple-800 mb-6 font-serif animate-fade-in">Two Gifts, Just for You</h2>
      <div className="flex flex-col sm:flex-row gap-8 md:gap-12">
        <div onClick={() => handleGiftClick(GIFT_PROMPT_1)} className="cursor-pointer group">
          <GiftIcon className="w-32 h-32 md:w-40 md:h-40 text-purple-600 group-hover:text-purple-700 transition-all duration-300 transform group-hover:scale-110" />
          <p className="text-center font-semibold mt-2">Open Gift 1</p>
        </div>
        <div onClick={() => handleGiftClick(GIFT_PROMPT_2)} className="cursor-pointer group">
          <GiftIcon className="w-32 h-32 md:w-40 md:h-40 text-pink-500 group-hover:text-pink-600 transition-all duration-300 transform group-hover:scale-110" />
          <p className="text-center font-semibold mt-2">Open Gift 2</p>
        </div>
      </div>
      
      {(isLoading || generatedImage || error) && (
        <Modal onClose={closeModal}>
          {isLoading && (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500 mx-auto mb-4"></div>
              <p className="text-lg font-semibold text-purple-800">Wrapping your gift with magic...</p>
              <p className="text-sm text-gray-600 mt-2">This can take a moment.</p>
            </div>
          )}
          {error && (
            <div className="text-center">
              <p className="text-lg font-semibold text-red-600">Oh no!</p>
              <p>{error}</p>
            </div>
          )}
          {generatedImage && (
             <img src={generatedImage} alt="AI Generated Gift" className="rounded-lg shadow-2xl max-w-full max-h-[80vh]"/>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Gifts;
