import { ButtonPrimary } from '@/components/buttons/ButtonPrimary';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

export function HomeScreenButtons() {
  const router = useRouter();
  const { t } = useTranslation();

  console.log('HomeScreenButtons render');
  console.log('Translation flashcards:', t('common.buttons.flashcards'));

  return (
    <View className="gap-4 mt-8">
      <Text style={{ color: 'white', marginBottom: 10 }}>Debug: Buttons should appear here</Text>
      <ButtonPrimary
        title={t('common.buttons.flashcards') || 'Flashcards'}
        variant="secondaryBlue"
        onPress={() => router.push('/(tabs)/flashcards')}
      />
      <ButtonPrimary
        title={t('common.buttons.sentenceBuilder') || 'Sentence Builder'}
        variant="secondaryBlueLight"
        onPress={() => router.push('/(tabs)/builder')}
      />
      <ButtonPrimary
        title={t('common.buttons.speakingMode') || 'Speaking Mode'}
        variant="secondaryBlueLight"
        onPress={() => router.push('/(tabs)/speaking')}
      />
    </View>
  );
}
