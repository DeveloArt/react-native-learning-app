import { spanishFlashcards } from '@/api/database/flashcards';
import { ThemedText } from '@/components/typography/ThemedText';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { SpeakingContent } from './components/SpeakingContent';
import { SpeakingMic } from './components/SpeakingMic';
import { SpeakingProgressSection } from './components/SpeakingProgressSection';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';
import type { SpeakingWord } from './types/types';

export function SpeakingScreen() {
  const { t } = useTranslation();

  const words: SpeakingWord[] = spanishFlashcards.map((card) => ({
    id: card.id,
    word: card.word,
    translationPl: card.translationPl,
    translationEn: card.translationEn,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentWord = words[currentIndex];

  const handleResult = (correct: boolean, recognizedText: string) => {
    setIsCorrect(correct);
    setShowResult(true);
  };

  const { isRecording, isProcessing, recognizedText, startRecording, stopRecording, reset } =
    useVoiceRecognition({
      expectedWord: currentWord.word,
      onResult: handleResult,
    });

  const handlePressIn = useCallback(() => {
    reset();
    setShowResult(false);
    setIsCorrect(false);
    startRecording();
  }, [reset, startRecording]);

  const handlePressOut = () => {
    stopRecording();
  };

  const handleNext = () => {
    setShowResult(false);
    setIsCorrect(false);
    reset();
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  return (
    <View className="flex-1 px-4 py-4 bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
      <SpeakingProgressSection progress={{ current: currentIndex + 1, total: words.length }} />
      <SpeakingContent
        word={currentWord}
        showResult={showResult}
        isCorrect={isCorrect}
        recognizedText={recognizedText}
      />
      {showResult && (
        <View className="absolute bottom-32 left-0 right-0 px-4">
          <Pressable
            onPress={handleNext}
            className="bg-surfaceActionSecondary py-4 rounded-lg items-center mb-4"
          >
            <ThemedText weight="bold" className="text-white">
              {t('speaking.next')}
            </ThemedText>
          </Pressable>
        </View>
      )}
      <SpeakingMic
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        isRecording={isRecording}
        isProcessing={isProcessing}
      />
    </View>
  );
}
