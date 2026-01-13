import { mapToStudyCards, spanishFlashcards, StudyCard } from '@/api/database/flashcards';
import { getSelectedCategory, saveSelectedCategory } from '@/src/storage/category';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { flashcardsReducer, initialFlashcardsState } from './useFlashcardsReducer';

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

export function useFlashcardsDeck() {
  const { i18n, t } = useTranslation();

  const [state, dispatch] = useReducer(flashcardsReducer, initialFlashcardsState);

  // Memoized current card
  const currentCard = useMemo(() => state.deck[state.index], [state.deck, state.index]);

  // Memoized progress calculations
  const progress = useMemo(
    () => (state.deck.length > 0 ? state.knownIds.size / state.deck.length : 0),
    [state.deck.length, state.knownIds.size],
  );

  const isDone = useMemo(
    () => state.deck.length > 0 && state.knownIds.size === state.deck.length,
    [state.deck.length, state.knownIds.size],
  );

  // Initialize deck on mount
  useEffect(() => {
    const source = spanishFlashcards;
    const selection = pickRandomEntries(source, 10);
    const base = mapToStudyCards(selection);
    const shuffled = [...base].sort(() => Math.random() - 0.5);
    dispatch({ type: 'SET_DECK', deck: shuffled });
  }, []);

  // Handle category selection on mount
  useEffect(() => {
    let mounted = true;
    getSelectedCategory()
      .then((v) => {
        if (!mounted) return;
        if (v) {
          dispatch({ type: 'SET_CATEGORY', category: v });
          const source = spanishFlashcards.filter((e) => e.category === v);
          const selection = pickRandomEntries(source, 10);
          const base = mapToStudyCards(selection);
          const shuffled = [...base].sort(() => Math.random() - 0.5);
          dispatch({ type: 'SET_DECK', deck: shuffled });
        }
      })
      .catch(() => {
        // Error loading selected category - silently continue
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Track learning progress
  useEffect(() => {
    if (state.knownIds.size === 1) {
      import('@/screens/Stats/storage').then((m) => m.addLearnedToday()).catch(() => {});
    }
  }, [state.knownIds.size]);

  // Auto-reshuffle when done
  useEffect(() => {
    if (!isDone) return;
    const t = setTimeout(() => {
      reshuffleDeck();
    }, 2500);
    return () => clearTimeout(t);
  }, [isDone, state.selectedCategory]);

  const handleUnknown = useCallback(() => {
    dispatch({ type: 'HANDLE_UNKNOWN' });
    dispatch({ type: 'GO_NEXT' });
  }, []);

  const handleKnown = useCallback(() => {
    if (currentCard) {
      dispatch({ type: 'HANDLE_KNOWN', cardId: currentCard.id });
    }
    dispatch({ type: 'GO_NEXT' });
  }, [currentCard]);

  const reshuffleDeck = useCallback(() => {
    const source = spanishFlashcards.filter((e) =>
      state.selectedCategory ? e.category === state.selectedCategory : true,
    );
    const selection = pickRandomEntries(source, 10);
    const base = mapToStudyCards(selection);
    const shuffled = [...base].sort(() => Math.random() - 0.5);
    dispatch({ type: 'SET_DECK', deck: shuffled });
  }, [state.selectedCategory]);

  const applyCategorySelection = useCallback(async (catKey: string | null) => {
    dispatch({ type: 'SET_CATEGORY', category: catKey });
    dispatch({ type: 'TOGGLE_PICKER' });
    try {
      await saveSelectedCategory(catKey);
    } catch (e) {
      // Error saving category - silently continue
    }
    const source = spanishFlashcards.filter((e) => (catKey ? e.category === catKey : true));
    const selection = pickRandomEntries(source, 10);
    const base = mapToStudyCards(selection);
    const shuffled = [...base].sort(() => Math.random() - 0.5);
    dispatch({ type: 'SET_DECK', deck: shuffled });
  }, []);

  const togglePicker = useCallback(() => {
    dispatch({ type: 'TOGGLE_PICKER' });
  }, []);

  const getLocalizedCard = useCallback(
    (card: StudyCard) => {
      const isPl = (i18n.language || 'en').startsWith('pl');
      const backLanguageLabel = isPl ? t('config.languagePolish') : t('config.languageEnglish');
      const backText = isPl ? card.backTextPl : card.backTextEn;
      const examples = (card.examples || []).map((e) => ({
        sentence: e.sentence,
        translation: isPl ? e.translationPl : e.translationEn,
      }));

      return {
        ...card,
        backLanguageLabel,
        backText,
        examples,
      };
    },
    [i18n.language, t],
  );

  return {
    // State
    state,
    currentCard,
    progress,
    isDone,

    // Actions
    handleUnknown,
    handleKnown,
    reshuffleDeck,
    applyCategorySelection,
    togglePicker,

    // Utilities
    getLocalizedCard,
  };
}
