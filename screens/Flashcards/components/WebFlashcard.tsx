import { ThemedText } from '@/components/typography/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

interface FlashcardData {
  id: string;
  spanish: string;
  english: string;
  polish: string;
  type: string;
  example: string;
}

interface WebFlashcardProps {
  card: FlashcardData;
  onAskAI?: () => void;
  explanation?: string | null;
  loadingAi?: boolean;
}

export function WebFlashcard({ card, onAskAI, explanation, loadingAi }: WebFlashcardProps) {
  return (
    <View className="flex-col justify-center px-4 py-4">
      <View className="flex-col items-center justify-between rounded-xl shadow-xl bg-white dark:bg-surfaceSecondary-dark p-8 min-h-[420px] border border-slate-100 dark:border-slate-700 relative">
        <View className="flex-col items-center w-full gap-6">
          <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center">
            <MaterialCommunityIcons name="food-apple" size={48} color="#0d59f2" />
          </View>
          <View className="text-center">
            <ThemedText weight="bold" className="text-4xl mb-2">
              {card.spanish}
            </ThemedText>
            <ThemedText 
              size="large" 
              className="text-textSecondary dark:text-textSecondary-dark"
            >
              {card.type}
            </ThemedText>
          </View>
          <TouchableOpacity className="w-14 h-14 bg-primary rounded-full shadow-lg flex-row items-center justify-center">
            <MaterialCommunityIcons name="volume-high" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View className="w-full border-t border-dashed border-slate-200 dark:border-slate-700 my-8"></View>
        
        <View className="w-full flex-col gap-4">
          <View className="flex-col items-center">
            <ThemedText weight="bold" className="text-xl text-center">
              {card.english} / {card.polish}
            </ThemedText>
            <View className="h-1 w-8 bg-primary rounded-full mt-1"></View>
          </View>
          <ThemedText 
            size="small" 
            className="text-textSecondary dark:text-textSecondary-dark italic leading-relaxed text-center px-4"
          >
            "{card.example}"
          </ThemedText>
        </View>

        {onAskAI && (
          <TouchableOpacity 
            onPress={onAskAI}
            className="absolute top-4 right-4 text-textSecondary dark:text-textSecondary-dark"
          >
            <MaterialCommunityIcons name="information" size={20} />
          </TouchableOpacity>
        )}
      </View>

      {/* AI Insight */}
      {loadingAi && (
        <ThemedText className="text-center text-primary mt-4 text-sm animate-pulse">
          Consulting Gemini AI...
        </ThemedText>
      )}
      {explanation && (
        <View className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
          <ThemedText weight="bold" className="text-primary block mb-1 text-xs">
            AI Explanation:
          </ThemedText>
          <ThemedText size="small" className="leading-relaxed">
            {explanation}
          </ThemedText>
        </View>
      )}
    </View>
  );
}
