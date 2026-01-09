import { saveSelectedCategory } from '@/src/storage/category';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, ScrollView, View, useWindowDimensions } from 'react-native';
import { CategoryItem } from './components/CategoryItem';
import { categoryCards } from './data/cards';

export function CategoriesScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const paddingBottom = Platform.OS === 'ios' ? height * 0.125 : height * 0.16;
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const handleToggle = (key: string) => {
    setExpandedKey((prev) => (prev === key ? null : key));
  };
  const handlePressSub = async (catKey: string, subKey: string) => {
    try {
      await saveSelectedCategory(catKey);
    } catch {
      // Error saving category - silently continue
    }
    router.push({ pathname: '/(content)/builder', params: { category: catKey } } as any);
  };
  return (
    <ScrollView
      className="flex-1 bg-surfaceSecondary dark:bg-surfaceSecondary-dark"
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: paddingBottom,
      }}
    >
      <View className="gap-3 mt-2">
        {categoryCards.map((c) => (
          <CategoryItem
            key={c.key}
            card={c}
            expanded={expandedKey === c.key}
            onToggle={() => handleToggle(c.key)}
            onPressSubcategory={handlePressSub}
          />
        ))}
      </View>
    </ScrollView>
  );
}
