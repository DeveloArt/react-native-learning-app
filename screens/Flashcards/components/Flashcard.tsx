import { ThemedText } from '@/components/typography/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';

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

  const speakFront = async () => {
    Speech.stop();
    const stored = await AsyncStorage.getItem('tts-rate');
    const rate = stored ? parseFloat(stored) : 1.0;
    Speech.speak(frontText, {
      language: 'es-ES',
      rate,
      onDone: () => {},
      onStopped: () => {},
      onError: () => {},
    } as any);
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
    <View className="flex-col items-center justify-between rounded-xl shadow-[0_12px_24px_rgba(0,0,0,0.08)] bg-white dark:bg-surfacePrimary-dark p-8 min-h-[400px] border border-border dark:border-border-dark relative overflow-hidden">
      {/* Front Side Content */}
      <View className="flex-col items-center w-full gap-6">
        {/* Image component as a header of the card */}
        <View className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full items-center justify-center">
          <MaterialIcons name="restaurant" size={48} color="#2b8cee" />
        </View>
        <View className="text-center">
          <ThemedText weight="bold" className="text-4xl mb-2">
            {frontText}
          </ThemedText>
          <ThemedText size="medium" className="text-textSecondary dark:text-textSecondary-dark">
            Noun, feminine
          </ThemedText>
        </View>
        {/* Audio Trigger */}
        <Pressable
          onPress={speakFront}
          className="items-center justify-center w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/30 active:scale-95 transition-transform"
        >
          <MaterialIcons name="volume-up" size={28} color="white" />
        </Pressable>
      </View>

      <View className="w-full border-t border-dashed border-border dark:border-border-dark my-8"></View>

      {/* Back Side / Hidden Section */}
      <View className="w-full flex-col gap-4">
        {/* BodyText Translation */}
        <View className="flex-col items-center">
          <ThemedText weight="bold" className="text-xl text-center">
            {backText}
          </ThemedText>
          <View className="h-1 w-8 bg-primary rounded-full mt-1"></View>
        </View>
        {/* BodyText Example Sentence */}
        <ThemedText
          size="medium"
          className="text-textSecondary dark:text-textSecondary-dark italic leading-relaxed text-center px-4"
        >
          &quot;Me gusta comer una manzana roja.&quot;
        </ThemedText>
      </View>

      {/* Top Right corner visual cue */}
      <View className="absolute top-4 right-4">
        <MaterialIcons name="info" size={24} color="#94a3b8" />
      </View>
    </View>
  );
};
