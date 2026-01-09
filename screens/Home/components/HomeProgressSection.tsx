import { ThemedText } from '@/components/typography/ThemedText';
import { View } from 'react-native';

export function HomeProgressSection() {
  return (
    <>
      <ThemedText weight="bold" className="text-lg px-4 pb-2 pt-4">
        Your Progress
      </ThemedText>
      <View className="px-4 flex-col gap-4 pb-10">
        {/* Words Learned Bar */}
        <View className="bg-white dark:bg-surfacePrimary-dark p-4 rounded-2xl border border-border dark:border-border-dark">
          <View className="flex-row justify-between items-end mb-2">
            <ThemedText weight="bold" className="text-sm">
              Words Learned
            </ThemedText>
            <ThemedText
              size="small"
              weight="medium"
              className="text-textSecondary dark:text-textSecondary-dark"
            >
              450 / 1000
            </ThemedText>
          </View>
          <View className="w-full bg-surfaceTertiary dark:bg-surfaceTertiary-dark h-3 rounded-full overflow-hidden">
            <View
              className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(43,140,238,0.3)]"
              style={{ width: '45%' }}
            />
          </View>
        </View>

        {/* Daily Goal Bar */}
        <View className="bg-white dark:bg-surfacePrimary-dark p-4 rounded-2xl border border-border dark:border-border-dark">
          <View className="flex-row justify-between items-end mb-2">
            <ThemedText weight="bold" className="text-sm">
              Daily Goal
            </ThemedText>
            <ThemedText size="small" weight="medium" className="text-primary">
              80%
            </ThemedText>
          </View>
          <View className="w-full bg-surfaceTertiary dark:bg-surfaceTertiary-dark h-3 rounded-full overflow-hidden">
            <View
              className="bg-emerald-500 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
              style={{ width: '80%' }}
            />
          </View>
          <ThemedText
            size="small"
            className="text-textSecondary dark:text-textSecondary-dark mt-2 italic text-[11px]"
          >
            Almost there! Just 5 more minutes to reach your goal.
          </ThemedText>
        </View>
      </View>
    </>
  );
}
