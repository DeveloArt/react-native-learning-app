import { ThemedText } from '@/components/typography/ThemedText';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, TouchableOpacity, View } from 'react-native';
import { BuilderProgressSection } from './components/BuilderProgressSection';
import { BuilderWordAreas } from './components/BuilderWordAreas';
import { getSentencesForCategory } from './data/sentences';

interface Props {
  categoryKey?: string;
  subKey?: string;
  onExit?: () => void;
}

export function BuilderPracticeScreen({ categoryKey, subKey, onExit }: Props) {
  const sentences = useMemo(
    () => (categoryKey ? getSentencesForCategory(categoryKey) : []),
    [categoryKey],
  );
  const { i18n, t } = useTranslation();
  const [idx, setIdx] = useState(0);
  const current = sentences[idx];
  const prompt = current
    ? i18n.language?.startsWith('pl')
      ? current.promptPl
      : current.promptEn
    : '';
  const expectedWords = useMemo(() => (current ? current.targetEs.split(' ') : []), [current]);
  const [poolWords, setPoolWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const addWord = (w: string) => {
    setPoolWords((prev) => prev.filter((x) => x !== w));
    setSelectedWords((prev) => [...prev, w]);
    setIsCorrect(false);
    setError(null);
  };

  const removeWord = (w: string) => {
    setSelectedWords((prev) => prev.filter((x) => x !== w));
    setPoolWords((prev) => [...prev, w]);
    setIsCorrect(false);
    setError(null);
  };

  const handleHint = () => {
    if (current && selectedWords.length < expectedWords.length) {
      const nextWord = expectedWords[selectedWords.length];
      Alert.alert(
        t('builder.hint') || 'Hint',
        t('builder.nextWordHint', { word: nextWord }) || `The next word is: ${nextWord}`,
        [{ text: t('common.ok') || 'OK' }],
      );
    }
  };

  const handleCheck = () => {
    if (selectedWords.length !== expectedWords.length) {
      setError(t('builder.incompleteSentence') || 'Please complete the sentence');
      return;
    }

    const isCorrect = expectedWords.every((w, i) => selectedWords[i] === w);
    if (isCorrect) {
      setIsCorrect(true);
      setTimeout(() => {
        const nextIdx = idx < sentences.length - 1 ? idx + 1 : 0;
        setIdx(nextIdx);
        setIsCorrect(false);
      }, 1500);
    } else {
      setError(t('builder.incorrectSentence') || 'Incorrect sentence. Try again!');
    }
  };

  const handleSkip = () => {
    const nextIdx = idx < sentences.length - 1 ? idx + 1 : 0;
    setIdx(nextIdx);
    setIsCorrect(false);
    setError(null);
  };

  useEffect(() => {
    if (!current) return;
    const words = current.targetEs.split(' ');
    setPoolWords([...words].sort(() => Math.random() - 0.5));
    setSelectedWords([]);
    setError(null);
    setIsCorrect(false);
  }, [current]);

  return (
    <View className="flex-1 bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
      {onExit && (
        <TouchableOpacity onPress={() => onExit()} className="mb-3 px-4 pt-4">
          <ThemedText className="text-blue-600">{`← ${t('builder.backToCategories') || 'Categories'}`}</ThemedText>
        </TouchableOpacity>
      )}

      <BuilderProgressSection
        progress={{ current: idx + 1, total: sentences.length }}
        onHint={handleHint}
      />

      <View className="flex-1 px-4 pb-32">
        <BuilderWordAreas
          selectedWords={selectedWords}
          poolWords={poolWords}
          expectedWords={expectedWords}
          addWord={addWord}
          removeWord={removeWord}
          prompt={prompt}
          targetSentence={current?.targetEs}
        />
      </View>

      {current && (
        <View className="items-center mt-4">
          {isCorrect && (
            <View className="mt-4 items-center">
              <ThemedText weight="bold" className="text-[36px] text-green-500">
                {t('builder.correct') || 'Correct!'}
              </ThemedText>
            </View>
          )}
          {error && (
            <View className="mt-2 px-4">
              <ThemedText className="text-red-500">{error}</ThemedText>
            </View>
          )}
        </View>
      )}

      {/* Bottom Action Area */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-surfaceSecondary dark:bg-surfaceSecondary-dark border-t border-borderPrimaryDefault">
        <View className="flex-row gap-3">
          {/* Skip Button */}
          <TouchableOpacity
            onPress={handleSkip}
            className="flex-1 h-14 rounded-xl border-2 border-borderPrimaryDefault bg-transparent items-center justify-center"
          >
            <ThemedText weight="bold" className="uppercase text-sm">
              {t('common.skip') || 'Skip'}
            </ThemedText>
          </TouchableOpacity>

          {/* Check Button */}
          <TouchableOpacity
            onPress={handleCheck}
            className="flex-[2] h-14 rounded-xl bg-primary items-center justify-center shadow-lg"
          >
            <ThemedText weight="bold" className="text-white uppercase text-sm">
              {t('common.check') || 'Check'}
            </ThemedText>
          </TouchableOpacity>
        </View>
        <View className="h-6" />
      </View>
    </View>
  );
}
