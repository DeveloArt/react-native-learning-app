
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SentenceBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const pool = ["Yo", "beber", "agua", "quiero", "comida"];
  const correctOrder = ["Yo", "quiero", "beber", "agua"];

  const toggleWord = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const isCorrect = selectedWords.join(' ') === correctOrder.join(' ');

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark max-w-[480px] mx-auto">
      <header className="flex items-center p-4 pb-2 justify-between">
        <button onClick={() => navigate('/')} className="size-12 flex items-center justify-start">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="flex-1 flex flex-col gap-1 px-2">
          <p className="text-xs font-medium">Lesson 4 of 10</p>
          <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2.5 w-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '40%' }}></div>
          </div>
        </div>
        <button className="size-12 flex items-center justify-end">
          <span className="material-symbols-outlined">lightbulb</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col px-4 pt-8">
        <h3 className="text-2xl font-bold mb-6">Translate this sentence</h3>

        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-4xl">volume_up</span>
          </div>
          <div>
            <p className="text-xl font-medium">I want to drink water</p>
            <p className="text-slate-400 text-sm italic">Chcę pić wodę</p>
          </div>
        </div>

        <div className="flex flex-col min-h-[160px] justify-center items-center border-y-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-full flex flex-wrap gap-2 items-center justify-center py-8">
            {selectedWords.length === 0 ? (
              <p className="text-slate-400 text-sm font-normal text-center max-w-[200px]">
                Tap the words below to build the sentence
              </p>
            ) : (
              selectedWords.map((word, i) => (
                <button 
                  key={i}
                  onClick={() => toggleWord(word)}
                  className="px-5 py-3 rounded-xl border-2 border-primary bg-white dark:bg-slate-800 text-primary font-bold shadow-sm"
                >
                  {word}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="mt-auto pt-10 pb-32">
          <div className="flex flex-wrap justify-center gap-3">
            {pool.map((word, i) => (
              <button 
                key={i}
                disabled={selectedWords.includes(word)}
                onClick={() => toggleWord(word)}
                className={`px-5 py-3 rounded-xl border-2 transition-all active:scale-95
                  ${selectedWords.includes(word) 
                    ? 'border-slate-100 bg-slate-50 text-slate-300 dark:border-slate-800 dark:bg-slate-900' 
                    : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 font-medium shadow-sm hover:border-primary/50'
                  }
                `}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-[480px] mx-auto flex gap-3">
          <button className="flex-1 h-14 rounded-xl border-2 border-slate-200 dark:border-slate-800 font-bold uppercase tracking-wider text-sm active:bg-slate-100">
            Skip
          </button>
          <button 
            disabled={selectedWords.length === 0}
            onClick={() => isCorrect ? navigate('/progress') : alert('Try again!')}
            className={`flex-[2] h-14 rounded-xl font-bold uppercase tracking-wider text-sm shadow-lg transition-all
              ${selectedWords.length === 0 
                ? 'bg-slate-300 cursor-not-allowed' 
                : 'bg-primary text-white shadow-primary/20 hover:bg-primary/90'
              }
            `}
          >
            Check
          </button>
        </div>
        <div className="h-6"></div>
      </div>
    </div>
  );
};

export default SentenceBuilder;
