import { ThemedText } from '@/components/typography/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import type { BuilderWordMoveHandlers } from '../types/types';

interface Props extends BuilderWordMoveHandlers {
  selectedWords: string[];
  poolWords: string[];
  expectedWords: string[];
  prompt: string;
  targetSentence?: string;
}

export function BuilderWordAreas({
  selectedWords,
  poolWords,
  expectedWords,
  addWord,
  removeWord,
  prompt,
  targetSentence,
}: Props) {
  const { t } = useTranslation();

  return (
    <>
      {/* Instruction / Headline */}
      <View className="pt-8 pb-2">
        <ThemedText weight="bold" className="text-2xl leading-tight">
          {t('builder.translateSentence') || 'Translate this sentence'}
        </ThemedText>
      </View>

      {/* Source Sentence Card */}
      <View className="mt-4 mb-8 flex-row items-center gap-4">
        <View className="w-16 h-16 rounded-2xl bg-primary/10 items-center justify-center">
          <MaterialIcons name="volume-up" size={32} color="#2b8cee" />
        </View>
        <View className="flex-1">
          <ThemedText className="text-xl font-medium leading-snug">{prompt}</ThemedText>
          {targetSentence && (
            <ThemedText className="text-sm italic opacity-60">{targetSentence}</ThemedText>
          )}
        </View>
      </View>

      {/* Assembly Area */}
      <View className="flex-col min-h-[160px] justify-center items-center">
        <View className="w-full flex-row flex-wrap gap-2 items-center justify-center py-8 border-y-2 border-dashed border-borderPrimaryDefault">
          {selectedWords.length === 0 ? (
            <ThemedText className="text-sm font-normal text-center opacity-40 max-w-[200px]">
              {t('builder.tapWordsToBuild') || 'Tap the words below to build the sentence'}
            </ThemedText>
          ) : (
            selectedWords.map((word, index) => {
              const isWrongPlace = expectedWords[index] !== word;
              return (
                <Pressable
                  key={`sel-${word}-${index}`}
                  onPress={() => removeWord(word)}
                  className={`px-5 py-3 rounded-xl border-2 ${
                    isWrongPlace
                      ? 'bg-red-100 border-red-500'
                      : 'bg-white dark:bg-slate-800 border-borderPrimaryDefault'
                  } shadow-sm`}
                >
                  <ThemedText weight="medium">{word}</ThemedText>
                </Pressable>
              );
            })
          )}
        </View>
      </View>

      {/* Word Pool / Chips */}
      <View className="mt-auto pt-10">
        <View className="flex-row flex-wrap justify-center gap-3">
          {poolWords.map((word) => (
            <Pressable
              key={`pool-${word}`}
              onPress={() => addWord(word)}
              className="px-5 py-3 rounded-xl border-2 border-borderPrimaryDefault bg-white dark:bg-slate-800 shadow-sm active:translate-y-0.5"
            >
              <ThemedText weight="medium">{word}</ThemedText>
            </Pressable>
          ))}
        </View>
      </View>
    </>
  );
}
