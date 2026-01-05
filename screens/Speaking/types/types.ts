export interface SpeakingProgress {
  current: number;
  total: number;
}

export interface SpeakingWord {
  id: string;
  word: string;
  translationEn: string;
  translationPl: string;
}
