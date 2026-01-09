import { ThemedText } from '@/components/typography/ThemedText';
import { getDailyTip } from '@/services/geminiService';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

export function HomeStreakCard() {
  const router = useRouter();
  const [tip, setTip] = useState("Consistency is key to mastering Spanish!");

  useEffect(() => {
    getDailyTip().then(setTip);
  }, []);

  return (
    <View className="p-4">
      <View className="flex-row items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-surfaceSecondary-dark p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <View className="flex-[1.5] flex-col justify-between gap-4">
          <View className="flex-col gap-1">
            <View className="flex-row items-center gap-2 mb-1">
              <MaterialCommunityIcons name="fire" size={24} color="#f97316" />
              <ThemedText weight="bold" className="text-xl">
                7 Day Streak
              </ThemedText>
            </View>
            <ThemedText 
              size="small" 
              className="text-textSecondary dark:text-textSecondary-dark"
            >
              {tip}
            </ThemedText>
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/flashcards')}
            className="flex-row items-center justify-center rounded-full h-10 px-6 bg-primary"
          >
            <ThemedText 
              weight="bold" 
              className="text-white text-sm"
            >
              Practice Now
            </ThemedText>
          </TouchableOpacity>
        </View>
        <Image 
          source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZmrpnpMa9OHYHM7tJcYZffApQoCvXM5d_pFgA-zrD2EPIT7o_1dRW0QRudSxBWhmXrrY8V4_M8WfLkxIizG1JrJMPJxht_OEHZf0R7o2MaRaZeFiIyofx-4UvHwcjaPz793kmi1olB4zOA3ZXNqpe4chpSA4EI2JqrDH5atcgULo6G-YoBEpqf_c9f9BBWTOdtzdGYDQqZakPnzfJD0POTt_kqceoqaoZqvQcDoyHhq9kBRm6xVitP2O3mJdF1Fq5XgqRB99u_sg" }}
          className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex-1 max-w-[120px]"
          resizeMode="cover"
        />
      </View>
    </View>
  );
}
