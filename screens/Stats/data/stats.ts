import type { ProgressPoint, StreakInfo, SummaryStat } from '../types/types';

export const summaryStats: SummaryStat[] = [
  { value: 120, labelKey: 'learned' },
  { value: 30, labelKey: 'studyDays' },
  { value: 7, labelKey: 'dayStreak' },
];

export const streakInfo: StreakInfo = {
  days: 7,
  messageKey: 'stats.streakMessage',
};

export const progress7d: ProgressPoint[] = [
  { labelKey: 'mon', value: 0.6 },
  { labelKey: 'tue', value: 0.8 },
  { labelKey: 'wed', value: 0.5 },
  { labelKey: 'thu', value: 0.9 },
  { labelKey: 'fri', value: 0.7 },
  { labelKey: 'sat', value: 0.4 },
  { labelKey: 'sun', value: 1.0, highlight: true },
];
