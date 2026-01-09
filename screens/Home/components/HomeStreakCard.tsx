import { ThemedText } from '@/components/typography/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Image, TouchableOpacity, View } from 'react-native';

export function HomeStreakCard() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  return (
    <View className="p-4">
      <View className="flex-row items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-surfacePrimary-dark p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-border dark:border-border-dark">
        <View className="flex-[1.5] flex-col justify-between gap-4">
          <View className="flex-col gap-1">
            <View className="flex-row items-center gap-2 mb-1">
              <MaterialCommunityIcons name="fire" size={24} color="#f97316" />
              <ThemedText weight="bold" className="text-xl leading-tight">
                7 Day Streak
              </ThemedText>
            </View>
            <ThemedText
              size="small"
              className="text-textSecondary dark:text-textSecondary-dark font-normal leading-normal"
            >
              You&apos;re doing great! Keep the fire burning to master Spanish.
            </ThemedText>
          </View>
          <TouchableOpacity className="px-6 py-2.5 bg-primary rounded-full shadow-md shadow-primary/20">
            <ThemedText weight="bold" className="text-white text-sm text-center">
              Practice Now
            </ThemedText>
          </TouchableOpacity>
        </View>
        <View className="w-full bg-center bg-no-repeat aspect-square rounded-xl flex-1 max-w-[120px] overflow-hidden">
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZmrpnpMa9OHYHM7tJcYZffApQoCvXM5d_pFgA-zrD2EPIT7o_1dRW0QRudSxBWhmXrrY8V4_M8WfLkxIizG1JrJMPJxht_OEHZf0R7o2MaRaZeFiIyofx-4UvHwcjaPz793kmi1olB4zOA3ZXNqpe4chpSA4EI2JqrDH5atcgULo6G-YoBEpqf_c9f9BBWTOdtzdGYDQqZakPnzfJD0POTt_kqceoqaoZqvQcDoyHhq9kBRm6xVitP2O3mJdF1Fq5XgqRB99u_sg',
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
}
