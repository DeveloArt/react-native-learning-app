import { View } from 'react-native';
import type { SpeakingProgress } from '../types/types';

export function SpeakingProgressSection({ progress }: { progress: SpeakingProgress }) {
  const ratio = progress.total > 0 ? progress.current / progress.total : 0;
  return (
    <View className="px-6 py-2">
      <View className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
        <View className="bg-blue-500 h-full rounded-full" style={{ width: `${ratio * 100}%` }} />
      </View>
    </View>
  );
}
