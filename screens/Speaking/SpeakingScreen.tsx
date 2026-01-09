import { spanishFlashcards } from '@/api/database/flashcards';
import { ThemedText } from '@/components/typography/ThemedText';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { SpeakingContent } from './components/SpeakingContent';
import { SpeakingMic } from './components/SpeakingMic';
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
    <View className="flex-1 bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
      {/* TopAppBar */}
      <View className="flex-row items-center justify-between p-4 pb-2">
        <TouchableOpacity className="w-12 h-12 items-start justify-center">
          <ThemedText className="text-2xl">✕</ThemedText>
        </TouchableOpacity>
        <ThemedText weight="bold" className="text-lg flex-1 text-center pr-12">
          Pronunciation Practice
        </ThemedText>
      </View>

      {/* ProgressBar */}
      <View className="flex-col gap-2 p-4 pt-0">
        <View className="flex-row gap-6 justify-between items-center mb-1">
          <ThemedText
            size="small"
            weight="medium"
            className="text-textSecondary dark:text-textSecondary-dark uppercase tracking-wider"
          >
            Session Progress
          </ThemedText>
          <ThemedText size="small" weight="bold">
            {currentIndex + 1}/{words.length}
          </ThemedText>
        </View>
        <View className="rounded-full bg-slate-100 dark:bg-slate-700 h-2.5 overflow-hidden">
          <View
            className="h-full rounded-full bg-primary"
            style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
          ></View>
        </View>
      </View>

      {/* Central Content Area */}
      <View className="flex-1 flex-col justify-center px-4 py-4">
        <SpeakingContent
          word={currentWord}
          showResult={showResult}
          isCorrect={isCorrect}
          recognizedText={recognizedText}
        />
      </View>

      {/* Navigation / Action Buttons */}
      <View className="p-6 flex gap-4 bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
        {/* Unknown Button */}
        <TouchableOpacity
          onPress={() => {
            handleResult(false, recognizedText || '');
            setShowResult(true);
          }}
          className="flex-1 flex-col items-center justify-center gap-2 h-20 bg-danger rounded-xl shadow-lg active:scale-[0.98] transition-all"
        >
          <ThemedText className="text-white text-2xl">✕</ThemedText>
          <ThemedText weight="bold" className="text-white text-xs uppercase tracking-widest">
            Try Again
          </ThemedText>
        </TouchableOpacity>

        {/* Known Button */}
        <TouchableOpacity
          onPress={() => {
            handleResult(true, recognizedText || '');
            setShowResult(true);
          }}
          className="flex-1 flex-col items-center justify-center gap-2 h-20 bg-success rounded-xl shadow-lg active:scale-[0.98] transition-all"
        >
          <ThemedText className="text-white text-2xl">✓</ThemedText>
          <ThemedText weight="bold" className="text-white text-xs uppercase tracking-widest">
            Good Job!
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Floating Hint (Bottom spacer for iOS home bar area) */}
      <View className="h-6 bg-surfaceSecondary dark:bg-surfaceSecondary-dark"></View>

      {/* Speaking Mic */}
      <View className="absolute bottom-32 left-0 right-0 px-4">
        <SpeakingMic
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          isRecording={isRecording}
          isProcessing={isProcessing}
        />
      </View>

      {/* Result Feedback */}
      {showResult && (
        <View className="absolute bottom-32 left-0 right-0 px-4">
          <TouchableOpacity
            onPress={handleNext}
            className="w-full bg-primary rounded-xl py-4 items-center mb-4 shadow-lg shadow-primary/20"
          >
            <ThemedText weight="bold" className="text-white">
              {isCorrect ? 'Great!' : 'Try Again'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
