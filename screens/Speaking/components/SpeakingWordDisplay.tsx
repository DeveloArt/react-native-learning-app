import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';
import type { SpeakingWord } from '../types/types';

interface Props {
  word: SpeakingWord;
  onPlayAudio?: () => void;
}

export function SpeakingWordDisplay({ word, onPlayAudio }: Props) {
  const colorScheme = useColorScheme();

  return (
    <View className="flex flex-col items-center mt-8">
      <View className="flex items-center gap-3">
        <View className="px-4">
          <View className="text-center">
            <View
              className={`${colorScheme === 'dark' ? 'text-white' : 'text-[#0d141b]'} tracking-tight text-[48px] font-bold leading-tight text-center`}
            >
              {word.word}
            </View>
          </View>
        </View>
        <Pressable
          onPress={onPlayAudio}
          className={`${colorScheme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-500/10'} p-2 rounded-full`}
        >
          <MaterialCommunityIcons name="volume-high" size={24} color="#2b8cee" />
        </Pressable>
      </View>
      <View className="px-4 text-center pt-2">
        <View
          className={`${colorScheme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xl font-medium leading-tight tracking-[-0.015em] text-center`}
        >
          {word.translationPl}
        </View>
      </View>
    </View>
  );
}
