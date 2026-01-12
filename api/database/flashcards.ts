import data from './data.json';

export type ExampleSentence = {
  sentence: string; // Spanish
  translationEn: string;
  translationPl: string;
};

export type WordEntry = {
  id: string;
  word: string; // L2 Spanish
  translationEn: string; // L1 English
  translationPl: string; // L1 Polish
  examples: ExampleSentence[];
  category?: string; // optional category key from data.json
};

type JsonEntry = WordEntry & { category?: string };

export const spanishFlashcards: WordEntry[] = (data as JsonEntry[]).map(
  ({ id, word, translationEn, translationPl, examples, category }) => ({
    id,
    word,
    translationEn,
    translationPl,
    examples,
    category,
  }),
);

export type StudyCard = {
  id: string;
  frontLanguageLabel: string;
  frontText: string; // word (L2)
  backLanguageLabel: string; // default label; UI may override dynamically
  backTextEn: string;
  backTextPl: string;
  examples: ExampleSentence[];
};

export function mapToStudyCards(entries: WordEntry[]): StudyCard[] {
  return entries.map((e) => ({
    id: e.id,
    frontLanguageLabel: 'Spanish',
    frontText: e.word,
    backLanguageLabel: 'English',
    backTextEn: e.translationEn,
    backTextPl: e.translationPl,
    examples: e.examples,
  }));
}
