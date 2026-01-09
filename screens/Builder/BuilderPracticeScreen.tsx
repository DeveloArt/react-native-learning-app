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

  const addWord = (w: string) => {
    setPoolWords((prev) => prev.filter((x) => x !== w));
    setSelectedWords((prev) => [...prev, w]);
  };

  const removeWord = (w: string) => {
    setSelectedWords((prev) => prev.filter((x) => x !== w));
    setPoolWords((prev) => [...prev, w]);
  };

  useEffect(() => {
    if (!current) return;
    const words = current.targetEs.split(' ');
    setPoolWords([...words].sort(() => Math.random() - 0.5));
    setSelectedWords([]);
    setError(null);
  }, [current]);

  useEffect(() => {
    if (!current) return;
    const isComplete =
      selectedWords.length === expectedWords.length &&
      expectedWords.every((w, i) => selectedWords[i] === w);
    if (isComplete && expectedWords.length > 0) {
      const nextIdx = idx < sentences.length - 1 ? idx + 1 : 0;
      setTimeout(() => setIdx(nextIdx), 300);
    }
  }, [selectedWords, expectedWords, current, idx, sentences]);

  return (
    <View className="flex-1 bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
      {/* Top Navigation Bar */}
      <View className="flex-row items-center p-4 pb-2 justify-between">
        <TouchableOpacity className="w-12 h-12 items-start justify-center">
          <ThemedText className="text-2xl">✕</ThemedText>
        </TouchableOpacity>
        <BuilderProgressSection progress={{ current: idx + 1, total: sentences.length || 10 }} />
      </View>

      {/* Main Content Area */}
      <View className="flex-1 px-4 pb-32">
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

      {/* Bottom Action Area */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-surfaceSecondary dark:bg-surfaceSecondary-dark border-t border-border dark:border-border-dark">
        <View className="flex-row gap-3">
          {/* Skip Button */}
          <TouchableOpacity className="flex-1 h-14 rounded-xl border-2 border-border dark:border-border-dark bg-transparent">
            <ThemedText weight="bold" className="text-center uppercase tracking-wider text-sm">
              Skip
            </ThemedText>
          </TouchableOpacity>
          {/* Check Button (Primary) */}
          <TouchableOpacity className="flex-[2] h-14 rounded-xl bg-primary">
            <ThemedText
              weight="bold"
              className="text-white text-center uppercase tracking-wider text-sm"
            >
              Check
            </ThemedText>
          </TouchableOpacity>
        </View>
        {/* Safe area padding for newer iOS devices */}
        <View className="h-6"></View>
      </View>
    </View>
  );
}
