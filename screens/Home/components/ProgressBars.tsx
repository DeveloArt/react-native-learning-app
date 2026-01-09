import { ThemedText } from '@/components/typography/ThemedText';
import { View } from 'react-native';

export function ProgressBars() {
  return (
    <View className="px-4 pb-2 pt-4">
      <ThemedText weight="bold" className="text-lg">
        Your Progress
      </ThemedText>
      <View className="flex-col gap-4 mt-3">
        <View className="bg-white dark:bg-surfaceSecondary-dark p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
          <View className="flex-row justify-between items-end mb-2">
            <ThemedText weight="bold" className="text-sm">
              Words Learned
            </ThemedText>
            <ThemedText 
              size="small" 
              className="text-textSecondary dark:text-textSecondary-dark"
            >
              450 / 1000
            </ThemedText>
          </View>
          <View className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
            <View className="bg-primary h-full rounded-full" style={{ width: '45%' }}></View>
          </View>
        </View>
        
        <View className="bg-white dark:bg-surfaceSecondary-dark p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
          <View className="flex-row justify-between items-end mb-2">
            <ThemedText weight="bold" className="text-sm">
              Daily Goal
            </ThemedText>
            <ThemedText weight="bold" className="text-xs text-primary">
              80%
            </ThemedText>
          </View>
          <View className="w-full bg-slate-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
            <View className="bg-emerald-500 h-full rounded-full" style={{ width: '80%' }}></View>
          </View>
          <ThemedText 
            size="small" 
            className="text-textSecondary dark:text-textSecondary-dark mt-2 italic"
          >
            Almost there! Just 5 more minutes to reach your goal.
          </ThemedText>
        </View>
      </View>
    </View>
  );
}
