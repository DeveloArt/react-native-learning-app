import { ThemedText } from '@/components/typography/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export function HomeQuickPractice() {
  const router = useRouter();
  const { t } = useTranslation();

  const practiceItems: {
    id: string;
    icon: IconName;
    title: string;
    onPress: () => void;
  }[] = [
    {
      id: 'flashcards',
      icon: 'cards',
      title: 'Flashcards',
      onPress: () => router.push('/(tabs)/flashcards'),
    },
    {
      id: 'builder',
      icon: 'view-dashboard',
      title: 'Builder',
      onPress: () => router.push('/(tabs)/builder'),
    },
    {
      id: 'speaking',
      icon: 'microphone',
      title: 'Speaking',
      onPress: () => router.push('/(tabs)/speaking'),
    },
  ];

  return (
    <>
      <ThemedText weight="bold" className="text-lg px-4 pb-2 pt-4">
        Quick Practice
      </ThemedText>
      <View className="grid grid-cols-3 gap-3 p-4">
        {practiceItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={item.onPress}
            className="flex-col gap-3 rounded-2xl bg-white dark:bg-surfacePrimary-dark p-4 items-center justify-center shadow-sm border border-border dark:border-border-dark aspect-square"
          >
            <View className="bg-primary/10 rounded-full p-3">
              <MaterialCommunityIcons name={item.icon} size={32} color="#2b8cee" />
            </View>
            <ThemedText weight="bold" className="text-xs leading-tight">
              {item.title}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
