
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const WEEK_DATA = [
  { day: 'L', mins: 45, opacity: 0.4 },
  { day: 'M', mins: 60, opacity: 0.6 },
  { day: 'M', mins: 30, opacity: 0.3 },
  { day: 'J', mins: 85, opacity: 1 },
  { day: 'V', mins: 70, opacity: 0.8 },
  { day: 'S', mins: 20, opacity: 0.2 },
  { day: 'D', mins: 75, opacity: 0.9 },
];

const MASTERED = [
  { id: '1', word: 'Biblioteca', translation: 'Library', type: 'Sustantivo' },
  { id: '2', word: 'Desayuno', translation: 'Breakfast', type: 'Sustantivo' },
  { id: '3', word: 'Caminar', translation: 'To walk', type: 'Verbo' },
];

const Progress: React.FC = () => {
  return (
    <div className="flex flex-col">
      <nav className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold">Progreso de Aprendizaje</h1>
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
          <span className="material-symbols-outlined text-2xl">share</span>
        </button>
      </nav>

      <main className="p-4 space-y-4">
        {/* Branding */}
        <div className="px-2 flex items-center gap-2">
          <div className="bg-primary size-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-primary/30">¡H!</div>
          <span className="font-bold text-primary">¡Hola! App</span>
        </div>

        {/* Summary Stats */}
        <section className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2 rounded-xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm col-span-2">
            <div className="flex justify-between items-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Palabras Totales</p>
              <span className="material-symbols-outlined text-primary">menu_book</span>
            </div>
            <p className="text-3xl font-bold">450</p>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-[10px] text-slate-400">Objetivo: 1000 palabras</p>
          </div>
          
          <div className="flex flex-col gap-2 rounded-xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Días de Estudio</p>
            <p className="text-2xl font-bold">24</p>
            <span className="material-symbols-outlined text-orange-400 text-xl">calendar_today</span>
          </div>
          
          <div className="flex flex-col gap-2 rounded-xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Racha Actual</p>
            <p className="text-2xl font-bold">7 días</p>
            <span className="material-symbols-outlined text-red-500 text-xl fill-1">local_fire_department</span>
          </div>
        </section>

        {/* Activity Chart */}
        <section className="rounded-xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold">Actividad Semanal</h3>
              <p className="text-xs text-slate-500">Minutos de estudio por día</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-primary">120 min</p>
              <p className="text-[10px] font-bold text-green-500 flex items-center justify-end gap-1">
                <span className="material-symbols-outlined text-[12px]">trending_up</span> +15%
              </p>
            </div>
          </div>
          
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEK_DATA}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                <Bar dataKey="mins" radius={[10, 10, 10, 10]}>
                  {WEEK_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#2b8cee" fillOpacity={entry.opacity} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Mastered Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Recién Dominadas</h3>
            <button className="text-sm font-semibold text-primary">Ver todas</button>
          </div>
          <div className="space-y-3">
            {MASTERED.map((word) => (
              <div key={word.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-600 size-10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">verified</span>
                  </div>
                  <div>
                    <p className="font-bold text-base">{word.word}</p>
                    <p className="text-xs text-slate-500">{word.translation}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-500">{word.type}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <button className="w-full bg-primary text-white font-bold py-4 rounded-full shadow-lg shadow-primary/40 flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all">
          <span>Continuar Aprendiendo</span>
          <span className="material-symbols-outlined">play_circle</span>
        </button>
      </main>
    </div>
  );
};

export default Progress;
