import { ThemedText } from '@/components/typography/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

export interface FlashcardData {
  id: string;
  frontWord: string;
  frontType?: string; // e.g., "Noun, feminine"
  translation: string;
  exampleSentence: string;
  icon?: string;
}

interface Props {
  data: FlashcardData;
  showBack?: boolean;
  onAudioPress?: () => void;
  className?: string;
}

export function Flashcard({ data, showBack = false, onAudioPress, className = '' }: Props) {
  const scheme = useColorScheme();

  return (
    <View
      className={`flex flex-col items-center justify-between rounded-xl shadow-[0_12px_24px_rgba(0,0,0,0.08)] bg-white dark:bg-slate-800 p-8 min-h-[400px] border border-slate-100 dark:border-slate-700 relative overflow-hidden ${className}`}
    >
      {/* Front Side Content */}
      <View className="flex flex-col items-center w-full gap-6">
        {/* Icon */}
        <View className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
          <MaterialIcons name="restaurant" size={48} className="text-primary" />
        </View>

        {/* Word and Type */}
        <View className="text-center">
          <ThemedText weight="bold" className="text-4xl mb-2">
            {data.frontWord}
          </ThemedText>
          {data.frontType && (
            <ThemedText className="text-lg opacity-70">{data.frontType}</ThemedText>
          )}
        </View>

        {/* Audio Button */}
        <Pressable
          onPress={onAudioPress}
          className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 active:scale-95 transition-transform"
        >
          <MaterialIcons name="volume-up" size={24} className="text-white" />
        </Pressable>
      </View>

      {/* Divider */}
      <View className="w-full border-t border-dashed border-slate-200 dark:border-slate-700 my-8" />

      {/* Back Side Content */}
      {showBack && (
        <View className="w-full flex flex-col gap-4">
          {/* Translation */}
          <View className="flex flex-col items-center">
            <ThemedText weight="bold" className="text-xl text-center">
              {data.translation}
            </ThemedText>
            <View className="h-1 w-8 bg-primary rounded-full mt-1" />
          </View>

          {/* Example Sentence */}
          <ThemedText className="text-base italic leading-relaxed text-center px-4 opacity-70">
            {data.exampleSentence}
          </ThemedText>
        </View>
      )}

      {/* Info Icon */}
      <View className="absolute top-4 right-4 opacity-30">
        <MaterialIcons name="info" size={20} className="text-slate-300 dark:text-slate-600" />
      </View>
    </View>
  );
}
