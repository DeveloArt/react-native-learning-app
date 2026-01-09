
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Pronunciation: React.FC = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setShowResult(true);
    } else {
      setIsRecording(true);
      setShowResult(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background-light dark:bg-background-dark max-w-[480px] mx-auto overflow-x-hidden pb-10">
      <header className="flex items-center p-4 pb-2 justify-between">
        <button onClick={() => navigate('/')} className="size-12 flex items-center justify-start">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-12">Practice Pronunciation</h2>
      </header>

      <div className="px-6 py-2">
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-[48px] font-bold px-4 text-center">Gracias</h1>
          <button className="bg-primary/10 p-2 rounded-full text-primary">
            <span className="material-symbols-outlined">volume_up</span>
          </button>
        </div>
        <h2 className="text-slate-500 text-xl font-medium pt-2">Thank you</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-12">
        <div className="relative flex items-center justify-center">
          {isRecording && (
            <>
              <div className="absolute w-40 h-40 bg-primary/20 rounded-full animate-ping"></div>
              <div className="absolute w-48 h-48 bg-primary/10 rounded-full animate-pulse"></div>
            </>
          )}
          <div className="flex px-4 py-3 justify-center relative z-10">
            <button 
              onClick={toggleRecording}
              className={`flex size-24 items-center justify-center rounded-full text-white shadow-lg transition-all active:scale-95
                ${isRecording ? 'bg-red-500 shadow-red-500/30' : 'bg-primary shadow-primary/30'}
              `}
            >
              <span className="material-symbols-outlined text-[40px]">{isRecording ? 'stop' : 'mic'}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center h-12 mt-8 gap-1">
          {[4, 8, 10, 6, 12, 9, 11, 5, 7].map((h, i) => (
            <div 
              key={i} 
              className={`w-1 bg-primary rounded-full transition-all duration-300 ${isRecording ? 'animate-bounce' : 'opacity-30'}`} 
              style={{ height: isRecording ? `${h * 4}px` : '4px', animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <p className="text-slate-500 text-base font-normal pt-4">
          {isRecording ? "Listening..." : "Tap to speak"}
        </p>
      </div>

      {showResult && (
        <div className="mx-6 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
              <span className="text-slate-400 text-xs uppercase tracking-widest font-bold">Accuracy</span>
              <span className="text-3xl font-bold text-primary">92%</span>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-600 px-4 py-2 rounded-full flex items-center gap-2">
              <span className="material-symbols-outlined text-lg font-bold">check_circle</span>
              <span className="font-bold">Correct!</span>
            </div>
          </div>
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>
      )}

      <div className="px-6 pt-8 pb-4 flex flex-col gap-3">
        <button 
          onClick={() => navigate('/progress')}
          className="flex w-full items-center justify-center rounded-xl h-14 bg-primary text-white text-lg font-bold shadow-md active:scale-95 transition-transform"
        >
          <span>Continue</span>
          <span className="material-symbols-outlined ml-2">arrow_forward</span>
        </button>
        <button 
          onClick={() => setShowResult(false)}
          className="flex w-full items-center justify-center rounded-xl h-14 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-base font-bold active:bg-slate-50"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default Pronunciation;
