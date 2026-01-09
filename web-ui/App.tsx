
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import Topics from './views/Topics';
import Progress from './views/Progress';
import Profile from './views/Profile';
import Flashcards from './views/Flashcards';
import SentenceBuilder from './views/SentenceBuilder';
import Pronunciation from './views/Pronunciation';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="topics" element={<Topics />} />
          <Route path="progress" element={<Progress />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        {/* Lesson Views (No Bottom Nav) */}
        <Route path="/lesson/flashcards" element={<Flashcards />} />
        <Route path="/lesson/sentence" element={<SentenceBuilder />} />
        <Route path="/lesson/pronunciation" element={<Pronunciation />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
