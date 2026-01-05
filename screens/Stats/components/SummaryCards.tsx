import { ThemedText } from '@/components/typography/ThemedText';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import type { SummaryStat } from '../types/types';

export const SummaryCards = memo(function SummaryCards({ stats }: { stats: SummaryStat[] }) {
  const { t } = useTranslation();
  return (
    <View className="flex-row gap-3 mt-2">
      {stats.map((stat) => (
        <View
          key={stat.labelKey}
          className="flex-1 justify-center items-center px-3 py-4 rounded-2xl bg-surfacePrimary dark:bg-surfacePrimary-dark"
        >
          <ThemedText weight="bold" className="text-[28px]">
            {stat.value}
          </ThemedText>
          <ThemedText size="small" className="text-textSecondary dark:text-textSecondary-dark">
            {t(`stats.summary.${stat.labelKey}`)}
          </ThemedText>
        </View>
      ))}
    </View>
  );
});
