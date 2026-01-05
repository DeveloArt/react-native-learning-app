import { ThemedText } from '@/components/typography/ThemedText';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import type { SpeakingWord } from '../types/types';

interface Props {
  word?: SpeakingWord;
  showResult?: boolean;
  isCorrect?: boolean;
  recognizedText?: string;
}

export function SpeakingContent({
  word,
  showResult = false,
  isCorrect = false,
  recognizedText,
}: Props) {
  const { t } = useTranslation();

  if (!word) return null;

  return (
    <View className="flex-1 justify-start items-center pt-32">
      {!showResult ? (
        <>
          <ThemedText size="medium" className="text-textSecondary dark:text-textSecondary-dark">
            {t('speaking.howDoYouSay')}
          </ThemedText>
          <ThemedText weight="bold" className="mt-2 text-[40px]">
            {word.word}
          </ThemedText>
          <ThemedText
            size="medium"
            className="mt-2 text-textSecondary dark:text-textSecondary-dark"
          >
            {t('speaking.tapMic')}
          </ThemedText>
        </>
      ) : (
        <View className="items-center gap-2">
          {isCorrect ? (
            <>
              <ThemedText weight="bold" className="text-[32px] text-green-500">
                {t('speaking.correct')}
              </ThemedText>
              <ThemedText size="medium" className="text-textSecondary dark:text-textSecondary-dark">
                {word.translationPl}
              </ThemedText>
              {recognizedText && (
                <ThemedText
                  size="small"
                  className="mt-2 text-textSecondary dark:text-textSecondary-dark"
                >
                  {t('speaking.youSaid')}: &quot;{recognizedText}&quot;
                </ThemedText>
              )}
            </>
          ) : (
            <>
              <ThemedText weight="bold" className="text-[32px] text-red-500">
                {t('speaking.tryAgain')}
              </ThemedText>
              {recognizedText && (
                <ThemedText
                  size="small"
                  className="text-textSecondary dark:text-textSecondary-dark"
                >
                  {t('speaking.youSaid')}: &quot;{recognizedText}&quot;
                </ThemedText>
              )}
              <ThemedText size="small" className="text-textSecondary dark:text-textSecondary-dark">
                {t('speaking.correctAnswer')}
              </ThemedText>
              <ThemedText weight="bold" className="text-[24px]">
                {word.word}
              </ThemedText>
              <ThemedText
                size="medium"
                className="text-textSecondary dark:text-textSecondary-dark px-4"
              >
                {word.translationPl}
              </ThemedText>
            </>
          )}
        </View>
      )}
    </View>
  );
}
