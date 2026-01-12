import { ThemedText } from '@/components/typography/ThemedText';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
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

  useEffect(() => {
    if (!current) return;
    const words = current.targetEs.split(' ');
    setPoolWords([...words].sort(() => Math.random() - 0.5));
    setSelectedWords([]);
    setError(null);
    setIsCorrect(false);
  }, [current]);

  useEffect(() => {
    if (!current) return;
    const isComplete =
      selectedWords.length === expectedWords.length &&
      expectedWords.every((w, i) => selectedWords[i] === w);
    if (isComplete && expectedWords.length > 0) {
      setIsCorrect(true);
      const nextIdx = idx < sentences.length - 1 ? idx + 1 : 0;
      setTimeout(() => {
        setIdx(nextIdx);
        setIsCorrect(false);
      }, 1500);
    } else {
      setIsCorrect(false);
    }
  }, [selectedWords, expectedWords, current, idx, sentences]);

  return (
    <View className="flex-1 px-4 py-4 bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
      {onExit && (
        <TouchableOpacity onPress={() => onExit()} className="mb-3">
          <ThemedText className="text-blue-600">{`← ${t('builder.backToCategories') || 'Categories'}`}</ThemedText>
        </TouchableOpacity>
      )}
      <BuilderProgressSection progress={{ current: 2, total: 10 }} />

      <BuilderWordAreas
        selectedWords={selectedWords}
        poolWords={poolWords}
        expectedWords={expectedWords}
        addWord={addWord}
        removeWord={removeWord}
        prompt={prompt}
      />
      {current && (
        <View className="items-center mt-4">
          <View className="items-center" />
          {isCorrect && (
            <View className="mt-4 items-center">
              <ThemedText weight="bold" className="text-[36px] text-green-500">
                {t('builder.correct')}
              </ThemedText>
            </View>
          )}
          <View className="items-center"></View>
          {error && (
            <View className="mt-2">
              <ThemedText size="small" className="text-[#ef4444]">
                {error}
              </ThemedText>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
