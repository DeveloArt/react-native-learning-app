import { spanishFlashcards } from '@/api/database/flashcards';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { SpeakingActionButtons } from './components/SpeakingActionButtons';
import { SpeakingMicButton } from './components/SpeakingMicButton';
import { SpeakingProgressSection } from './components/SpeakingProgressSection';
import { SpeakingResults } from './components/SpeakingResults';
import { SpeakingWaveform } from './components/SpeakingWaveform';
import { SpeakingWordDisplay } from './components/SpeakingWordDisplay';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';
import type { SpeakingWord } from './types/types';

export function SpeakingScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  const words: SpeakingWord[] = spanishFlashcards.map((card) => ({
    id: card.id,
    word: card.word,
    translationPl: card.translationPl,
    translationEn: card.translationEn,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [accuracy, setAccuracy] = useState(0);

  const currentWord = words[currentIndex];

  const handleResult = (correct: boolean, recognizedText: string) => {
    setIsCorrect(correct);
    setShowResult(true);
    // Calculate accuracy based on similarity (simplified for demo)
    const calculatedAccuracy = correct ? 92 : 45; // In real app, calculate based on similarity
    setAccuracy(calculatedAccuracy);
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
    setAccuracy(0);
    startRecording();
  }, [reset, startRecording]);

  const handlePressOut = () => {
    stopRecording();
  };

  const handleNext = () => {
    setShowResult(false);
    setIsCorrect(false);
    setAccuracy(0);
    reset();
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  const handleTryAgain = () => {
    setShowResult(false);
    setIsCorrect(false);
    setAccuracy(0);
    reset();
  };

  const handlePlayAudio = () => {
    // TODO: Implement text-to-speech for the word
    console.log('Playing audio for:', currentWord.word);
  };

  return (
    <View
      className={`relative flex h-full min-h-screen w-full max-w-[430px] flex-col ${
        colorScheme === 'dark' ? 'bg-black' : 'bg-white'
      } overflow-x-hidden pb-10`}
    >
      {/* TopAppBar */}
      <View className="flex items-center bg-transparent p-4 pb-2 justify-between">
        <Pressable
          className={`${colorScheme === 'dark' ? 'text-white' : 'text-[#0d141b]'} flex size-12 shrink-0 items-center`}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} />
        </Pressable>
        <View className="flex-1 text-center pr-12">
          <View
            className={`${colorScheme === 'dark' ? 'text-white' : 'text-[#0d141b]'} text-lg font-bold leading-tight tracking-[-0.015em] text-center`}
          >
            Practice Pronunciation
          </View>
        </View>
      </View>

      {/* Progress Indicator */}
      <SpeakingProgressSection progress={{ current: currentIndex + 1, total: words.length }} />

      {/* Word Display */}
      <SpeakingWordDisplay word={currentWord} onPlayAudio={handlePlayAudio} />

      {/* Recording Area */}
      <SpeakingMicButton
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        isRecording={isRecording}
        isProcessing={isProcessing}
      />

      {/* Waveform Animation */}
      <SpeakingWaveform isRecording={isRecording} />

      {/* Hold to speak text */}
      {!isRecording && !showResult && (
        <View className="flex items-center justify-center pb-3 pt-4 px-4">
          <View
            className={`${colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-base font-normal leading-normal text-center`}
          >
            Hold to speak
          </View>
        </View>
      )}

      {/* Results */}
      {showResult && (
        <SpeakingResults
          isCorrect={isCorrect}
          accuracy={accuracy}
          recognizedText={recognizedText}
        />
      )}

      {/* Action Buttons */}
      {showResult && (
        <SpeakingActionButtons
          onContinue={handleNext}
          onTryAgain={handleTryAgain}
          showTryAgain={!isCorrect}
        />
      )}
    </View>
  );
}
