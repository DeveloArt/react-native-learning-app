import { AppHeader } from '@/components/headers/AppHeader';
import { Colors } from '@/constants/color';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderBackButton } from '@react-navigation/elements';
import { Tabs, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Dimensions, Platform, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { t } = useTranslation();
  const { height, width } = Dimensions.get('window');

  return (
    <Tabs
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: colorScheme === 'dark' ? '#0A47C2' : '#0d59f2',
        tabBarLabelPosition: 'below-icon',
        tabBarIconStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 4,
          overflow: 'visible',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          lineHeight: 13,
          marginTop: 2,
        },
        tabBarItemStyle: {
          paddingVertical: 2,
          alignItems: 'center',
        },
        headerShown: true,
        headerLeft: (props) =>
          navigation.canGoBack() ? (
            <HeaderBackButton {...props} onPress={() => navigation.goBack()} />
          ) : undefined,
        headerTitleAlign: 'left',
        headerShadowVisible: false,
        headerTintColor: Colors[colorScheme ?? 'light'].text,
        headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: '700',
          color: Colors[colorScheme ?? 'light'].text,
        },
        header: ({ options }) => {
          const state = navigation.getState?.();
          const currentRouteName = state?.routes?.[state.index]?.name;
          const isHome = currentRouteName === 'index';
          const isSpeaking = currentRouteName === 'speaking';
          const showBack = navigation.canGoBack() || isSpeaking;
          return (
            <AppHeader
              title={isHome ? t('home.heading.helloTitle') : (options?.title as string) || ''}
              showBackButton={showBack}
              onPressBack={() =>
                navigation.canGoBack() ? navigation.goBack() : router.push('/(tabs)')
              }
              onPressRightSecondary={undefined}
              onPressRight={isHome ? () => router.push('/(content)/config') : undefined}
            />
          );
        },
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            height: height * 0.135,
          },
          default: {
            height: height * 0.135,
          },
        }),
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarLabel: t('common.tabs.home'),
          tabBarIcon: ({ color, size }) => (
            <View style={{ height: 24, alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name="square-rounded-outline" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="flashcards"
        options={{
          title: t('common.tabs.flashcards'),
          tabBarIcon: ({ color, size }) => (
            <View style={{ height: 24, alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name="cards-outline" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="builder"
        options={{
          title: t('common.tabs.builder'),
          tabBarLabel: t('common.tabs.builder'),
          tabBarIcon: ({ color, size }) => (
            <View style={{ height: 24, alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name="view-dashboard-outline" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="speaking"
        options={{
          title: t('common.tabs.speaking'),
          tabBarIcon: ({ color, size }) => (
            <View style={{ height: 24, alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name="microphone-outline" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: t('common.tabs.stats'),
          tabBarLabel: t('common.tabs.stats'),
          tabBarIcon: ({ color, size }) => (
            <View style={{ height: 24, alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name="chart-box-outline" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
