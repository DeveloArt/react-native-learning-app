import { ThemedText } from '@/components/typography/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { mapTileColorForScheme, pickTextColorForBg } from '@/utils/color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import type { CategoryCard } from '../types/types';

interface Props {
  card: CategoryCard;
  expanded?: boolean;
  onToggle?: () => void;
  onPressSubcategory: (categoryKey: string, subKey: string) => void;
}

export function CategoryItem({ card, onPressSubcategory }: Props) {
  const { t } = useTranslation();
  const scheme = useColorScheme();
  const cardBg = mapTileColorForScheme(card.color, scheme ?? 'light');
  const cardIconColor = pickTextColorForBg(cardBg);

  return (
    <View className="rounded-2xl bg-surfacePrimary dark:bg-surfacePrimary-dark">
      <Pressable
        onPress={() => onPressSubcategory(card.key, '')}
        className="flex-row justify-start items-center p-4"
      >
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
      </Pressable>
    </View>
  );
}
