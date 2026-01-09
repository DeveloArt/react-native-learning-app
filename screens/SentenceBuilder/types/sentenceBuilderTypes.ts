export interface Sentence {
  id: string;
  source: string;
  translation: string;
  targetWords: string[];
  distractorWords: string[];
  correctOrder: string[];
}

export interface WordChip {
  id: string;
  text: string;
  isSelected: boolean;
}

export interface SentenceBuilderState {
  currentSentenceIndex: number;
  selectedWords: string[];
  showFeedback: 'correct' | 'incorrect' | null;
  lessonProgress: number;
  isCompleted: boolean;
}
