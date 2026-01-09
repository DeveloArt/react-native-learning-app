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
  const nativewind = useNativewindColorScheme();

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
          setSchemeState(stored);
          nativewind.setColorScheme(stored);
        } else if (defaultScheme) {
          nativewind.setColorScheme(defaultScheme);
        }
      } catch {
        // Error loading theme - continue with default
      }
    })();
  }, [defaultScheme, nativewind]);

  const setScheme = async (s: AppColorScheme) => {
    try {
      if (s === null) await AsyncStorage.removeItem(STORAGE_KEY);
      else await AsyncStorage.setItem(STORAGE_KEY, s);
    } catch {
      // Error saving theme - continue
    }
    setSchemeState(s);
    try {
      if (s === null) nativewind.setColorScheme('system');
      else nativewind.setColorScheme(s as 'light' | 'dark');
    } catch {
      // Error setting theme - continue
    }
  };

  return <ThemeContext.Provider value={{ scheme, setScheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
