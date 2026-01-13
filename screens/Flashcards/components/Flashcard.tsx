import { ThemedText } from '@/components/typography/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

  // Use the appropriate back text based on user's language
  const userBackText = backText;

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

      // Speak in the user's language for the back content
      const language = isPl ? 'pl-PL' : 'en-US';
      const textToSpeak = examples?.[exampleIndex]
        ? isPl
          ? examples[exampleIndex].translationPl
          : examples[exampleIndex].translationEn
        : backText;

      await Speech.speak(textToSpeak, {
        language,
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
      <View className="w-full h-[400px]">
        <Animated.View
          className="absolute inset-0 justify-between items-center px-8 py-8 rounded-xl shadow-[0_12px_24px_rgba(0,0,0,0.08)] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
          style={[frontStyle]}
          pointerEvents={isFront ? 'auto' : 'none'}
        >
          {/* Front Side Content */}
          <View className="flex-col items-center w-full gap-6">
            {/* Image component as a header of the card */}
            <View className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
              <MaterialCommunityIcons name="food-apple" size={80} color="#2b8cee" />
            </View>

            <View className="text-center">
              <ThemedText weight="bold" className="text-[40px] text-center mb-2">
                {frontText}
              </ThemedText>
              <ThemedText
                size="medium"
                className="text-[#4c739a] dark:text-slate-400 text-lg font-normal text-center"
              >
                {frontLanguageLabel}
              </ThemedText>
            </View>

            {/* Audio Trigger */}
            <Pressable
              onPress={speakFront}
              className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 active:scale-95 transition-transform"
            >
              <MaterialCommunityIcons name="volume-high" size={24} color="white" />
            </Pressable>
          </View>

          {/* Top Right corner visual cue */}
          <View className="absolute top-4 right-4">
            <MaterialCommunityIcons name="information" size={24} color="#94a3b8" />
          </View>
        </Animated.View>

        <Animated.View
          className="absolute inset-0 justify-between items-center px-8 py-8 rounded-xl shadow-[0_12px_24px_rgba(0,0,0,0.08)] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
          style={[backStyle]}
          pointerEvents={isFront ? 'none' : 'auto'}
        >
          {/* Front Content (compact) */}
          <View className="flex-col items-center w-full gap-6">
            {/* Icon Header */}
            <View className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
              <MaterialCommunityIcons name="food-apple" size={80} color="#2b8cee" />
            </View>

            {/* Front Content */}
            <View className="text-center">
              <ThemedText weight="bold" className="text-[36px] text-center mb-2">
                {frontText}
              </ThemedText>
              <ThemedText
                size="medium"
                className="text-textSecondary dark:text-textSecondary-dark text-lg font-normal text-center"
              >
                {frontLanguageLabel}
              </ThemedText>
            </View>
          </View>

          {/* Dashed Divider */}
          <View className="w-full border-t border-dashed border-slate-200 dark:border-slate-700 my-8" />

          {/* Back Content */}
          <View className="w-full flex-col gap-4">
            {examples?.length ? (
              <>
                <GestureDetector gesture={swipeGesture}>
                  <Animated.View style={exampleSlideStyle} className="flex-col items-center gap-2">
                    <View className="flex-col items-center">
                      <ThemedText weight="bold" className="text-[24px] font-semibold text-center">
                        {cloze
                          ? (examples[exampleIndex]?.sentence ?? '').replace(
                              new RegExp(
                                `\b${frontText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\b`,
                                'i',
                              ),
                              '____',
                            )
                          : highlightParts(sentence, frontText)}
                      </ThemedText>
                      <View className="h-1 w-8 bg-primary rounded-full mt-1" />
                    </View>
                    <ThemedText
                      size="medium"
                      className="text-textSecondary dark:text-textSecondary-dark text-base italic leading-relaxed text-center px-4"
                    >
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
                          className={`w-2 h-2 rounded-full ${i === exampleIndex ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}
                        />
                      ))}
                    </View>
                  </View>
                ) : null}
              </>
            ) : (
              <View className="flex-col items-center">
                <ThemedText weight="bold" className="text-[24px] font-semibold text-center">
                  {userBackText}
                </ThemedText>
                <View className="h-1 w-8 bg-primary rounded-full mt-1" />
              </View>
            )}
          </View>

          {/* Audio Button */}
          <Pressable
            onPress={speakBack}
            className="flex items-center justify-center w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/30 active:scale-95 transition-transform"
          >
            <MaterialCommunityIcons name="volume-high" size={24} color="white" />
          </Pressable>

          {/* Info Icon */}
          <View className="absolute top-4 right-4">
            <MaterialCommunityIcons name="information" size={24} color="#94a3b8" />
          </View>
        </Animated.View>
      </View>
    </Pressable>
  );
};

export default Flashcard;
