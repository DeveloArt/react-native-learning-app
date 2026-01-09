import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Platform, ScrollView } from 'react-native';
import { HomeScreenHeading } from './components/HomeScreenHeading';
import { HomeStreakCard } from './components/HomeStreakCard';
import { ProgressBars } from './components/ProgressBars';
import { QuickPracticeGrid } from './components/QuickPracticeGrid';

export const HomeScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const bottomInset = Platform.OS === 'ios' ? tabBarHeight : 0;

  return (
    <ScrollView 
      className="flex-1 bg-surfaceSecondary dark:bg-surfaceSecondary-dark"
      contentContainerStyle={{ paddingBottom: bottomInset + 70 }}
    >
      <HomeScreenHeading />
      <HomeStreakCard />
      <QuickPracticeGrid />
      <ProgressBars />
    </ScrollView>
  );
};
