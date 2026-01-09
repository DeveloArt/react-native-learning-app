import { ThemedText } from '@/components/typography/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconColor?: string;
  progress?: number;
  subtitle?: string;
  fullWidth?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconColor = '#2b8cee',
  progress,
  subtitle,
  fullWidth = false,
}) => {
  const colorScheme = useColorScheme();

  return (
    <View
      className={`flex-col gap-2 rounded-xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm ${
        fullWidth ? 'col-span-2' : ''
      }`}
    >
      <View className="flex justify-between items-center">
        <ThemedText className="text-slate-500 dark:text-slate-400 text-sm font-medium">
          {title}
        </ThemedText>
        <MaterialCommunityIcons name={icon as any} size={20} color={iconColor} />
      </View>
      <ThemedText className="text-3xl font-bold leading-tight">{value}</ThemedText>
      {progress !== undefined && (
        <View className="flex-col gap-1">
          <View className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <View className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
          </View>
          {subtitle && <ThemedText className="text-[10px] text-slate-400">{subtitle}</ThemedText>}
        </View>
      )}
    </View>
  );
};

interface BarChartProps {
  data: number[];
  labels: string[];
  activeIndex?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, labels, activeIndex }) => {
  const maxValue = Math.max(...data);
  const colorScheme = useColorScheme();

  return (
    <View className="grid grid-cols-7 gap-3 items-end h-40 px-2">
      {data.map((value, index) => {
        const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
        const isActive = index === activeIndex;

        return (
          <View key={index} className="flex flex-col items-center gap-2 h-full">
            <View className="w-full bg-slate-100 dark:bg-slate-800 rounded-full relative overflow-hidden flex flex-col justify-end h-full">
              <View
                className={`w-full rounded-full ${
                  isActive ? 'bg-primary' : `bg-primary/${Math.floor(20 + (height / 100) * 60)}`
                }`}
                style={{ height: `${height}%` }}
              />
            </View>
            <ThemedText
              className={`text-[10px] font-bold ${isActive ? 'text-primary' : 'text-slate-400'}`}
            >
              {labels[index]}
            </ThemedText>
          </View>
        );
      })}
    </View>
  );
};

interface WordCardProps {
  word: string;
  translation: string;
  type: string;
}

const WordCard: React.FC<WordCardProps> = ({ word, translation, type }) => {
  const colorScheme = useColorScheme();

  return (
    <View className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <View className="flex items-center gap-4">
        <View className="bg-green-100 dark:bg-green-900/30 text-green-600 size-10 rounded-full flex items-center justify-center">
          <MaterialCommunityIcons name="check-decagram" size={20} color="#22c55e" />
        </View>
        <View>
          <ThemedText className="font-bold text-base">{word}</ThemedText>
          <ThemedText className="text-xs text-slate-500">{translation}</ThemedText>
        </View>
      </View>
      <View className="flex flex-col items-end">
        <View className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
          <ThemedText className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {type}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  // Mock data - in a real app this would come from your state management or API
  const weeklyActivityData = useMemo(
    () => ({
      data: [45, 52, 30, 95, 85, 25, 90],
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      activeIndex: 3, // Thursday is active
      totalMinutes: 120,
      increase: 15,
    }),
    [],
  );

  const recentlyMastered = useMemo(
    () => [
      { word: 'Biblioteca', translation: 'Library / Biblioteka', type: 'Noun' },
      { word: 'Desayuno', translation: 'Breakfast / Śniadanie', type: 'Noun' },
      { word: 'Caminar', translation: 'To walk / Chodzić', type: 'Verb' },
    ],
    [],
  );

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <View className="flex items-center justify-center size-10 rounded-full bg-slate-100 dark:bg-slate-800">
            <MaterialCommunityIcons
              name="arrow-left"
              size={20}
              color={colorScheme === 'dark' ? '#fff' : '#000'}
            />
          </View>
          <ThemedText className="text-lg font-bold tracking-tight">Learning Progress</ThemedText>
          <View className="flex items-center justify-center size-10 rounded-full bg-slate-100 dark:bg-slate-800">
            <MaterialCommunityIcons
              name="share-variant"
              size={20}
              color={colorScheme === 'dark' ? '#fff' : '#000'}
            />
          </View>
        </View>

        {/* App Branding */}
        <View className="px-6 pt-6 flex items-center gap-2">
          <View className="bg-primary size-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-primary/30">
            <ThemedText className="text-white font-bold text-xs">HL</ThemedText>
          </View>
          <ThemedText className="font-bold text-primary">Hola! App</ThemedText>
        </View>

        {/* Summary Stats Section */}
        <View className="p-4">
          <View className="grid grid-cols-2 gap-3">
            <StatCard
              title="Total Words"
              value="450"
              icon="book-open-variant"
              iconColor="#2b8cee"
              progress={65}
              subtitle="Goal: 1000 words"
              fullWidth
            />
            <StatCard title="Study Days" value="24" icon="calendar-today" iconColor="#fb923c" />
            <StatCard title="Current Streak" value="7 days" icon="fire" iconColor="#ef4444" />
          </View>
        </View>

        {/* Activity Chart Section */}
        <View className="px-4 py-2">
          <View className="rounded-xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <View className="flex items-center justify-between mb-6">
              <View>
                <ThemedText className="text-base font-bold">Weekly Activity</ThemedText>
                <ThemedText className="text-xs text-slate-500">Study minutes per day</ThemedText>
              </View>
              <View className="text-right">
                <ThemedText className="text-xl font-bold text-primary">
                  {weeklyActivityData.totalMinutes} min
                </ThemedText>
                <View className="flex items-center justify-end gap-1">
                  <MaterialCommunityIcons name="trending-up" size={12} color="#22c55e" />
                  <ThemedText className="text-[10px] font-bold text-green-500">
                    +{weeklyActivityData.increase}%
                  </ThemedText>
                </View>
              </View>
            </View>
            <BarChart
              data={weeklyActivityData.data}
              labels={weeklyActivityData.labels}
              activeIndex={weeklyActivityData.activeIndex}
            />
          </View>
        </View>

        {/* Recently Mastered Section */}
        <View className="px-4 py-4">
          <View className="flex items-center justify-between mb-4">
            <ThemedText className="text-lg font-bold tracking-tight">Recently Mastered</ThemedText>
            <ThemedText className="text-sm font-semibold text-primary">See all</ThemedText>
          </View>
          <View className="space-y-3">
            {recentlyMastered.map((item, index) => (
              <WordCard
                key={index}
                word={item.word}
                translation={item.translation}
                type={item.type}
              />
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View className="p-6">
          <View className="w-full bg-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center gap-2 py-4">
            <ThemedText className="text-white font-bold">Continue Learning</ThemedText>
            <MaterialCommunityIcons name="play-circle" size={20} color="#fff" />
          </View>
        </View>

        {/* Bottom padding for tab bar */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
