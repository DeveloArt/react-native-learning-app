
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDailyTip } from '../services/geminiService';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [tip, setTip] = useState<string>("Consistency is key to mastering Spanish!");

  useEffect(() => {
    getDailyTip().then(setTip);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Top Bar */}
      <header className="flex items-center p-4 justify-between sticky top-0 z-10 bg-background-light dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex size-12 shrink-0 items-center">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDAsikV3g9uckfMY8qngscAVNoQNs5RbEjsl7rVBgne5ieyd3m9QTDmomCHla5prCSE4roZr2KtKCcE7ML9lAbgfXLfquiN-stn7sjrGTnFYXdyi-xytpF232aGLB-daJss_IUTMhodcVTO53oa86VUjXeancitFQ_x_PzrvzAXt45a8U6PJnQqgO2nlm0X_104aFEc05El-yGyB1ox9XIYCmr9riyX9QuGA-iSUpVuMunxMKnnwU8TvZZkAt2_0nOz0O3eLvhdCLI")' }}
          />
        </div>
        <h2 className="text-lg font-bold flex-1 px-3">¡Hola!</h2>
        <button className="flex size-12 items-center justify-end">
          <span className="material-symbols-outlined text-[28px]">notifications</span>
        </button>
      </header>

      {/* Greeting */}
      <section className="px-4 pt-4">
        <h1 className="text-[32px] font-bold leading-tight">¡Hola, Alex!</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Ready for your Spanish lesson today?</p>
      </section>

      {/* Streak Card */}
      <section className="p-4">
        <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-slate-800 p-5 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex flex-[1.5] flex-col justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-orange-500 fill-1">local_fire_department</span>
                <p className="text-xl font-bold">7 Day Streak</p>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{tip}</p>
            </div>
            <button 
              onClick={() => navigate('/topics')}
              className="flex items-center justify-center rounded-full h-10 px-6 bg-primary text-white text-sm font-semibold shadow-md shadow-primary/20 active:scale-95 transition-all w-fit"
            >
              Practice Now
            </button>
          </div>
          <div 
            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex-1 max-w-[120px]" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDZmrpnpMa9OHYHM7tJcYZffApQoCvXM5d_pFgA-zrD2EPIT7o_1dRW0QRudSxBWhmXrrY8V4_M8WfLkxIizG1JrJMPJxht_OEHZf0R7o2MaRaZeFiIyofx-4UvHwcjaPz793kmi1olB4zOA3ZXNqpe4chpSA4EI2JqrDH5atcgULo6G-YoBEpqf_c9f9BBWTOdtzdGYDQqZakPnzfJD0POTt_kqceoqaoZqvQcDoyHhq9kBRm6xVitP2O3mJdF1Fq5XgqRB99u_sg")' }}
          />
        </div>
      </section>

      {/* Quick Practice Grid */}
      <section className="px-4 pb-2 pt-4">
        <h3 className="text-lg font-bold">Quick Practice</h3>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <button 
            onClick={() => navigate('/lesson/flashcards')}
            className="flex flex-col gap-3 rounded-2xl bg-white dark:bg-slate-800 p-4 items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 aspect-square active:scale-95 transition-transform"
          >
            <div className="bg-primary/10 rounded-full p-3 text-primary">
              <span className="material-symbols-outlined text-[32px]">style</span>
            </div>
            <h2 className="text-xs font-bold">Flashcards</h2>
          </button>
          <button 
            onClick={() => navigate('/lesson/sentence')}
            className="flex flex-col gap-3 rounded-2xl bg-white dark:bg-slate-800 p-4 items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 aspect-square active:scale-95 transition-transform"
          >
            <div className="bg-primary/10 rounded-full p-3 text-primary">
              <span className="material-symbols-outlined text-[32px]">architecture</span>
            </div>
            <h2 className="text-xs font-bold">Builder</h2>
          </button>
          <button 
            onClick={() => navigate('/lesson/pronunciation')}
            className="flex flex-col gap-3 rounded-2xl bg-white dark:bg-slate-800 p-4 items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 aspect-square active:scale-95 transition-transform"
          >
            <div className="bg-primary/10 rounded-full p-3 text-primary">
              <span className="material-symbols-outlined text-[32px]">record_voice_over</span>
            </div>
            <h2 className="text-xs font-bold">Speaking</h2>
          </button>
        </div>
      </section>

      {/* Progress Bars */}
      <section className="px-4 pb-2 pt-4">
        <h3 className="text-lg font-bold">Your Progress</h3>
        <div className="flex flex-col gap-4 mt-3">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold">Words Learned</span>
              <span className="text-xs font-medium text-slate-500">450 / 1000</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold">Daily Goal</span>
              <span className="text-xs font-medium text-primary">80%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '80%' }}></div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 italic">Almost there! Just 5 more minutes to reach your goal.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
