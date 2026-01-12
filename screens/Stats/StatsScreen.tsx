import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { ProgressChart } from './components/ProgressChart';
import { StreakCard } from './components/StreakCard';
import { SummaryCards } from './components/SummaryCards';
import { computeStreak, getStudyStats, lastNDaysKeys, StudyStats } from './storage';

export function StatsScreen() {
  const [stats, setStats] = useState<StudyStats>({ days: {} });

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      (async () => {
        const s = await getStudyStats();
        if (mounted) setStats(s);
      })();
      return () => {
        mounted = false;
      };
    }, []),
  );

  const last7Keys = useMemo(() => lastNDaysKeys(7), []);

  const progress7d = useMemo(() => {
    const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return last7Keys.map((k) => {
      const d = new Date(k);
      const wk = weekdays[d.getDay()];
      return { labelKey: wk, value: stats.days[k] ? Math.min(stats.days[k] / 5, 1) : 0 };
    });
  }, [last7Keys, stats]);

  const summaryStats = useMemo(() => {
    const totalLearned = Object.values(stats.days).reduce((a, b) => a + b, 0);
    const studyDays = Object.values(stats.days).filter((v) => v > 0).length;
    const dayStreak = computeStreak(stats.days);
    return [
      { value: totalLearned, labelKey: 'learned' },
      { value: studyDays, labelKey: 'studyDays' },
      { value: dayStreak, labelKey: 'dayStreak' },
    ];
  }, [stats]);

  const { t } = useTranslation();

  const streakInfo = useMemo(() => {
    const days = computeStreak(stats.days);
    return {
      days,
      message: days > 0 ? t('stats.keepItUp') : t('stats.startLearning'),
    };
  }, [stats, t]);

  return (
    <ScrollView className="flex-1 px-4 py-4 bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
      <SummaryCards stats={summaryStats} />
      <StreakCard streak={streakInfo} />
      <ProgressChart points={progress7d} />
    </ScrollView>
  );
}
