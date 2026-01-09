import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Platform, Text, View } from 'react-native';
import { HomeScreenButtons } from './components/HomeScreenButtons';
import { HomeScreenHeading } from './components/HomeScreenHeading';

export const HomeScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const bottomInset = Platform.OS === 'ios' ? tabBarHeight : 0;

  return (
    <View className="flex-1 px-6 bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
      <View style={{ paddingBottom: bottomInset + 70 }} className="flex-1 justify-center">
        <HomeScreenHeading />
        <HomeScreenButtons />
        <Text style={{ color: 'white' }}>Home Screen</Text>
      </View>
    </View>
  );
};
