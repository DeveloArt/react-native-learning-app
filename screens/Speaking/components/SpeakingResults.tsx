import { ThemedText } from '@/components/typography/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';

interface Props {
  isCorrect?: boolean;
  accuracy?: number;
  recognizedText?: string;
}

export function SpeakingResults({ isCorrect = false, accuracy = 0, recognizedText }: Props) {
  const colorScheme = useColorScheme();

  if (!isCorrect && accuracy === 0) {
    return null;
  }

  return (
    <View
      className={`mx-6 p-6 rounded-xl shadow-sm border flex flex-col items-center gap-4 ${
        colorScheme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
      }`}
    >
      <View className="flex items-center justify-between w-full">
        <View className="flex flex-col">
          <ThemedText className="text-xs uppercase tracking-widest font-bold" color="icon">
            Accuracy
          </ThemedText>
          <ThemedText className="text-3xl font-bold" color="tint">
            {accuracy}%
          </ThemedText>
        </View>
        <View
          className={`px-4 py-2 rounded-full flex items-center gap-2 ${
            isCorrect
              ? colorScheme === 'dark'
                ? 'bg-green-900/30 text-green-400'
                : 'bg-green-100 text-green-600'
              : colorScheme === 'dark'
                ? 'bg-red-900/30 text-red-400'
                : 'bg-red-100 text-red-600'
          }`}
        >
          <MaterialCommunityIcons
            name={isCorrect ? 'check-circle' : 'close-circle'}
            size={18}
            className="font-bold"
          />
          <ThemedText className="font-bold">{isCorrect ? 'Correct!' : 'Try again'}</ThemedText>
        </View>
      </View>

      {/* Result Bar Visualization */}
      <View className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <View
          className={`h-full rounded-full ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
          style={{ width: `${accuracy}%` }}
        />
      </View>

      {recognizedText && (
        <View className="w-full">
          <ThemedText className="text-sm text-center" color="icon">
            You said: &quot;{recognizedText}&quot;
          </ThemedText>
        </View>
      )}
    </View>
  );
}
