import { ThemedText } from '@/components/typography/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import type { FlashcardButtonsProps } from '../types/types';

export function FlashcardButtons({ onUnknown, onKnown }: FlashcardButtonsProps) {
  const { t } = useTranslation();
  return (
    <View className="flex-row gap-4 p-6 bg-background-light dark:bg-background-dark">
      {/* Unknown Button */}
      <Pressable
        onPress={onUnknown}
        className="flex-1 flex-col items-center justify-center gap-2 h-20 bg-danger text-white rounded-xl shadow-lg shadow-danger/20 active:scale-[0.98] transition-all"
      >
        <MaterialCommunityIcons name="close" size={24} color="white" />
        <ThemedText className="text-white text-xs font-bold uppercase tracking-widest">
          {t('flashcards.unknown') || 'Unknown'}
        </ThemedText>
      </Pressable>

      {/* Known Button */}
      <Pressable
        onPress={onKnown}
        className="flex-1 flex-col items-center justify-center gap-2 h-20 bg-success text-white rounded-xl shadow-lg shadow-success/20 active:scale-[0.98] transition-all"
      >
        <MaterialCommunityIcons name="check" size={24} color="white" />
        <ThemedText className="text-white text-xs font-bold uppercase tracking-widest">
          {t('flashcards.known') || 'Known'}
        </ThemedText>
      </Pressable>
    </View>
  );
}
