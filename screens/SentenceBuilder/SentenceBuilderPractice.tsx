import { ThemedText } from '@/components/typography/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getLessonProgress, sentenceData, shuffleArray } from './data/sentenceData';
import { WordChip } from './types/sentenceBuilderTypes';

const { width, height } = Dimensions.get('window');

const SentenceBuilderPractice = () => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentSentence = sentenceData[currentSentenceIndex];
  const lessonProgress = getLessonProgress(currentSentenceIndex, sentenceData.length);

  const allWords: WordChip[] = shuffleArray([
    ...currentSentence.targetWords.map((word) => ({
      id: word,
      text: word,
      isSelected: selectedWords.includes(word),
    })),
    ...currentSentence.distractorWords.map((word) => ({
      id: word,
      text: word,
      isSelected: selectedWords.includes(word),
    })),
  ]);

  const handleWordPress = useCallback(
    (word: string) => {
      if (showFeedback) return;

      if (selectedWords.includes(word)) {
        setSelectedWords((prev) => prev.filter((w) => w !== word));
      } else {
        setSelectedWords((prev) => [...prev, word]);
      }
    },
    [selectedWords, showFeedback],
  );

  const handleCheck = useCallback(() => {
    const isCorrect =
      JSON.stringify(selectedWords) === JSON.stringify(currentSentence.correctOrder);
    setShowFeedback(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      if (currentSentenceIndex === sentenceData.length - 1) {
        setIsCompleted(true);
      } else {
        setTimeout(() => {
          setCurrentSentenceIndex((prev) => prev + 1);
          setSelectedWords([]);
          setShowFeedback(null);
        }, 2000);
      }
    } else {
      setTimeout(() => {
        setShowFeedback(null);
      }, 2000);
    }
  }, [selectedWords, currentSentence.correctOrder, currentSentenceIndex]);

  const handleSkip = useCallback(() => {
    if (currentSentenceIndex < sentenceData.length - 1) {
      setCurrentSentenceIndex((prev) => prev + 1);
      setSelectedWords([]);
      setShowFeedback(null);
    }
  }, [currentSentenceIndex]);

  const handleReset = useCallback(() => {
    setSelectedWords([]);
    setShowFeedback(null);
  }, []);

  const handleNext = useCallback(() => {
    if (currentSentenceIndex < sentenceData.length - 1) {
      setCurrentSentenceIndex((prev) => prev + 1);
      setSelectedWords([]);
      setShowFeedback(null);
      setIsCompleted(false);
    }
  }, [currentSentenceIndex]);

  const isDark = colorScheme === 'dark';
  const bgColor = isDark ? '#101922' : '#f6f7f8';
  const textColor = isDark ? '#ffffff' : '#0d141b';
  const borderColor = isDark ? '#334155' : '#cfdbe7';
  const chipBg = isDark ? '#1e293b' : '#ffffff';
  const feedbackBg = showFeedback === 'correct' ? '#10b981' : '#ef4444';

  if (isCompleted) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={bgColor} />

        <View className="flex-1 items-center justify-center px-4">
          <View className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 items-center justify-center mb-8">
            <MaterialCommunityIcons name="trophy" size={48} color="#10b981" />
          </View>

          <ThemedText className="text-3xl font-bold text-center mb-4">Lesson Complete!</ThemedText>

          <Text style={{ color: textColor, opacity: 0.7 }} className="text-center text-lg mb-8">
            You&apos;ve completed all {sentenceData.length} sentences. Great job!
          </Text>

          <TouchableOpacity
            onPress={handleNext}
            className="px-8 py-4 bg-primary rounded-xl shadow-lg"
          >
            <Text className="text-white font-bold text-lg">Continue Learning</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={bgColor} />

      {/* Header */}
      <View className="flex-row items-center justify-between p-4 pb-2">
        <TouchableOpacity className="w-12 h-12 items-center justify-center">
          <MaterialCommunityIcons name="close" size={24} color={textColor} />
        </TouchableOpacity>

        <View className="flex-1 flex-col gap-1 px-2">
          <View className="flex-row justify-between">
            <Text style={{ color: textColor }} className="text-xs font-medium">
              Lesson {currentSentenceIndex + 1} of {sentenceData.length}
            </Text>
          </View>
          <View className="h-2.5 w-full bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <View
              className="h-full bg-primary rounded-full"
              style={{ width: `${lessonProgress}%` }}
            />
          </View>
        </View>

        <TouchableOpacity className="w-12 h-12 items-center justify-center">
          <MaterialCommunityIcons name="lightbulb" size={24} color={textColor} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-1 px-4" style={{ maxWidth: 400, alignSelf: 'center', width: '100%' }}>
        {/* Instruction */}
        <ThemedText className="text-2xl font-bold leading-tight text-left pb-2 pt-8">
          Translate this sentence
        </ThemedText>

        {/* Source Sentence Card */}
        <View className="flex-row items-center gap-4 mt-4 mb-8">
          <View className="w-16 h-16 rounded-2xl bg-primary/10 items-center justify-center">
            <MaterialCommunityIcons name="volume-high" size={32} color="#2b8cee" />
          </View>
          <View className="flex-1">
            <Text style={{ color: textColor }} className="text-xl font-medium leading-snug">
              {currentSentence.source}
            </Text>
            <Text style={{ color: textColor, opacity: 0.6 }} className="text-sm italic">
              {currentSentence.translation}
            </Text>
          </View>
        </View>

        {/* Assembly Area */}
        <View className="flex-col min-h-[160px] justify-center items-center">
          <View
            className={`w-full flex flex-wrap gap-2 items-center justify-center py-8 border-y-2 border-dashed ${borderColor}`}
          >
            {selectedWords.length > 0 ? (
              <View className="flex-row flex-wrap gap-2 justify-center">
                {selectedWords.map((word, index) => (
                  <TouchableOpacity
                    key={`${word}-${index}`}
                    onPress={() => handleWordPress(word)}
                    className="px-4 py-2 rounded-xl bg-primary/20 border-2 border-primary"
                  >
                    <Text className="text-primary font-medium">{word}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text
                style={{ color: textColor, opacity: 0.4 }}
                className="text-sm font-normal text-center max-w-[200px]"
              >
                Tap the words below to build the sentence
              </Text>
            )}
          </View>
        </View>

        {/* Word Pool */}
        <View className="mt-auto pt-10">
          <FlatList
            data={allWords}
            numColumns={3}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{ justifyContent: 'center', gap: 12 }}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleWordPress(item.text)}
                disabled={showFeedback !== null}
                className={`px-4 py-3 rounded-xl border-2 ${borderColor} ${chipBg} ${item.isSelected ? 'bg-primary/20 border-primary' : ''} shadow-sm`}
                style={{ minWidth: 80, alignItems: 'center' }}
              >
                <Text style={{ color: textColor }} className="font-medium">
                  {item.text}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      {/* Bottom Action Area */}
      <View
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{ backgroundColor: bgColor, borderTopWidth: 1, borderTopColor: borderColor }}
      >
        <View style={{ maxWidth: 400, alignSelf: 'center', width: '100%' }}>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleSkip}
              className="flex-1 h-14 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-transparent items-center justify-center"
            >
              <Text
                style={{ color: textColor }}
                className="font-bold uppercase tracking-wider text-sm"
              >
                Skip
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleReset}
              className="flex-1 h-14 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-transparent items-center justify-center"
            >
              <Text
                style={{ color: textColor }}
                className="font-bold uppercase tracking-wider text-sm"
              >
                Reset
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCheck}
              disabled={selectedWords.length === 0 || showFeedback !== null}
              className={`flex-1 h-14 rounded-xl ${selectedWords.length === 0 || showFeedback !== null ? 'bg-gray-400' : 'bg-primary'} items-center justify-center shadow-lg`}
            >
              <Text className="text-white font-bold uppercase tracking-wider text-sm">Check</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="h-6" />
      </View>

      {/* Feedback Overlay */}
      {showFeedback && (
        <View
          className="absolute bottom-0 left-0 right-0 p-6 rounded-t-xl"
          style={{ backgroundColor: feedbackBg + '20' }}
        >
          <View style={{ maxWidth: 400, alignSelf: 'center', width: '100%' }}>
            <View className="flex-row items-center gap-4">
              <View
                className={`w-10 h-10 rounded-full items-center justify-center`}
                style={{ backgroundColor: feedbackBg }}
              >
                <MaterialCommunityIcons
                  name={showFeedback === 'correct' ? 'check' : 'close'}
                  size={20}
                  color="white"
                />
              </View>
              <View className="flex-1">
                <Text style={{ color: feedbackBg }} className="font-bold text-lg">
                  {showFeedback === 'correct' ? 'Excellent!' : 'Try Again'}
                </Text>
                <Text style={{ color: feedbackBg, opacity: 0.8 }} className="text-sm">
                  {showFeedback === 'correct'
                    ? 'You translated it correctly.'
                    : "That's not quite right. Try again!"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SentenceBuilderPractice;
