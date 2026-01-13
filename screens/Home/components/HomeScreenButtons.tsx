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
        title={t('common.buttons.flashcards') || 'Flashcards'}
        variant="secondaryBlue"
        onPress={() => router.push('/(content)/flashcards')}
      />
      <ButtonPrimary
        title={t('common.buttons.sentenceBuilder') || 'Sentence Builder'}
        variant="secondary"
        onPress={() => router.push('/(content)/builder')}
      />
      <ButtonPrimary
        title={t('common.buttons.speakingMode') || 'Speaking Mode'}
        variant="secondary"
        onPress={() => router.push('/(content)/speaking')}
      />
    </View>
  );
}
