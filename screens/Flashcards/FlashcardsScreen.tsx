import { mapToStudyCards, spanishFlashcards } from '@/api/database/flashcards';
import { ProgressBar } from '@/components/progress/ProgressBar';
import { ThemedText } from '@/components/typography/ThemedText';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
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
  const [deck, setDeck] = useState(() => {
    const selection = pickRandomEntries(spanishFlashcards, 10);
    const base = mapToStudyCards(selection);
    return [...base].sort(() => Math.random() - 0.5);
  });
  const [index, setIndex] = useState(0);
  const [incorrectQueue, setIncorrectQueue] = useState<number[]>([]);
  const [knownIds, setKnownIds] = useState<Set<string>>(new Set());

  const card = deck[index];

  const goNext = () => {
    if (index < deck.length - 1) {
      setIndex(index + 1);
      return;
    }
    if (incorrectQueue.length > 0) {
      const [next, ...rest] = incorrectQueue;
      setIndex(next);
      setIncorrectQueue(rest);
    }
  };

  const handleUnknown = () => {
    if (!incorrectQueue.includes(index)) setIncorrectQueue([...incorrectQueue, index]);
    goNext();
  };

  const handleKnown = () => {
    const current = deck[index];
    if (current && !knownIds.has(current.id)) {
      const next = new Set(knownIds);
      next.add(current.id);
      setKnownIds(next);
    }
    goNext();
  };

  const progress = deck.length > 0 ? knownIds.size / deck.length : 0;
  const done = deck.length > 0 && knownIds.size === deck.length;

  const reshuffleDeck = () => {
    const selection = pickRandomEntries(spanishFlashcards, 10);
    const base = mapToStudyCards(selection);
    const shuffled = [...base].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setIndex(0);
    setIncorrectQueue([]);
    setKnownIds(new Set());
  };

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => {
      reshuffleDeck();
    }, 2500);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <View className="flex-1 px-4 py-4 bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
      <View className="mb-4 w-full">
        <ProgressBar progress={progress} height={8} />
      </View>
      <View className="items-center">
        <ThemedText size="small" className="opacity-70">
          {knownIds.size}/{deck.length}
        </ThemedText>
      </View>
      <View className="flex-1 justify-center items-center">
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
                translation: isPl ? e.translationPl : e.translationEn,
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
        ) : null}
        {!done && <FlashcardButtons onUnknown={handleUnknown} onKnown={handleKnown} />}
      </View>
    </View>
  );
}
