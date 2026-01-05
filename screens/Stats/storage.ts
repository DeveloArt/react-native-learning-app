import AsyncStorage from '@react-native-async-storage/async-storage';

export const STUDY_STATS_KEY = 'study_stats_v1';

export type StudyDaysMap = Record<string, number>;

export interface StudyStats {
  days: StudyDaysMap;
}

const todayKey = (d = new Date()) => d.toISOString().slice(0, 10);

export async function getStudyStats(): Promise<StudyStats> {
  try {
    const raw = await AsyncStorage.getItem(STUDY_STATS_KEY);
    if (!raw) return { days: {} };
    return JSON.parse(raw) as StudyStats;
  } catch (e) {
    console.error('Error reading study stats', e);
    return { days: {} };
  }
}

export async function saveStudyStats(stats: StudyStats): Promise<void> {
  try {
    await AsyncStorage.setItem(STUDY_STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Error saving study stats', e);
  }
}

export async function addLearnedToday(inc = 1): Promise<StudyStats> {
  const stats = await getStudyStats();
  const key = todayKey();
  const current = stats.days[key] || 0;
  stats.days[key] = current + inc;
  await saveStudyStats(stats);
  return stats;
}

export function lastNDaysKeys(n: number, fromDate = new Date()) {
  const keys: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(fromDate);
    d.setDate(d.getDate() - i);
    keys.push(todayKey(d));
  }
  return keys;
}

export function computeStreak(days: StudyDaysMap, fromDate = new Date()) {
  let streak = 0;
  const oneDay = 24 * 60 * 60 * 1000;
  let cur = new Date(fromDate);
  while (true) {
    const key = todayKey(cur);
    if ((days[key] || 0) >= 1) {
      streak += 1;
      cur = new Date(cur.getTime() - oneDay);
      continue;
    }
    break;
  }
  return streak;
}
