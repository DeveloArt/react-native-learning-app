import { ThemedText } from '@/components/typography/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import type { FlashcardButtonsProps } from '../types/types';

export function FlashcardButtons({ onUnknown, onKnown }: FlashcardButtonsProps) {
  const { t } = useTranslation();
  return (
    <View className="flex-row gap-4 p-6">
      {/* Unknown Button */}
      <TouchableOpacity
        onPress={onUnknown}
        className="flex-1 flex-col items-center justify-center gap-2 h-20 bg-danger text-white rounded-xl shadow-lg shadow-danger/20 active:scale-[0.98] transition-all"
      >
        <MaterialIcons name="close" size={24} color="white" />
        <ThemedText weight="bold" className="text-white text-xs uppercase tracking-widest">
          Unknown
        </ThemedText>
      </TouchableOpacity>

      {/* Known Button */}
      <TouchableOpacity
        onPress={onKnown}
        className="flex-1 flex-col items-center justify-center gap-2 h-20 bg-success text-white rounded-xl shadow-lg shadow-success/20 active:scale-[0.98] transition-all"
      >
        <MaterialIcons name="check" size={24} color="white" />
        <ThemedText weight="bold" className="text-white text-xs uppercase tracking-widest">
          Known
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}
