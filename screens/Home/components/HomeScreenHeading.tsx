import { ThemedText } from '@/components/typography/ThemedText';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export function HomeScreenHeading() {
  const { t } = useTranslation();
  return (
    <View className="items-center px-4">
      <ThemedText className="text-[40px] pb-4">👋</ThemedText>
      <ThemedText
        weight="bold"
        className="text-[36px] text-center text-textPrimary dark:text-textPrimary-dark"
      >
        {t('home.heading.welcomeLine1')}
      </ThemedText>
      <ThemedText
        weight="bold"
        className="text-[36px] text-center text-textPrimary dark:text-textPrimary-dark"
      >
        {t('home.heading.welcomeLine2')}
      </ThemedText>
      <ThemedText
        size="small"
        className="mt-3 text-center text-textSecondary dark:text-textSecondary-dark"
      >
        {t('home.heading.subLine1')}
      </ThemedText>
      <ThemedText
        size="small"
        className="text-center text-textSecondary dark:text-textSecondary-dark"
      >
        {t('home.heading.subLine2')}
      </ThemedText>
    </View>
  );
}
