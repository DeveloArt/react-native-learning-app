import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

interface Props {
  onPressIn?: () => void;
  onPressOut?: () => void;
  isRecording?: boolean;
  isProcessing?: boolean;
}

export function SpeakingMicButton({
  onPressIn,
  onPressOut,
  isRecording = false,
  isProcessing = false,
}: Props) {
  const colorScheme = useColorScheme();

  return (
    <View className="flex-1 flex flex-col items-center justify-center py-12">
      <View className="relative flex items-center justify-center">
        {/* Background Pulse Rings */}
        {isRecording && (
          <>
            <View className="absolute w-40 h-40 bg-blue-500/20 rounded-full scale-110" />
            <View className="absolute w-48 h-48 bg-blue-500/10 rounded-full scale-125" />
          </>
        )}

        {/* Microphone Button */}
        <View className="flex px-4 py-3 justify-center relative z-10">
          <Pressable
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            className={`flex size-24 cursor-pointer items-center justify-center overflow-hidden rounded-full shadow-lg active:scale-95 transition-transform ${
              isRecording
                ? 'bg-red-500 shadow-red-500/30'
                : isProcessing
                  ? 'bg-blue-500 shadow-blue-500/30'
                  : 'bg-blue-500 shadow-blue-500/30'
            }`}
          >
            <MaterialCommunityIcons
              name={isRecording ? 'microphone' : 'microphone-outline'}
              size={40}
              color="#fff"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
