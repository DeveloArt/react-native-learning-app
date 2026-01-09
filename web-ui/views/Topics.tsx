
import React from 'react';
import { Topic } from '../types';

const TOPICS: Topic[] = [
  { id: '1', name: 'Cuisine', icon: 'restaurant', color: 'orange', progress: 45 },
  { id: '2', name: 'Travel', icon: 'flight_takeoff', color: 'blue', progress: 12 },
  { id: '3', name: 'Work', icon: 'work', color: 'purple', progress: 80 },
  { id: '4', name: 'Nature', icon: 'eco', color: 'emerald', progress: 5 },
  { id: '5', name: 'Education', icon: 'school', color: 'rose', progress: 0 },
  { id: '6', name: 'Shopping', icon: 'shopping_bag', color: 'amber', progress: 35 },
];

const Topics: React.FC = () => {
  return (
    <div className="flex flex-col">
      <header className="flex items-center p-6 pb-2 justify-between sticky top-0 z-10 bg-background-light dark:bg-background-dark/80 backdrop-blur-md">
        <button className="text-primary flex size-10 items-center justify-center rounded-full bg-primary/10">
          <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-xl font-bold flex-1 text-center pr-10">Choose a Topic</h2>
      </header>

      <div className="px-6 pt-4">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-widest">Aprende español</p>
        <h1 className="text-3xl font-bold mt-1">¡Hola!</h1>
      </div>

      <main className="px-4 py-6 grid grid-cols-2 gap-4">
        {TOPICS.map((topic) => (
          <div 
            key={topic.id}
            className={`flex flex-col gap-3 p-4 rounded-xl border shadow-sm transition-all active:scale-95 cursor-pointer
              ${topic.color === 'orange' ? 'bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900/30' : ''}
              ${topic.color === 'blue' ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30' : ''}
              ${topic.color === 'purple' ? 'bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/30' : ''}
              ${topic.color === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30' : ''}
              ${topic.color === 'rose' ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30' : ''}
              ${topic.color === 'amber' ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30' : ''}
            `}
          >
            <div className={`w-full aspect-square rounded-xl flex items-center justify-center
               ${topic.color === 'orange' ? 'bg-orange-100 text-orange-500' : ''}
               ${topic.color === 'blue' ? 'bg-blue-100 text-blue-500' : ''}
               ${topic.color === 'purple' ? 'bg-purple-100 text-purple-500' : ''}
               ${topic.color === 'emerald' ? 'bg-emerald-100 text-emerald-500' : ''}
               ${topic.color === 'rose' ? 'bg-rose-100 text-rose-500' : ''}
               ${topic.color === 'amber' ? 'bg-amber-100 text-amber-500' : ''}
            `}>
              <span className="material-symbols-outlined text-5xl fill-1">{topic.icon}</span>
            </div>
            <div>
              <p className="text-base font-bold">{topic.name}</p>
              <div className="mt-2 w-full bg-slate-200/50 dark:bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000
                    ${topic.color === 'orange' ? 'bg-orange-500' : ''}
                    ${topic.color === 'blue' ? 'bg-blue-500' : ''}
                    ${topic.color === 'purple' ? 'bg-purple-500' : ''}
                    ${topic.color === 'emerald' ? 'bg-emerald-500' : ''}
                    ${topic.color === 'rose' ? 'bg-rose-500' : ''}
                    ${topic.color === 'amber' ? 'bg-amber-500' : ''}
                  `} 
                  style={{ width: `${topic.progress}%` }}
                />
              </div>
              <p className="text-slate-400 text-xs font-semibold mt-2">{topic.progress}% complete</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Topics;
