export interface SummaryStat {
  value: number;
  labelKey: string; // i18n key under stats.summary
}

export interface StreakInfo {
  days: number;
  messageKey?: string;
}

export interface ProgressPoint {
  labelKey: string; // i18n key under weekdays
  value: number; // 0..1 normalized height
  highlight?: boolean;
}
