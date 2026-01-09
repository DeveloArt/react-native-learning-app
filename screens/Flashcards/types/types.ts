export interface FlashcardProps {
  frontLanguageLabel: string;
  frontText: string;
  backLanguageLabel: string;
  backText: string;
  examples?: ExampleSentence[];
  cloze?: boolean;
  largeText?: boolean;
}

export interface FlashcardButtonsProps {
  onUnknown?: () => void;
  onKnown?: () => void;
}

export interface ExampleSentence {
  sentence: string;
  translationEn: string;
  translationPl: string;
}
