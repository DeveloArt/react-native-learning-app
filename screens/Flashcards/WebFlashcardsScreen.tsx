import { ThemedText } from '@/components/typography/ThemedText';
import { explainWord } from '@/services/geminiService';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebFlashcard } from './components/WebFlashcard';
import { WebFlashcardButtons } from './components/WebFlashcardButtons';

const CARDS = [
  { id: '1', spanish: 'La Manzana', english: 'Apple', polish: 'Jabłko', type: 'Noun, feminine', example: 'Me gusta comer una manzana roja.' },
  { id: '2', spanish: 'El Libro', english: 'Book', polish: 'Książka', type: 'Noun, masculine', example: 'Leo un libro interesante.' },
  { id: '3', spanish: 'Comer', english: 'To eat', polish: 'Jeść', type: 'Verb', example: 'Quiero comer pizza hoy.' },
];

export function WebFlashcardsScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + 2;
  const paddingBottom = insets.bottom + 10;
  
  const [index, setIndex] = useState(0);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  
  const currentCard = CARDS[index];

  const handleNext = () => {
    if (index < CARDS.length - 1) {
      setIndex(index + 1);
      setExplanation(null);
    } else {
      router.push('/(tabs)/stats');
    }
  };

  const askAi = async () => {
    setLoadingAi(true);
    try {
      const exp = await explainWord(currentCard.spanish);
      setExplanation(exp);
    } catch (error) {
      setExplanation("The AI assistant is currently resting. Try again later!");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <View 
      className="flex-1 bg-surfaceSecondary dark:bg-surfaceSecondary-dark"
      style={{ paddingTop, paddingBottom }}
    >
      <ScrollView className="flex-1">
        {/* Top Bar */}
        <View className="flex-row items-center px-4 pb-2 justify-between">
          <TouchableOpacity onPress={() => router.push('/(tabs)')} className="w-12 flex-row items-center justify-start">
            <MaterialCommunityIcons name="close" size={24} />
          </TouchableOpacity>
          <ThemedText weight="bold" className="text-lg flex-1 text-center pr-12">
            Vocabulary: Basics 1
          </ThemedText>
        </View>

        {/* Progress */}
        <View className="px-4 pt-0">
          <View className="flex-row justify-between items-center mb-1">
            <ThemedText size="small" className="text-textSecondary dark:text-textSecondary-dark font-bold uppercase tracking-wider">
              Session Progress
            </ThemedText>
            <ThemedText weight="bold" className="text-sm">
              {index + 1} / {CARDS.length}
            </ThemedText>
          </View>
          <View className="rounded-full bg-slate-200 dark:bg-slate-700 h-2.5 overflow-hidden">
            <View 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${((index + 1) / CARDS.length) * 100}%` }}
            ></View>
          </View>
        </View>

        {/* Card Content */}
        <WebFlashcard 
          card={currentCard}
          onAskAI={askAi}
          explanation={explanation}
          loadingAi={loadingAi}
        />
      </ScrollView>

      {/* Footer Actions */}
      <WebFlashcardButtons 
        onUnknown={handleNext}
        onKnown={handleNext}
      />
    </View>
  );
}
