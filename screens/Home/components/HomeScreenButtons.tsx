import { ButtonPrimary } from '@/components/buttons/ButtonPrimary';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export function HomeScreenButtons() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <View className="gap-4 mt-8">
      <ButtonPrimary
        title={t('common.buttons.flashcards')}
        variant="secondaryBlue"
        onPress={() => router.push('/(tabs)/flashcards')}
      />
      <ButtonPrimary
        title={t('common.buttons.sentenceBuilder')}
        variant="secondaryBlueLight"
        onPress={() => router.push('/(tabs)/builder')}
      />
      {/*<ButtonPrimary
        title={t('common.buttons.speakingMode')}
        variant="secondaryBlueLight"
        onPress={() => router.push('/(tabs)/speaking')}
      />*/}
    </View>
  );
}
