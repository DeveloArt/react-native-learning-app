import { ThemedText } from '@/components/typography/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import type { BuilderProgress } from '../types/types';

interface Props {
  progress: BuilderProgress;
  onHint?: () => void;
}

export function BuilderProgressSection({ progress, onHint }: Props) {
  const ratio = progress.total > 0 ? progress.current / progress.total : 0;

  return (
    <View className="flex-row items-center justify-between py-4 pb-2">
      <View className="flex-1 flex-col gap-1 px-2">
        <View className="flex-row gap-6 justify-between">
          <ThemedText className="text-xs font-medium leading-normal">
            Lesson {progress.current} of {progress.total}
          </ThemedText>
        </View>
        <View className="rounded-full bg-gray-200 dark:bg-gray-700 h-2.5 w-full overflow-hidden">
          <View className="h-full rounded-full bg-primary" style={{ width: `${ratio * 100}%` }} />
        </View>
      </View>
      <View className="w-12 items-end justify-center">
        {onHint && (
          <View className="cursor-pointer">
            <MaterialIcons name="lightbulb-outline" size={24} onPress={onHint} />
          </View>
        )}
      </View>
    </View>
  );
}
