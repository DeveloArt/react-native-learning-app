import { ButtonIcon } from '@/components/buttons/ButtonIcon';
import { ThemedText } from '@/components/typography/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useTranslation } from 'react-i18next';
import type { FlashcardProps } from '../types/types';

export const Flashcard = ({
  frontLanguageLabel,
  frontText,
  backLanguageLabel,
  backText,
  examples,
  cloze,
}: FlashcardProps) => {
  const { t, i18n } = useTranslation();
  const progress = useSharedValue(0);
  const [isFront, setIsFront] = useState(true);
  const [exampleIndex, setExampleIndex] = useState(0);
  const swipeX = useSharedValue(0);

  const isPl = (i18n.language || 'en').startsWith('pl');

  const flip = () => {
    progress.value = withTiming(isFront ? 1 : 0, { duration: 300 });
    setIsFront(!isFront);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(progress.value, [0, 1], [0, 180]);
    const opacity = interpolate(progress.value, [0, 0.5, 1], [1, 0, 0]);
    return { transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }], opacity } as const;
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(progress.value, [0, 1], [180, 360]);
    const opacity = interpolate(progress.value, [0, 0.5, 1], [0, 0, 1]);
    return { transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }], opacity } as const;
  });

  const exampleSlideStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: swipeX.value }] } as const;
  });

  const [speakingFront, setSpeakingFront] = useState(false);
  const [speakingBack, setSpeakingBack] = useState(false);

  const speakFront = async () => {
    try {
      Speech.stop();
      setSpeakingFront(true);
      let rate = 1.0;
      try {
        const stored = await AsyncStorage.getItem('tts-rate');
        if (stored) {
          const parsed = parseFloat(stored);
          if (!isNaN(parsed) && parsed >= 0.5 && parsed <= 1.0) {
            rate = parsed;
          }
        }
      } catch (error) {
        console.error('Error loading TTS rate from AsyncStorage:', error);
      }
      await Speech.speak(frontText, {
        language: 'es-ES',
        rate,
        onDone: () => setSpeakingFront(false),
        onStopped: () => setSpeakingFront(false),
        onError: () => setSpeakingFront(false),
      });
    } catch (error) {
      console.error('Error speaking front text:', error);
      setSpeakingFront(false);
    }
  };

  const speakBack = async () => {
    try {
      Speech.stop();
      const sentence = examples?.[exampleIndex]?.sentence ?? backText;
      setSpeakingBack(true);
      let rate = 1.0;
      try {
        const stored = await AsyncStorage.getItem('tts-rate');
        if (stored) {
          const parsed = parseFloat(stored);
          if (!isNaN(parsed) && parsed >= 0.5 && parsed <= 1.0) {
            rate = parsed;
          }
        }
      } catch (error) {
        console.error('Error loading TTS rate from AsyncStorage:', error);
      }
      await Speech.speak(sentence, {
        language: 'es-ES',
        rate,
        onDone: () => setSpeakingBack(false),
        onStopped: () => setSpeakingBack(false),
        onError: () => setSpeakingBack(false),
      });
    } catch (error) {
      console.error('Error speaking back text:', error);
      setSpeakingBack(false);
    }
  };

  const sentence = examples?.[exampleIndex]?.sentence;

  const removeDiacritics = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .normalize('NFC');

  const highlightParts = (text: string | undefined, term: string) => {
    if (!text) return null;
    // Split term into candidate synonyms (e.g., "lepszy;najlepszy" or "to be able to;can")
    const termCandidates = term
      .split(/[;,/]|\bor\b/)
      .map((s) => s.trim())
      .filter(Boolean);

    const prepared = termCandidates.map((candidate) => {
      const norm = removeDiacritics(candidate).toLowerCase();
      const len = norm.length;
      const stemLen = len >= 6 ? 5 : len >= 4 ? 4 : len;
      const stem = norm.slice(0, stemLen);
      return { norm, stem, stemLen } as const;
    });

    // Split into word and non-word chunks without Unicode property escapes
    const chunks = text.match(/([A-Za-z\u00C0-\u017F]+|[^A-Za-z\u00C0-\u017F]+)/g) || [text];
    return chunks.map((chunk, idx) => {
      // If chunk is a word
      if (/^[A-Za-z\u00C0-\u017F]+$/.test(chunk)) {
        const normCore = removeDiacritics(chunk).toLowerCase();
        const shouldBold = prepared.some(({ norm, stem, stemLen }) => {
          const isExact = normCore === norm;
          const isStem = stemLen >= 3 && normCore.startsWith(stem);
          return isExact || isStem;
        });
        return (
          <ThemedText key={`w-${idx}`} weight={shouldBold ? 'bold' : 'regular'}>
            {chunk}
          </ThemedText>
        );
      }
      // Non-word chunk (spaces, punctuation)
      return <ThemedText key={`t-${idx}`}>{chunk}</ThemedText>;
    });
  };

  const onSwipeEnd = (dx: number) => {
    if (!examples || examples.length <= 1) return;
    const THRESH = 40;
    if (dx <= -THRESH) {
      setExampleIndex((prev) => (prev + 1) % examples.length);
    } else if (dx >= THRESH) {
      setExampleIndex((prev) => (prev - 1 + examples.length) % examples.length);
    }
  };

  const swipeGesture = Gesture.Pan()
    .onUpdate((e) => {
      swipeX.value = e.translationX * 0.3;
    })
    .onEnd((e) => {
      const dx = e.translationX;
      runOnJS(onSwipeEnd)(dx);
      swipeX.value = withTiming(0, { duration: 150 });
    });

  return (
    <Pressable onPress={flip} className="w-full">
      <View className="w-full h-[260px]">
        <Animated.View
          className="absolute inset-0 justify-center items-center px-6 py-6 rounded-3xl bg-surfacePrimary dark:bg-surfacePrimary-dark shadow-shadowM"
          style={[frontStyle]}
          pointerEvents={isFront ? 'auto' : 'none'}
        >
          <ThemedText size="small" className="text-textSecondary dark:text-textSecondary-dark">
            {frontLanguageLabel}
          </ThemedText>
          <ThemedText weight="bold" className="mt-2 text-[32px]">
            {frontText}
          </ThemedText>
          <View className="mt-3">
            <ButtonIcon
              icon="volume-high"
              diameter={52}
              variant={speakingFront ? 'danger' : 'neutral'}
              stopPropagation
              onPress={speakFront}
            />
          </View>
          <ThemedText
            size="medium"
            weight="medium"
            className="mt-3 text-iconInfo dark:text-iconInfo-dark"
          >
            {t('flashcards.tapToSeeTranslation')}
          </ThemedText>
        </Animated.View>

        <Animated.View
          className="absolute inset-0 justify-center items-center px-6 py-6 rounded-3xl bg-surfacePrimary dark:bg-surfacePrimary-dark shadow-shadowM"
          style={[backStyle]}
          pointerEvents={isFront ? 'none' : 'auto'}
        >
          <ThemedText size="small" className="text-textSecondary dark:text-textSecondary-dark">
            {backLanguageLabel}
          </ThemedText>
          {examples?.length ? (
            <>
              <GestureDetector gesture={swipeGesture}>
                <Animated.View style={exampleSlideStyle}>
                  <ThemedText weight="bold" className="mt-2 text-[24px] text-center">
                    {cloze
                      ? (examples[exampleIndex]?.sentence ?? '').replace(
                          new RegExp(
                            `\\b${frontText.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\b`,
                            'i',
                          ),
                          '____',
                        )
                      : null}
                    {!cloze && highlightParts(sentence, frontText)}
                  </ThemedText>
                  <ThemedText size="medium" className="mt-2 text-center opacity-80">
                    {highlightParts(
                      isPl
                        ? examples[exampleIndex]?.translationPl
                        : (examples[exampleIndex]?.translationEn ?? backText),
                      backText,
                    )}
                  </ThemedText>
                </Animated.View>
              </GestureDetector>
              {examples.length > 1 ? (
                <View className="mt-3 items-center">
                  <View className="flex-row gap-2">
                    {examples.map((_, i) => (
                      <View
                        key={i}
                        className={`w-2 h-2 rounded-full ${i === exampleIndex ? 'bg-surfaceActionSecondary' : 'bg-surfaceTertiary dark:bg-surfaceTertiary-dark'}`}
                      />
                    ))}
                  </View>
                  <ThemedText
                    size="medium"
                    weight="medium"
                    className="mt-2 text-iconInfo dark:text-iconInfo-dark"
                  >
                    {t('flashcards.swipeForNext')}
                  </ThemedText>
                </View>
              ) : null}
            </>
          ) : (
            <ThemedText weight="bold" className="mt-2 text-[32px]">
              {backText}
            </ThemedText>
          )}
          <View className="mt-3">
            <ButtonIcon
              icon="volume-high"
              diameter={52}
              variant={speakingBack ? 'danger' : 'neutral'}
              stopPropagation
              onPress={speakBack}
            />
          </View>
          <ThemedText
            size="medium"
            weight="medium"
            className="mt-3 text-iconInfo dark:text-iconInfo-dark"
          >
            {t('flashcards.tapToSeeOriginal')}
          </ThemedText>
        </Animated.View>
      </View>
    </Pressable>
  );
};
