import { ThemedText } from '@/components/typography/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

interface WebFlashcardButtonsProps {
  onUnknown: () => void;
  onKnown: () => void;
}

export function WebFlashcardButtons({ onUnknown, onKnown }: WebFlashcardButtonsProps) {
  return (
    <View className="px-6 flex-row gap-4 bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
      <TouchableOpacity 
        onPress={onUnknown}
        className="flex-1 flex-col items-center justify-center gap-2 h-20 bg-red-500 rounded-xl shadow-lg"
      >
        <MaterialCommunityIcons name="close" size={24} color="white" />
        <ThemedText weight="bold" className="text-white text-xs uppercase tracking-widest">
          Unknown
        </ThemedText>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={onKnown}
        className="flex-1 flex-col items-center justify-center gap-2 h-20 bg-green-500 rounded-xl shadow-lg"
      >
        <MaterialCommunityIcons name="check" size={24} color="white" />
        <ThemedText weight="bold" className="text-white text-xs uppercase tracking-widest">
          Known
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}
