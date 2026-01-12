import { ThemedText } from '@/components/typography/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { mapTileColorForScheme, pickTextColorForBg } from '@/utils/color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import type { CategoryCard } from '../types/types';

interface Props {
  card: CategoryCard;
  expanded: boolean;
  onToggle: () => void;
  onPressSubcategory: (categoryKey: string, subKey: string) => void;
}

export function CategoryItem({ card, expanded, onToggle, onPressSubcategory }: Props) {
  const { t } = useTranslation();
  const scheme = useColorScheme();
  const height = useSharedValue(0);
  const containerStyle = useAnimatedStyle(() => ({ height: height.value }));

  // animate on expanded change without reading shared value in render
  useEffect(() => {
    const target = expanded ? 4 * 52 + 16 : 0; // 4 rows * 52px + padding
    height.value = withTiming(target, { duration: expanded ? 220 : 200 });
  }, [expanded, height]);
  const cardBg = mapTileColorForScheme(card.color, scheme ?? 'light');
  const cardIconColor = pickTextColorForBg(cardBg);

  return (
    <View className="rounded-2xl bg-surfacePrimary dark:bg-surfacePrimary-dark">
      <Pressable onPress={onToggle} className="flex-row justify-between items-center p-4">
        <View className="flex-row gap-4 items-center">
          <View className="p-3 rounded-xl" style={{ backgroundColor: cardBg }}>
            <MaterialCommunityIcons
              name={card.icon as keyof typeof MaterialCommunityIcons.glyphMap}
              size={22}
              color={cardIconColor}
            />
          </View>
          <View>
            <ThemedText weight="bold">{t(`builder.categories.${card.key}`)}</ThemedText>
          </View>
        </View>
        <MaterialCommunityIcons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#767676"
        />
      </Pressable>

      <Animated.View style={containerStyle} className="overflow-hidden">
        <View className="px-4 pb-4 gap-2">
          {card.subcategories.map((sub) => {
            const subBg = mapTileColorForScheme(sub.color, scheme ?? 'light');
            const subTextColor = pickTextColorForBg(subBg);
            return (
              <Pressable
                key={sub.key}
                onPress={() => onPressSubcategory(card.key, sub.key)}
                className="flex-row items-center gap-3 p-3 rounded-xl"
                style={{ backgroundColor: subBg }}
              >
                <View className="flex-1">
                  <Text
                    style={{ color: subTextColor, fontFamily: 'Montserrat-Regular', fontSize: 16 }}
                  >
                    {t(`builder.subcategories.${sub.key}`)}
                  </Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color={subTextColor} />
              </Pressable>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
}
