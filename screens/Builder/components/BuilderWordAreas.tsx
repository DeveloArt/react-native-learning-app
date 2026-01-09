import { ThemedText } from '@/components/typography/ThemedText';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import type { BuilderWordMoveHandlers } from '../types/types';

interface Props extends BuilderWordMoveHandlers {
  selectedWords: string[];
  poolWords: string[];
  expectedWords: string[];
  prompt: string;
}

export function BuilderWordAreas({
  selectedWords,
  poolWords,
  expectedWords,
  addWord,
  removeWord,
  prompt,
}: Props) {
  const { t } = useTranslation();

  return (
    <>
      {/* Instruction / Headline */}
      <ThemedText weight="bold" className="text-2xl leading-tight pb-2 pt-8">
        Translate this sentence
      </ThemedText>

      {/* Source Sentence Card */}
      <View className="mt-4 mb-8 flex-row items-center gap-4">
        <View className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <ThemedText className="text-primary text-4xl">🔊</ThemedText>
        </View>
        <View className="flex-1">
          <ThemedText className="text-xl font-medium leading-snug">{prompt}</ThemedText>
          <ThemedText
            size="small"
            className="text-textSecondary dark:text-textSecondary-dark italic"
          >
            Chcę pić wodę
          </ThemedText>
        </View>
      </View>

      {/* Assembly Area */}
      <View className="flex-col min-h-[160px] justify-center items-center">
        <View className="w-full flex-row flex-wrap gap-2 items-center justify-center py-8 border-y-2 border-dashed border-border dark:border-border-dark">
          {selectedWords.length === 0 ? (
            <ThemedText
              size="small"
              className="text-textSecondary/40 dark:text-textSecondary-dark/40 text-center"
            >
              Tap the words below to build the sentence
            </ThemedText>
          ) : (
            selectedWords.map((word, index) => {
              const isWrongPlace = expectedWords[index] !== word;
              return (
                <Pressable
                  key={`sel-${word}-${index}`}
                  onPress={() => removeWord(word)}
                  className={`px-4 py-2 rounded-full border ${
                    isWrongPlace
                      ? 'bg-[#fee2e2] border-[#ef4444]'
                      : 'bg-white dark:bg-surfacePrimary-dark border-border dark:border-border-dark'
                  }`}
                >
                  <ThemedText size="small" weight="medium">
                    {word}
                  </ThemedText>
                </Pressable>
              );
            })
          )}
        </View>
      </View>

      {/* Word Pool */}
      <View className="mt-auto pt-10">
        <View className="flex-row flex-wrap justify-center gap-3">
          {poolWords.map((word) => (
            <Pressable
              key={`pool-${word}`}
              onPress={() => addWord(word)}
              className="px-5 py-3 rounded-xl border-2 border-border dark:border-border-dark bg-white dark:bg-surfacePrimary-dark"
            >
              <ThemedText weight="medium">{word}</ThemedText>
            </Pressable>
          ))}
        </View>
      </View>
    </>
  );
}
