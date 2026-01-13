import { TopAppBar } from '@/components/headers/TopAppBar';
import { BottomNavBar } from '@/components/navigation/BottomNavBar';
import { CategoryCard } from '@/components/progress/CategoryCard';
import { ThemedText } from '@/components/typography/ThemedText';
import { saveSelectedCategory } from '@/src/storage/category';
import { useRouter } from 'expo-router';
import { Platform, ScrollView, View, useWindowDimensions } from 'react-native';
import { categoryCards } from './data/cards';
import type { NavigationItem } from './types/types';

export function CategoriesScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const paddingBottom = Platform.OS === 'ios' ? height * 0.125 : height * 0.16;

  const handleCategoryPress = async (card: (typeof categoryCards)[0]) => {
    try {
      await saveSelectedCategory(card.key);
    } catch (e) {
      // Error saving category - silently continue
    }
    router.push({ pathname: '/(content)/builder', params: { category: card.key } } as any);
  };

  const handleBackPress = () => {
    router.back();
  };

  const navItems: NavigationItem[] = [
    {
      key: 'learn',
      label: 'Learn',
      icon: 'menu-book',
      active: true,
    },
    {
      key: 'profile',
      label: 'Profile',
      icon: 'person',
      onPress: () => router.push('/(tabs)/profile'),
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: 'settings',
      onPress: () => router.push('/profile'),
    },
  ];

  return (
    <View className="flex-1 bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
      <TopAppBar title="Choose a Topic" showBackButton={true} onBackPress={handleBackPress} />

      {/* Welcome Section */}
      <View className="px-6 pt-4">
        <ThemedText className="text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Aprende español
        </ThemedText>
        <ThemedText weight="bold" className="text-3xl mt-1">
          ¡Hola!
        </ThemedText>
      </View>

      {/* Categories Grid */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: paddingBottom,
        }}
      >
        <View className="grid grid-cols-2 gap-4 mt-2">
          {categoryCards.map((card) => (
            <CategoryCard key={card.key} card={card} onPress={handleCategoryPress} />
          ))}
        </View>
      </ScrollView>

      <BottomNavBar items={navItems} activeKey="learn" />
    </View>
  );
}
