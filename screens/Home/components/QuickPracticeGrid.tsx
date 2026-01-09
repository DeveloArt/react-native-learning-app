import { ThemedText } from '@/components/typography/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

export function QuickPracticeGrid() {
  const router = useRouter();

  return (
    <View className="px-4 pb-2 pt-4">
      <ThemedText weight="bold" className="text-lg">
        Quick Practice
      </ThemedText>
      <View className="flex-row gap-3 mt-3">
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/flashcards')}
          className="flex-col gap-3 rounded-2xl bg-white dark:bg-surfaceSecondary-dark p-4 items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 flex-1 aspect-square"
        >
          <View className="bg-primary/10 rounded-full p-3">
            <MaterialCommunityIcons name="cards" size={32} color="#0d59f2" />
          </View>
          <ThemedText weight="bold" className="text-xs">
            Flashcards
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/builder')}
          className="flex-col gap-3 rounded-2xl bg-white dark:bg-surfaceSecondary-dark p-4 items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 flex-1 aspect-square"
        >
          <View className="bg-primary/10 rounded-full p-3">
            <MaterialCommunityIcons name="view-dashboard" size={32} color="#0d59f2" />
          </View>
          <ThemedText weight="bold" className="text-xs">
            Builder
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/speaking')}
          className="flex-col gap-3 rounded-2xl bg-white dark:bg-surfaceSecondary-dark p-4 items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 flex-1 aspect-square"
        >
          <View className="bg-primary/10 rounded-full p-3">
            <MaterialCommunityIcons name="microphone" size={32} color="#0d59f2" />
          </View>
          <ThemedText weight="bold" className="text-xs">
            Speaking
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
