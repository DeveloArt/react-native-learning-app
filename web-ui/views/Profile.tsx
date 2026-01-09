
import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col">
      <header className="flex items-center p-4 sticky top-0 z-50 bg-background-light dark:bg-background-dark/80 backdrop-blur-md">
        <button className="text-primary flex size-10 items-center justify-center rounded-full bg-primary/10">
          <span className="material-symbols-outlined !text-[20px]">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">Profile & Settings</h2>
      </header>

      <div className="flex-1 overflow-y-auto pb-10">
        <section className="flex p-6 flex-col items-center">
          <div className="flex items-center justify-center rounded-full size-32 bg-primary text-white text-4xl font-bold shadow-lg mb-4">
            AM
          </div>
          <p className="text-[24px] font-bold leading-tight">Alex Miller</p>
          <p className="text-slate-500 dark:text-blue-300 text-base font-medium">Spanish Learner • Level 12</p>
        </section>

        <section className="px-4">
          <h3 className="text-lg font-bold pb-3 pt-6">Preferences</h3>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex flex-col w-full">
              <p className="text-sm font-semibold text-slate-500 pb-2">App Language / Język aplikacji</p>
              <div className="relative">
                <select className="appearance-none w-full rounded-xl focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-14 px-4 pr-10 text-base font-normal">
                  <option value="en">🇬🇧 English</option>
                  <option defaultValue="pl">🇵🇱 Polski</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none">unfold_more</span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4">
          <h3 className="text-lg font-bold pb-3 pt-8">Learning Settings</h3>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-base font-medium">TTS Speed / Prędkość lektora</p>
                <span className="text-primary font-bold">1.0x</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-slate-400">egg</span>
                <input className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" max="2.0" min="0.5" step="0.1" type="range" defaultValue="1.0"/>
                <span className="material-symbols-outlined text-slate-400">hive</span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4">
          <h3 className="text-lg font-bold pb-3 pt-8">Legal & Support</h3>
          <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
            {['Privacy Policy', 'Terms of Service', 'Help Center'].map((item) => (
              <a key={item} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">{item === 'Privacy Policy' ? 'policy' : item === 'Terms of Service' ? 'description' : 'help_center'}</span>
                  <span className="text-base font-medium">{item}</span>
                </div>
                <span className="material-symbols-outlined text-slate-400 !text-lg">chevron_right</span>
              </a>
            ))}
          </div>
        </section>

        <div className="px-4 mt-12 pb-12">
          <button className="w-full py-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold text-lg hover:bg-red-100 active:scale-95 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
          <p className="text-center text-slate-400 text-xs mt-6">¡Hola! v2.4.0 — Made for Language Lovers</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
