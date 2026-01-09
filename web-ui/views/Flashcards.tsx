
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { explainWord } from '../services/geminiService';

const CARDS = [
  { id: '1', spanish: 'La Manzana', english: 'Apple', polish: 'Jabłko', type: 'Noun, feminine', example: 'Me gusta comer una manzana roja.' },
  { id: '2', spanish: 'El Libro', english: 'Book', polish: 'Książka', type: 'Noun, masculine', example: 'Leo un libro interesante.' },
  { id: '3', spanish: 'Comer', english: 'To eat', polish: 'Jeść', type: 'Verb', example: 'Quiero comer pizza hoy.' },
];

const Flashcards: React.FC = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  
  const currentCard = CARDS[index];

  const handleNext = () => {
    if (index < CARDS.length - 1) {
      setIndex(index + 1);
      setExplanation(null);
    } else {
      navigate('/progress');
    }
  };

  const askAi = async () => {
    setLoadingAi(true);
    const exp = await explainWord(currentCard.spanish);
    setExplanation(exp);
    setLoadingAi(false);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background-light dark:bg-background-dark max-w-[480px] mx-auto">
      {/* Top Bar */}
      <div className="flex items-center p-4 pb-2 justify-between">
        <button onClick={() => navigate('/')} className="size-12 flex items-center justify-start">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-12">Vocabulary: Basics 1</h2>
      </div>

      {/* Progress */}
      <div className="p-4 pt-0">
        <div className="flex justify-between items-center mb-1">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Session Progress</p>
          <p className="text-sm font-bold">{index + 1} / {CARDS.length}</p>
        </div>
        <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2.5 overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${((index + 1) / CARDS.length) * 100}%` }}></div>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col justify-center px-4 py-4">
        <div className="flex flex-col items-center justify-between rounded-xl shadow-xl bg-white dark:bg-slate-800 p-8 min-h-[420px] border border-slate-100 dark:border-slate-700 relative">
          <div className="flex flex-col items-center w-full gap-6">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-5xl fill-1">nutrition</span>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">{currentCard.spanish}</h1>
              <p className="text-slate-400 text-lg">{currentCard.type}</p>
            </div>
            <button className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-3xl fill-1">volume_up</span>
            </button>
          </div>
          
          <div className="w-full border-t border-dashed border-slate-200 dark:border-slate-700 my-8"></div>
          
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col items-center">
              <p className="text-xl font-semibold text-center">{currentCard.english} / {currentCard.polish}</p>
              <div className="h-1 w-8 bg-primary rounded-full mt-1"></div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-base italic leading-relaxed text-center px-4">
              "{currentCard.example}"
            </p>
          </div>

          <button 
            onClick={askAi}
            className="absolute top-4 right-4 text-slate-300 dark:text-slate-600 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">info</span>
          </button>
        </div>

        {/* AI Insight */}
        {loadingAi && <p className="text-center text-primary mt-4 text-sm animate-pulse">Consulting Gemini AI...</p>}
        {explanation && (
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl text-xs leading-relaxed">
            <span className="font-bold text-primary block mb-1">AI Explanation:</span>
            {explanation}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 flex gap-4 bg-background-light dark:bg-background-dark">
        <button 
          onClick={handleNext}
          className="flex-1 flex flex-col items-center justify-center gap-2 h-20 bg-red-500 text-white rounded-xl shadow-lg shadow-red-500/20 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
          <span className="text-xs font-bold uppercase tracking-widest">Unknown</span>
        </button>
        <button 
          onClick={handleNext}
          className="flex-1 flex flex-col items-center justify-center gap-2 h-20 bg-green-500 text-white rounded-xl shadow-lg shadow-green-500/20 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-2xl">check</span>
          <span className="text-xs font-bold uppercase tracking-widest">Known</span>
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
