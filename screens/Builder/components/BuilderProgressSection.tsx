import { ProgressBar } from '@/components/progress/ProgressBar';
import { ThemedText } from '@/components/typography/ThemedText';
import { TouchableOpacity, View } from 'react-native';
import type { BuilderProgress } from '../types/types';

export function BuilderProgressSection({ progress }: { progress: BuilderProgress }) {
  const ratio = progress.total > 0 ? progress.current / progress.total : 0;

  return (
    <View className="flex-row items-center justify-between p-4 pb-2">
      <View className="flex-1 flex-col gap-1 px-2">
        <View className="flex-row gap-6 justify-between">
          <ThemedText size="small" className="text-textSecondary dark:text-textSecondary-dark">
            Lesson {progress.current} of {progress.total}
          </ThemedText>
        </View>
        <ProgressBar progress={ratio} height={10} />
      </View>
      <View className="w-12 items-end">
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full">
          <ThemedText className="text-2xl">💡</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
