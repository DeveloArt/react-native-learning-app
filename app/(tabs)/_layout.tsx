import { ThemedText } from '@/components/typography/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Platform, View, useWindowDimensions } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { t } = useTranslation();
  const { height, width } = useWindowDimensions();

  return (
    <Tabs
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: '#2b8cee',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#64748b' : '#4c739a',
        tabBarLabelPosition: 'below-icon',
        tabBarIconStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 4,
          overflow: 'visible',
        },
        tabBarLabelStyle: {
          fontSize: 10,
          lineHeight: 12,
          marginTop: 2,
          fontWeight: '500',
        },
        tabBarItemStyle: {
          paddingVertical: 2,
          alignItems: 'center',
        },
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            height: height * 0.12,
            backgroundColor:
              colorScheme === 'dark' ? 'rgba(16, 25, 34, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            borderTopWidth: 1,
            borderTopColor: colorScheme === 'dark' ? '#334155' : '#e2e8f0',
            backdropFilter: 'blur',
          },
          default: {
            height: height * 0.12,
            backgroundColor:
              colorScheme === 'dark' ? 'rgba(16, 25, 34, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            borderTopWidth: 1,
            borderTopColor: colorScheme === 'dark' ? '#334155' : '#e2e8f0',
          },
        }),
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <View className="flex-col items-center gap-1">
              <MaterialCommunityIcons
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={color}
              />
              <ThemedText
                className={`text-[10px] font-bold ${focused ? 'text-primary' : 'text-textSecondary dark:text-textSecondary-dark'}`}
              >
                Home
              </ThemedText>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="flashcards"
        options={{
          title: t('common.tabs.flashcards'),
          tabBarLabel: 'Lessons',
          tabBarIcon: ({ color, size, focused }) => (
            <View className="flex-col items-center gap-1">
              <MaterialCommunityIcons
                name={focused ? 'book-open-variant' : 'book-open-outline'}
                size={24}
                color={color}
              />
              <ThemedText
                className={`text-[10px] font-medium ${focused ? 'text-primary' : 'text-textSecondary dark:text-textSecondary-dark'}`}
              >
                Lessons
              </ThemedText>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="builder"
        options={{
          title: t('common.tabs.builder'),
          tabBarLabel: 'Leaderboard',
          tabBarIcon: ({ color, size, focused }) => (
            <View className="flex-col items-center gap-1">
              <MaterialCommunityIcons
                name={focused ? 'trophy' : 'trophy-outline'}
                size={24}
                color={color}
              />
              <ThemedText
                className={`text-[10px] font-medium ${focused ? 'text-primary' : 'text-textSecondary dark:text-textSecondary-dark'}`}
              >
                Leaderboard
              </ThemedText>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: t('common.tabs.progress'),
          tabBarLabel: 'Progress',
          tabBarIcon: ({ color, size, focused }) => (
            <View className="flex-col items-center gap-1">
              <MaterialCommunityIcons
                name={focused ? 'chart-pie' : 'chart-pie-outline'}
                size={24}
                color={color}
              />
              <ThemedText
                className={`text-[10px] font-medium ${focused ? 'text-primary' : 'text-textSecondary dark:text-textSecondary-dark'}`}
              >
                Progress
              </ThemedText>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="sentence-builder"
        options={{
          title: 'Sentence Builder',
          tabBarLabel: 'Practice',
          tabBarIcon: ({ color, size, focused }) => (
            <View className="flex-col items-center gap-1">
              <MaterialCommunityIcons
                name={focused ? 'pencil' : 'pencil-outline'}
                size={24}
                color={color}
              />
              <ThemedText
                className={`text-[10px] font-medium ${focused ? 'text-primary' : 'text-textSecondary dark:text-textSecondary-dark'}`}
              >
                Practice
              </ThemedText>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
