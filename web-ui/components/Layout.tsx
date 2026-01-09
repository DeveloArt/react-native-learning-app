
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark max-w-[480px] mx-auto shadow-2xl overflow-x-hidden">
      <main className="flex-1 overflow-y-auto pb-24">
        <Outlet />
      </main>

      {/* iOS Style Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-400'}`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}>home</span>
              <span className="text-[10px] font-bold">Home</span>
            </>
          )}
        </NavLink>

        <NavLink 
          to="/topics" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-400'}`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}>menu_book</span>
              <span className="text-[10px] font-bold">Lessons</span>
            </>
          )}
        </NavLink>

        <NavLink 
          to="/progress" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-400'}`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}>analytics</span>
              <span className="text-[10px] font-bold">Progress</span>
            </>
          )}
        </NavLink>

        <NavLink 
          to="/profile" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-400'}`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`material-symbols-outlined ${isActive ? 'fill-1' : ''}`}>person</span>
              <span className="text-[10px] font-bold">Profile</span>
            </>
          )}
        </NavLink>
      </nav>
    </div>
  );
};

export default Layout;
