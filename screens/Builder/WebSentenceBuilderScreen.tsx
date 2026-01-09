import { ThemedText } from '@/components/typography/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function WebSentenceBuilderScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + 2;
  const paddingBottom = insets.bottom + 10;
  
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const pool = ["Yo", "beber", "agua", "quiero", "comida"];
  const correctOrder = ["Yo", "quiero", "beber", "agua"];

  const toggleWord = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const isCorrect = selectedWords.join(' ') === correctOrder.join(' ');

  return (
    <View 
      className="flex-1 bg-surfaceSecondary dark:bg-surfaceSecondary-dark"
      style={{ paddingTop, paddingBottom }}
    >
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-4 pb-2 justify-between">
          <TouchableOpacity onPress={() => router.push('/(tabs)')} className="w-12 flex-row items-center justify-start">
            <MaterialCommunityIcons name="close" size={24} />
          </TouchableOpacity>
          <View className="flex-1 flex-col gap-1 px-2">
            <ThemedText size="small" className="text-textSecondary dark:text-textSecondary-dark font-medium">
              Lesson 4 of 10
            </ThemedText>
            <View className="rounded-full bg-slate-200 dark:bg-slate-700 h-2.5 w-full overflow-hidden">
              <View className="h-full bg-primary" style={{ width: '40%' }}></View>
            </View>
          </View>
          <TouchableOpacity className="w-12 flex-row items-center justify-end">
            <MaterialCommunityIcons name="lightbulb" size={24} />
          </TouchableOpacity>
        </View>

        <View className="flex-1 flex-col px-4 pt-8">
          <ThemedText weight="bold" className="text-2xl mb-6">
            Translate this sentence
          </ThemedText>

          <View className="flex-row items-center gap-4 mb-12">
            <View className="w-16 h-16 rounded-2xl bg-primary/10 flex-row items-center justify-center">
              <MaterialCommunityIcons name="volume-high" size={32} color="#0d59f2" />
            </View>
            <View>
              <ThemedText weight="medium" className="text-xl">
                I want to drink water
              </ThemedText>
              <ThemedText 
                size="small" 
                className="text-textSecondary dark:text-textSecondary-dark italic"
              >
                Chcę pić wodę
              </ThemedText>
            </View>
          </View>

          <View className="flex-col min-h-[160px] justify-center items-center border-y-2 border-dashed border-slate-200 dark:border-slate-800">
            <View className="w-full flex-row flex-wrap gap-2 items-center justify-center py-8">
              {selectedWords.length === 0 ? (
                <ThemedText 
                  size="small" 
                  className="text-textSecondary dark:text-textSecondary-dark text-center max-w-[200px]"
                >
                  Tap the words below to build the sentence
                </ThemedText>
              ) : (
                selectedWords.map((word, i) => (
                  <TouchableOpacity 
                    key={i}
                    onPress={() => toggleWord(word)}
                    className="px-5 py-3 rounded-xl border-2 border-primary bg-white dark:bg-surfaceSecondary-dark"
                  >
                    <ThemedText weight="bold" className="text-primary">
                      {word}
                    </ThemedText>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </View>

          <View className="mt-auto pt-10 pb-32">
            <View className="flex-row flex-wrap justify-center gap-3">
              {pool.map((word, i) => (
                <TouchableOpacity 
                  key={i}
                  disabled={selectedWords.includes(word)}
                  onPress={() => toggleWord(word)}
                  className={`px-5 py-3 rounded-xl border-2 ${
                    selectedWords.includes(word) 
                      ? 'border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900' 
                      : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-surfaceSecondary-dark'
                  }`}
                >
                  <ThemedText 
                    weight={selectedWords.includes(word) ? "regular" : "medium"}
                    className={`${
                      selectedWords.includes(word) 
                        ? 'text-textSecondary dark:text-textSecondary-dark' 
                        : 'text-textPrimary dark:text-textPrimary-dark'
                    }`}
                  >
                    {word}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View className="px-4 bg-surfaceSecondary dark:bg-surfaceSecondary-dark border-t border-slate-200 dark:border-slate-800">
        <View className="flex-row gap-3 max-w-[480px] mx-auto">
          <TouchableOpacity className="flex-1 h-14 rounded-xl border-2 border-slate-200 dark:border-slate-800">
            <ThemedText weight="bold" className="text-center uppercase tracking-widest text-sm">
              Skip
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            disabled={selectedWords.length === 0}
            onPress={() => isCorrect ? router.push('/(tabs)/stats') : console.log('Try again!')}
            className={`flex-[2] h-14 rounded-xl ${
              selectedWords.length === 0 
                ? 'bg-slate-300' 
                : 'bg-primary'
            }`}
          >
            <ThemedText 
              weight="bold" 
              className={`text-center uppercase tracking-widest text-sm ${
                selectedWords.length === 0 ? 'text-textSecondary' : 'text-white'
              }`}
            >
              Check
            </ThemedText>
          </TouchableOpacity>
        </View>
        <View className="h-6"></View>
      </View>
    </View>
  );
}
