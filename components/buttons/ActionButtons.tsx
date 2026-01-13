import { ThemedText } from '@/components/typography/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

interface Props {
  onUnknownPress?: () => void;
  onKnownPress?: () => void;
  disabled?: boolean;
}

export function ActionButtons({ onUnknownPress, onKnownPress, disabled = false }: Props) {
  return (
    <View className="p-6 flex gap-4">
      {/* Unknown Button */}
      <Pressable
        onPress={onUnknownPress}
        disabled={disabled}
        className={`flex-1 flex flex-col items-center justify-center gap-2 h-20 rounded-xl shadow-lg active:scale-[0.98] transition-all ${
          disabled ? 'bg-gray-300 dark:bg-gray-700' : 'bg-danger text-white shadow-danger/20'
        }`}
      >
        <MaterialIcons
          name="close"
          size={24}
          className={disabled ? 'text-gray-500' : 'text-white'}
        />
        <ThemedText
          weight="bold"
          className={`text-xs uppercase tracking-widest ${
            disabled ? 'text-gray-500' : 'text-white'
          }`}
        >
          Unknown
        </ThemedText>
      </Pressable>

      {/* Known Button */}
      <Pressable
        onPress={onKnownPress}
        disabled={disabled}
        className={`flex-1 flex flex-col items-center justify-center gap-2 h-20 rounded-xl shadow-lg active:scale-[0.98] transition-all ${
          disabled ? 'bg-gray-300 dark:bg-gray-700' : 'bg-success text-white shadow-success/20'
        }`}
      >
        <MaterialIcons
          name="check"
          size={24}
          className={disabled ? 'text-gray-500' : 'text-white'}
        />
        <ThemedText
          weight="bold"
          className={`text-xs uppercase tracking-widest ${
            disabled ? 'text-gray-500' : 'text-white'
          }`}
        >
          Known
        </ThemedText>
      </Pressable>
    </View>
  );
}
