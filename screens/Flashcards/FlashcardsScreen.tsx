import { mapToStudyCards, spanishFlashcards } from '@/api/database/flashcards';
import { ProgressBar } from '@/components/progress/ProgressBar';
import { ThemedText } from '@/components/typography/ThemedText';
import { flashcardsReducer, initialFlashcardsState } from '@/hooks/useFlashcardsReducer';
import { categoryCards } from '@/screens/Categories/data/cards';
import { getSelectedCategory, saveSelectedCategory } from '@/src/storage/category';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Flashcard } from './components/Flashcard';
import { FlashcardButtons } from './components/FlashcardButtons';

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

export function FlashcardsScreen() {
  const { i18n, t } = useTranslation();
  const [state, dispatch] = useReducer(flashcardsReducer, initialFlashcardsState);
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + 2;
  const paddingBottom = insets.bottom + 10;
  const pickerButtonMarginTop = Platform.OS === 'android' ? -height * 0.01 : -height * 0.05;

  // Initialize deck on mount
  useEffect(() => {
    const source = spanishFlashcards;
    const selection = pickRandomEntries(source, 10);
    const base = mapToStudyCards(selection);
    const shuffled = [...base].sort(() => Math.random() - 0.5);
    dispatch({ type: 'SET_DECK', deck: shuffled });
  }, []);

  const card = state.deck[state.index];
  const progress = state.deck.length > 0 ? state.knownIds.size / state.deck.length : 0;
  const done = state.deck.length > 0 && state.knownIds.size === state.deck.length;

  const handleUnknown = () => {
    dispatch({ type: 'HANDLE_UNKNOWN' });
    dispatch({ type: 'GO_NEXT' });
  };

  const handleKnown = () => {
    if (card) {
      dispatch({ type: 'HANDLE_KNOWN', cardId: card.id });
    }
    dispatch({ type: 'GO_NEXT' });
  };

  useEffect(() => {
    if (state.knownIds.size === 1) {
      import('@/screens/Stats/storage').then((m) => m.addLearnedToday()).catch(() => {});
    }
  }, [state.knownIds.size]);

  const reshuffleDeck = () => {
    const source = spanishFlashcards.filter((e) =>
      state.selectedCategory ? e.category === state.selectedCategory : true,
    );
    const selection = pickRandomEntries(source, 10);
    const base = mapToStudyCards(selection);
    const shuffled = [...base].sort(() => Math.random() - 0.5);
    dispatch({ type: 'SET_DECK', deck: shuffled });
  };

  const applyCategorySelection = async (catKey: string | null) => {
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
  };

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => {
      reshuffleDeck();
    }, 2500);
    return () => clearTimeout(t);
  }, [done, state.selectedCategory]);

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

  return (
    <View
      className="flex-1 px-4 bg-surfaceSecondary dark:bg-surfaceSecondary-dark"
      style={{ paddingTop, paddingBottom }}
    >
      <Modal
        visible={state.pickerOpen}
        animationType="slide"
        onRequestClose={() => dispatch({ type: 'TOGGLE_PICKER' })}
      >
        <ScrollView
          className="flex-1 bg-surfaceSecondary dark:bg-surfaceSecondary-dark"
          contentContainerStyle={{ padding: 16, paddingTop, paddingBottom }}
        >
          <View className="gap-3 mt-2">
            {categoryCards.map((c) => (
              <TouchableOpacity
                key={c.key}
                onPress={() => applyCategorySelection(c.key)}
                className="rounded-2xl bg-surfacePrimary dark:bg-surfacePrimary-dark"
              >
                <View className="flex-row justify-between items-center p-4">
                  <View className="flex-row gap-4 items-center">
                    <View className="p-3 rounded-xl" style={{ backgroundColor: c.color }}>
                      <MaterialCommunityIcons name={c.icon as any} size={22} color={c.iconColor} />
                    </View>
                    <View>
                      <ThemedText weight="bold">{t(`builder.categories.${c.key}`)}</ThemedText>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View>
            <View style={{ height: 24 }} />
            <TouchableOpacity
              onPress={() => dispatch({ type: 'TOGGLE_PICKER' })}
              className="w-full px-4 py-3 rounded-full bg-white dark:bg-surfaceTertiary-dark"
            >
              <ThemedText className="text-center text-black dark:text-white">
                {t('common.buttons.close') || 'Close'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>

      <View className="mb-4 w-full">
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: 'TOGGLE_PICKER' });
          }}
          className="px-3 py-2 bg-surfacePrimary dark:bg-surfacePrimary-dark rounded mb-3"
          style={{ marginTop: pickerButtonMarginTop }}
        >
          <ThemedText>
            {state.selectedCategory
              ? t(`builder.categories.${state.selectedCategory}`)
              : t('flashcards.selectCategory') || 'Select category'}
          </ThemedText>
        </TouchableOpacity>
        <ProgressBar progress={progress} height={8} />
      </View>
      <View className="items-center">
        <ThemedText size="small" className="opacity-70">
          {state.knownIds.size}/{state.deck.length}
        </ThemedText>
      </View>
      <View
        className="flex-1 items-center"
        style={{ justifyContent: 'flex-start', marginTop: height * 0.1 }}
      >
        {done ? (
          <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
            <ThemedText weight="bold" className="text-[24px]">
              {t('flashcards.allDone')}
            </ThemedText>
          </Animated.View>
        ) : card ? (
          <Animated.View
            key={card.id}
            entering={FadeInDown}
            exiting={FadeOutDown}
            className="w-full"
          >
            {(() => {
              const isPl = (i18n.language || 'en').startsWith('pl');
              const backLanguageLabel = isPl
                ? t('config.languagePolish')
                : t('config.languageEnglish');
              const backText = isPl ? card.backTextPl : card.backTextEn;
              const examples = (card.examples || []).map((e) => ({
                sentence: e.sentence,
                translationEn: e.translationEn,
                translationPl: e.translationPl,
              }));
              return (
                <Flashcard
                  frontLanguageLabel={card.frontLanguageLabel}
                  frontText={card.frontText}
                  backLanguageLabel={backLanguageLabel}
                  backText={backText}
                  examples={examples}
                />
              );
            })()}
          </Animated.View>
        ) : (
          <View className="w-full items-center">
            <ThemedText weight="bold" className="text-[24px]">
              No cards available
            </ThemedText>
          </View>
        )}
        {!done && <FlashcardButtons onUnknown={handleUnknown} onKnown={handleKnown} />}
      </View>
    </View>
  );
}
