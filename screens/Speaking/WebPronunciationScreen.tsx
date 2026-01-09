import { ThemedText } from '@/components/typography/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function WebPronunciationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + 2;
  const paddingBottom = insets.bottom + 10;
  
  const [isRecording, setIsRecording] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setShowResult(true);
    } else {
      setIsRecording(true);
      setShowResult(false);
    }
  };

  return (
    <View 
      className="flex-1 bg-surfaceSecondary dark:bg-surfaceSecondary-dark"
      style={{ paddingTop, paddingBottom }}
    >
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-4 pb-2 justify-between">
          <TouchableOpacity onPress={() => router.push('/(tabs)')} className="w-12 flex-row items-center justify-start">
            <MaterialCommunityIcons name="arrow-left" size={24} />
          </TouchableOpacity>
          <ThemedText weight="bold" className="text-lg flex-1 text-center pr-12">
            Practice Pronunciation
          </ThemedText>
        </View>

        <View className="px-6 py-2">
          <View className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <View className="bg-primary h-full rounded-full" style={{ width: '65%' }}></View>
          </View>
        </View>

        <View className="mt-8 flex-col items-center">
          <View className="flex-row items-center gap-3">
            <ThemedText weight="bold" className="text-[48px] text-center">
              Gracias
            </ThemedText>
            <TouchableOpacity className="bg-primary/10 p-2 rounded-full">
              <MaterialCommunityIcons name="volume-high" size={20} color="#0d59f2" />
            </TouchableOpacity>
          </View>
          <ThemedText weight="medium" className="text-xl text-textSecondary dark:text-textSecondary-dark pt-2">
            Thank you
          </ThemedText>
        </View>

        <View className="flex-1 flex-col items-center justify-center py-12">
          <View className="relative flex-row items-center justify-center">
            {isRecording && (
              <>
                <View className="absolute w-40 h-40 bg-primary/20 rounded-full animate-ping"></View>
                <View className="absolute w-48 h-48 bg-primary/10 rounded-full"></View>
              </>
            )}
            <View className="flex px-4 py-3 justify-center relative z-10">
              <TouchableOpacity 
                onPress={toggleRecording}
                className={`w-24 h-24 rounded-full flex-row items-center justify-center shadow-lg ${
                  isRecording ? 'bg-red-500' : 'bg-primary'
                }`}
              >
                <MaterialCommunityIcons 
                  name={isRecording ? "stop" : "microphone"} 
                  size={40} 
                  color="white" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row items-center justify-center h-12 mt-8 gap-1">
            {[4, 8, 10, 6, 12, 9, 11, 5, 7].map((h, i) => (
              <View 
                key={i} 
                className={`w-1 bg-primary rounded-full ${
                  isRecording ? 'opacity-100' : 'opacity-30'
                }`} 
                style={{ 
                  height: isRecording ? h * 4 : 4,
                }}
              />
            ))}
          </View>
          <ThemedText 
            className="text-textSecondary dark:text-textSecondary-dark pt-4"
          >
            {isRecording ? "Listening..." : "Tap to speak"}
          </ThemedText>
        </View>

        {showResult && (
          <Animated.View 
            entering={FadeIn}
            exiting={FadeOut}
            className="mx-6 p-6 bg-white dark:bg-surfaceSecondary-dark rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex-col items-center gap-4"
          >
            <View className="flex-row items-center justify-between w-full">
              <View className="flex-col">
                <ThemedText 
                  size="small" 
                  className="text-textSecondary dark:text-textSecondary-dark uppercase tracking-widest font-bold"
                >
                  Accuracy
                </ThemedText>
                <ThemedText weight="bold" className="text-3xl text-primary">
                  92%
                </ThemedText>
              </View>
              <View className="bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full flex-row items-center gap-2">
                <MaterialCommunityIcons name="check-circle" size={18} color="#16a34a" />
                <ThemedText weight="bold" className="text-green-600">
                  Correct!
                </ThemedText>
              </View>
            </View>
            <View className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <View className="bg-green-500 h-full rounded-full" style={{ width: '92%' }}></View>
            </View>
          </Animated.View>
        )}

        <View className="px-6 pt-8 pb-4 flex-col gap-3">
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/stats')}
            className="flex-row items-center justify-center rounded-xl h-14 bg-primary"
          >
            <ThemedText weight="bold" className="text-white text-lg">
              Continue
            </ThemedText>
            <MaterialCommunityIcons name="arrow-right" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setShowResult(false)}
            className="flex-row items-center justify-center rounded-xl h-14 bg-white dark:bg-surfaceSecondary-dark border border-slate-200 dark:border-slate-700"
          >
            <ThemedText weight="bold" className="text-center">
              Try again
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
