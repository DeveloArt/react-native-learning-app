import { ThemedText } from '@/components/typography/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

interface Props {
  onContinue?: () => void;
  onTryAgain?: () => void;
  showTryAgain?: boolean;
}

export function SpeakingActionButtons({ onContinue, onTryAgain, showTryAgain = true }: Props) {
  const colorScheme = useColorScheme();

  return (
    <View className="px-6 pt-8 pb-4 flex flex-col gap-3">
      <Pressable
        onPress={onContinue}
        className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-blue-500 shadow-md flex-row"
      >
        <ThemedText className="text-white text-lg font-bold" color="background">
          Continue
        </ThemedText>
        <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" className="ml-2" />
      </Pressable>

      {showTryAgain && (
        <Pressable
          onPress={onTryAgain}
          className={`flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 border ${
            colorScheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <ThemedText className="text-base font-bold">Try again</ThemedText>
        </Pressable>
      )}
    </View>
  );
}
