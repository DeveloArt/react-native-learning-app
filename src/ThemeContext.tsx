import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import React, { createContext, useEffect, useState } from 'react';

export type AppColorScheme = 'light' | 'dark' | null;

export const ThemeContext = createContext<{
  scheme: AppColorScheme;
  setScheme: (s: AppColorScheme) => Promise<void>;
}>({
  scheme: null,
  setScheme: async () => {},
});

const STORAGE_KEY = 'app-color-scheme';

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  defaultScheme?: AppColorScheme;
}> = ({ children, defaultScheme }) => {
  const [scheme, setSchemeState] = useState<AppColorScheme>(defaultScheme ?? null);
  const { setColorScheme } = useNativewindColorScheme();

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
          setSchemeState(stored);
          try {
            setColorScheme(stored);
          } catch (e) {
            // Ignoruj błędy ustawiania color scheme
          }
        } else if (defaultScheme) {
          try {
            setColorScheme(defaultScheme);
          } catch (e) {
            // Ignoruj błędy ustawiania color scheme
          }
        }
      } catch (error) {
        // Ignoruj błędy AsyncStorage
      }
    })();
  }, [defaultScheme, setColorScheme]);

  const setScheme = async (s: AppColorScheme) => {
    setSchemeState(s);
    try {
      if (s === null) {
        await AsyncStorage.removeItem(STORAGE_KEY);
        try {
          setColorScheme('system');
        } catch (e) {
          // Ignoruj błędy ustawiania color scheme
        }
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, s);
        try {
          setColorScheme(s as 'light' | 'dark');
        } catch (e) {
          // Ignoruj błędy ustawiania color scheme
        }
      }
    } catch (error) {
      console.error('Error saving color scheme to AsyncStorage:', error);
    }
  };

  return <ThemeContext.Provider value={{ scheme, setScheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
