import { AppHeader } from '@/components/headers/AppHeader';
import Splash from '@/components/Splash';
import { Colors } from '@/constants/color';
import { useColorScheme } from '@/hooks/useColorScheme';
import i18n from '@/i18n';
import ThemeContext, { ThemeProvider as AppThemeProvider } from '@/src/ThemeContext';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import '../global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const [loaded] = useFonts({
    MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
    MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
    MontserratLight: require('../assets/fonts/Montserrat-Light.ttf'),
    MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
  });

  const [showSplash, setShowSplash] = useState(true);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <I18nextProvider i18n={i18n}>
          <AppThemeProvider defaultScheme="light">
            <ThemeContext.Consumer>
              {({ scheme }) => {
                const resolved = scheme ?? (colorScheme === 'dark' ? 'dark' : 'light');
                return (
                  <ThemeProvider value={resolved === 'dark' ? DarkTheme : DefaultTheme}>
                    <Stack
                      screenOptions={{
                        headerTitleAlign: 'left',
                        headerShadowVisible: false,
                        headerTintColor: Colors[resolved ?? 'light'].text,
                        headerStyle: { backgroundColor: Colors[resolved ?? 'light'].background },
                        headerTitleStyle: {
                          fontSize: 22,
                          fontWeight: '700',
                          color: Colors[resolved ?? 'light'].text,
                        },
                        header: ({ options, navigation }) => (
                          <AppHeader
                            title={(options?.title as string) || ''}
                            showBackButton={navigation.canGoBack()}
                            onPressBack={() => navigation.goBack()}
                          />
                        ),
                        animation: 'slide_from_right',
                      }}
                    >
                      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                      <Stack.Screen
                        name="(content)/builder/index"
                        options={{
                          title: t('layout.sentenceBuilder'),
                        }}
                      />

                      <Stack.Screen
                        name="(content)/config/index"
                        options={{
                          title: t('layout.settings'),
                        }}
                      />
                    </Stack>
                    {showSplash && <Splash onFinish={() => setShowSplash(false)} />}
                    <StatusBar style={resolved === 'dark' ? 'light' : 'dark'} />
                  </ThemeProvider>
                );
              }}
            </ThemeContext.Consumer>
          </AppThemeProvider>
        </I18nextProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
