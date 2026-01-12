import { StudyCard } from '@/api/database/flashcards';

export type FlashcardsState = {
  pickerOpen: boolean;
  selectedCategory: string | null;
  deck: StudyCard[];
  index: number;
  incorrectQueue: number[];
  knownIds: Set<string>;
};

export type FlashcardsAction =
  | { type: 'TOGGLE_PICKER' }
  | { type: 'SET_CATEGORY'; category: string | null }
  | { type: 'SET_DECK'; deck: StudyCard[] }
  | { type: 'GO_NEXT' }
  | { type: 'HANDLE_UNKNOWN' }
  | { type: 'HANDLE_KNOWN'; cardId: string }
  | { type: 'RESHUFFLE_DECK'; category: string | null }
  | { type: 'RESET_DECK' };

export const initialFlashcardsState: FlashcardsState = {
  pickerOpen: false,
  selectedCategory: null,
  deck: [],
  index: 0,
  incorrectQueue: [],
  knownIds: new Set(),
};

function pickRandomEntries<T>(items: T[], desiredCount: number): T[] {
  if (items.length <= desiredCount) return [...items];
  const selectedIndices = new Set<number>();
  while (selectedIndices.size < desiredCount) {
    selectedIndices.add(Math.floor(Math.random() * items.length));
  }
  const result: T[] = [];
  selectedIndices.forEach((index) => result.push(items[index]));
  return result;
}

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export function flashcardsReducer(
  state: FlashcardsState,
  action: FlashcardsAction,
): FlashcardsState {
  switch (action.type) {
    case 'TOGGLE_PICKER':
      return { ...state, pickerOpen: !state.pickerOpen };

    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.category };

    case 'SET_DECK':
      return { ...state, deck: action.deck, index: 0, incorrectQueue: [], knownIds: new Set() };

    case 'GO_NEXT':
      if (state.index < state.deck.length - 1) {
        return { ...state, index: state.index + 1 };
      }
      if (state.incorrectQueue.length > 0) {
        const [next, ...rest] = state.incorrectQueue;
        return { ...state, index: next, incorrectQueue: rest };
      }
      return state;

    case 'HANDLE_UNKNOWN':
      const newIncorrectQueue = state.incorrectQueue.includes(state.index)
        ? state.incorrectQueue
        : [...state.incorrectQueue, state.index];
      return { ...state, incorrectQueue: newIncorrectQueue };

    case 'HANDLE_KNOWN':
      const newKnownIds = new Set(state.knownIds);
      newKnownIds.add(action.cardId);
      return { ...state, knownIds: newKnownIds };

    case 'RESHUFFLE_DECK':
      // This would need access to spanishFlashcards - handle in component
      return state;

    case 'RESET_DECK':
      return { ...state, index: 0, incorrectQueue: [], knownIds: new Set() };

    default:
      return state;
  }
}
