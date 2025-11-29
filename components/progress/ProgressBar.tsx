import { ThemedText } from '@/components/typography/ThemedText';
import type { ProgressBarProps } from '@/types/types';
import { View } from 'react-native';
export function ProgressBar({
  progress,
  height = 6,
  trackClassName,
  fillClassName,
  showPercent = false,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  const percent = Math.round(clamped * 100);

  if (!showPercent) {
    return (
      <View
        className={trackClassName ?? 'rounded-full bg-surfaceTertiary dark:bg-surfaceTertiary-dark'}
        style={{ height }}
      >
        <View
          className={fillClassName ?? 'rounded-full bg-surfaceActionSecondary'}
          style={{ height, width: `${clamped * 100}%` }}
        />
      </View>
    );
  }

  const fillClass = fillClassName ?? 'rounded-full bg-surfaceActionSecondary';
  const derivedTextClass = (fillClass || '').includes('bg-')
    ? fillClass.replace(/bg-/, 'text-')
    : 'text-surfaceActionSecondary';

  return (
    <View className="flex-col items-center">
      <View
        className={trackClassName ?? 'rounded-full bg-surfaceTertiary dark:bg-surfaceTertiary-dark'}
        style={{ height, width: '100%' }}
      >
        <View className={fillClass} style={{ height, width: `${clamped * 100}%` }} />
      </View>
      <ThemedText size="medium" weight="medium" className={`mt-2 ${derivedTextClass}`}>
        {percent}%
      </ThemedText>
    </View>
  );
}
