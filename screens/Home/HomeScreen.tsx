import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Platform, ScrollView, View } from 'react-native';
import { ProgressSection } from './components/ProgressSection';
import { QuickPracticeGrid } from './components/QuickPracticeGrid';
import { StreakCard } from './components/StreakCard';

export const HomeScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const bottomInset = Platform.OS === 'ios' ? tabBarHeight : 0;

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: bottomInset + 20 }}
        showsVerticalScrollIndicator={false}
      >
        <StreakCard />
        <QuickPracticeGrid />
        <ProgressSection />
      </ScrollView>
    </View>
  );
};
