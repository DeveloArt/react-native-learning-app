import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Platform, ScrollView } from 'react-native';
import { HomeProgressSection } from './components/HomeProgressSection';
import { HomeQuickPractice } from './components/HomeQuickPractice';
import { HomeScreenHeading } from './components/HomeScreenHeading';
import { HomeStreakCard } from './components/HomeStreakCard';

export const HomeScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const bottomInset = Platform.OS === 'ios' ? tabBarHeight : 0;

  return (
    <ScrollView
      className="flex-1 bg-background-light dark:bg-background-dark"
      contentContainerStyle={{ paddingBottom: bottomInset + 80 }}
    >
      <HomeScreenHeading />
      <HomeStreakCard />
      <HomeQuickPractice />
      <HomeProgressSection />
    </ScrollView>
  );
};
