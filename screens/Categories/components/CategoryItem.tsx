import { ProgressBar } from '@/components/progress/ProgressBar';
import { ThemedText } from '@/components/typography/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { mapTileColorForScheme, pickTextColorForBg } from '@/utils/color';
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
  const progress = card.progress || 0;

  // Get background color based on category color
  const getBgColor = () => {
    switch (card.key) {
      case 'cuisine':
        return 'bg-orange-50 dark:bg-orange-950/20';
      case 'travel':
        return 'bg-blue-50 dark:bg-blue-950/20';
      case 'work':
        return 'bg-purple-50 dark:bg-purple-950/20';
      case 'nature':
        return 'bg-emerald-50 dark:bg-emerald-950/20';
      case 'education':
        return 'bg-rose-50 dark:bg-rose-950/20';
      case 'shopping':
        return 'bg-amber-50 dark:bg-amber-950/20';
      default:
        return 'bg-surfacePrimary dark:bg-surfacePrimary-dark';
    }
  };

  const getBorderColor = () => {
    switch (card.key) {
      case 'cuisine':
        return 'border-orange-100 dark:border-orange-900/30';
      case 'travel':
        return 'border-blue-100 dark:border-blue-900/30';
      case 'work':
        return 'border-purple-100 dark:border-purple-900/30';
      case 'nature':
        return 'border-emerald-100 dark:border-emerald-900/30';
      case 'education':
        return 'border-rose-100 dark:border-rose-900/30';
      case 'shopping':
        return 'border-amber-100 dark:border-amber-900/30';
      default:
        return 'border-border dark:border-border-dark';
    }
  };

  const getIconBgColor = () => {
    switch (card.key) {
      case 'cuisine':
        return 'bg-orange-100 dark:bg-orange-900/40';
      case 'travel':
        return 'bg-blue-100 dark:bg-blue-900/40';
      case 'work':
        return 'bg-purple-100 dark:bg-purple-900/40';
      case 'nature':
        return 'bg-emerald-100 dark:bg-emerald-900/40';
      case 'education':
        return 'bg-rose-100 dark:bg-rose-900/40';
      case 'shopping':
        return 'bg-amber-100 dark:bg-amber-900/40';
      default:
        return 'bg-surfaceSecondary dark:bg-surfaceSecondary-dark';
    }
  };

  const getIconColor = () => {
    switch (card.key) {
      case 'cuisine':
        return 'text-orange-500';
      case 'travel':
        return 'text-blue-500';
      case 'work':
        return 'text-purple-500';
      case 'nature':
        return 'text-emerald-500';
      case 'education':
        return 'text-rose-500';
      case 'shopping':
        return 'text-amber-500';
      default:
        return 'text-primary';
    }
  };

  const getProgressColor = () => {
    switch (card.key) {
      case 'cuisine':
        return 'bg-orange-500';
      case 'travel':
        return 'bg-blue-500';
      case 'work':
        return 'bg-purple-500';
      case 'nature':
        return 'bg-emerald-500';
      case 'education':
        return 'bg-rose-500';
      case 'shopping':
        return 'bg-amber-500';
      default:
        return 'bg-primary';
    }
  };

  const getProgressBgColor = () => {
    switch (card.key) {
      case 'cuisine':
        return 'bg-orange-200 dark:bg-orange-900/30';
      case 'travel':
        return 'bg-blue-200 dark:bg-blue-900/30';
      case 'work':
        return 'bg-purple-200 dark:bg-purple-900/30';
      case 'nature':
        return 'bg-emerald-200 dark:bg-emerald-900/30';
      case 'education':
        return 'bg-rose-200 dark:bg-rose-900/30';
      case 'shopping':
        return 'bg-amber-200 dark:bg-amber-900/30';
      default:
        return 'bg-surfaceSecondary dark:bg-surfaceSecondary-dark';
    }
  };

  const getProgressTextColor = () => {
    switch (card.key) {
      case 'cuisine':
        return 'text-orange-600 dark:text-orange-400';
      case 'travel':
        return 'text-blue-600 dark:text-blue-400';
      case 'work':
        return 'text-purple-600 dark:text-purple-400';
      case 'nature':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'education':
        return 'text-rose-600 dark:text-rose-400';
      case 'shopping':
        return 'text-amber-600 dark:text-amber-400';
      default:
        return 'text-primary';
    }
  };

  return (
    <Pressable onPress={() => onPressSubcategory(card.key, '')}>
      <View
        className={`flex-col gap-3 p-4 rounded-xl ${getBgColor()} border ${getBorderColor()} shadow-sm`}
      >
        <View className="w-full aspect-square rounded-xl flex items-center justify-center">
          <View
            className={`w-full h-full rounded-xl flex items-center justify-center ${getIconBgColor()}`}
          >
            <ThemedText className={`text-5xl ${getIconColor()}`}>{card.icon}</ThemedText>
          </View>
        </View>
        <View>
          <ThemedText weight="bold" className="text-base leading-normal">
            {t(`builder.categories.${card.key}`)}
          </ThemedText>
          <View className="mt-2 w-full h-1.5 rounded-full overflow-hidden">
            <ProgressBar
              progress={progress / 100}
              height={6}
              trackClassName={getProgressBgColor()}
              fillClassName={getProgressColor()}
            />
          </View>
          <ThemedText size="small" weight="bold" className={`mt-2 ${getProgressTextColor()}`}>
            {progress}% complete
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
}
