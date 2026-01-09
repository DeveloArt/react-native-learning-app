
export interface Topic {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
}

export interface UserStats {
  totalWords: number;
  studyDays: number;
  streak: number;
  weeklyMinutes: number;
  goalProgress: number;
}

export interface MasteredWord {
  id: string;
  word: string;
  translation: string;
  type: 'Sustantivo' | 'Verbo' | 'Adjetivo';
}

export interface Flashcard {
  id: string;
  spanish: string;
  english: string;
  polish: string;
  type: string;
  example: string;
}
