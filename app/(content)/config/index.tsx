import { ButtonPrimary } from '@/components/buttons/ButtonPrimary';
import { ThemedText } from '@/components/typography/ThemedText';
import i18n from '@/i18n';
import ThemeContext from '@/src/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ConfigScreen() {
  const router = useRouter();
  const [offline, setOffline] = useState(false);
  const [isPolish, setIsPolish] = useState(i18n.language === 'pl');
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [ttsRate, setTtsRate] = useState(1.0);
  const { scheme, setScheme } = useContext(ThemeContext);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('tts-rate');
        if (stored) {
          const rate = parseFloat(stored);
          if (!isNaN(rate) && rate >= 0.5 && rate <= 1.0) {
            setTtsRate(rate);
          }
        }
      } catch (error) {
        console.error('Error loading TTS rate from AsyncStorage:', error);
      }
    })();
  }, []);

  return (
    <View className="flex-1 px-4 py-5 bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
      <View className="gap-3">
        <View className="p-4 bg-surfacePrimary dark:bg-surfacePrimary-dark flex-row items-center justify-between">
          <View>
            <ThemedText weight="bold">{t('config.language')}</ThemedText>
            <ThemedText
              size="small"
              className="mt-1 text-textSecondary dark:text-textSecondary-dark"
            >
              {isPolish ? t('config.languagePolish') : t('config.languageEnglish')}
            </ThemedText>
          </View>
          <Pressable
            accessibilityRole="switch"
            accessibilityState={{ checked: isPolish }}
            onPress={async () => {
              const nextLang = isPolish ? 'en' : 'pl';
              await i18n.changeLanguage(nextLang);
              setIsPolish((v) => !v);
            }}
            className={
              isPolish
                ? 'w-14 h-8 rounded-full bg-surfaceActionSecondary flex-row items-center px-1'
                : 'w-14 h-8 rounded-full bg-surfaceTertiary dark:bg-surfaceTertiary-dark flex-row items-center px-1'
            }
          >
            <View
              className={
                isPolish
                  ? 'ml-auto w-6 h-6 rounded-full items-center justify-center bg-white'
                  : 'w-6 h-6 rounded-full items-center justify-center bg-white'
              }
            >
              {isPolish ? (
                <MaterialCommunityIcons name="check" size={16} color="#0d59f2" />
              ) : (
                <MaterialCommunityIcons name="close" size={16} color="#767676" />
              )}
            </View>
          </Pressable>
        </View>

        <View className="p-4 bg-surfacePrimary dark:bg-surfacePrimary-dark flex-row items-center justify-between">
          <ThemedText weight="bold">{t('config.offlineMode')}</ThemedText>
          <Pressable
            accessibilityRole="switch"
            accessibilityState={{ checked: offline }}
            onPress={() => setOffline((v) => !v)}
            className={
              offline
                ? 'w-14 h-8 rounded-full bg-surfaceActionSecondary flex-row items-center px-1'
                : 'w-14 h-8 rounded-full bg-surfaceTertiary dark:bg-surfaceTertiary-dark flex-row items-center px-1'
            }
          >
            <View
              className={
                offline
                  ? 'ml-auto w-6 h-6 rounded-full items-center justify-center bg-white'
                  : 'w-6 h-6 rounded-full items-center justify-center bg-white'
              }
            >
              {offline ? (
                <MaterialCommunityIcons name="check" size={16} color="#0d59f2" />
              ) : (
                <MaterialCommunityIcons name="close" size={16} color="#767676" />
              )}
            </View>
          </Pressable>
        </View>

        <View className="p-4 bg-surfacePrimary dark:bg-surfacePrimary-dark gap-2">
          <ThemedText weight="bold">{t('config.ttsSpeed')}</ThemedText>
          <View className="flex-row justify-between">
            <ThemedText size="small">0.5x</ThemedText>
            <ThemedText size="small">{ttsRate.toFixed(2)}x</ThemedText>
            <ThemedText size="small">1.0x</ThemedText>
          </View>
          {/* Simple stepped slider using pressable segments (avoid native slider dep) */}
          <View className="flex-row gap-2 mt-1">
            {[0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map((r) => (
              <Pressable
                key={r}
                accessibilityRole="button"
                onPress={async () => {
                  setTtsRate(r);
                  try {
                    await AsyncStorage.setItem('tts-rate', String(r));
                  } catch (error) {
                    console.error('Error saving TTS rate to AsyncStorage:', error);
                  }
                }}
                className={
                  r === ttsRate
                    ? 'flex-1 h-3 rounded-md bg-surfaceActionSecondary'
                    : 'flex-1 h-3 rounded-md bg-surfaceTertiary dark:bg-surfaceTertiary-dark'
                }
              />
            ))}
          </View>
        </View>

        <View className="p-4 bg-surfacePrimary dark:bg-surfacePrimary-dark flex-row items-center justify-between">
          <View>
            <ThemedText weight="bold">{t('config.darkMode')}</ThemedText>
            <ThemedText
              size="small"
              className="mt-1 text-textSecondary dark:text-textSecondary-dark"
            >
              {scheme === 'dark' ? t('config.enabled') : t('config.disabled')}
            </ThemedText>
          </View>
          <Pressable
            accessibilityRole="switch"
            accessibilityState={{ checked: scheme === 'dark' }}
            onPress={async () => {
              try {
                await setScheme(scheme === 'dark' ? 'light' : 'dark');
              } catch (error) {
                console.error('Error changing color scheme:', error);
              }
            }}
            className={
              scheme === 'dark'
                ? 'w-14 h-8 rounded-full bg-surfaceActionSecondary flex-row items-center px-1'
                : 'w-14 h-8 rounded-full bg-surfaceTertiary dark:bg-surfaceTertiary-dark flex-row items-center px-1'
            }
          >
            <View
              className={
                scheme === 'dark'
                  ? 'ml-auto w-6 h-6 rounded-full items-center justify-center bg-white'
                  : 'w-6 h-6 rounded-full items-center justify-center bg-white'
              }
            >
              {scheme === 'dark' ? (
                <MaterialCommunityIcons name="check" size={16} color="#0d59f2" />
              ) : (
                <MaterialCommunityIcons name="close" size={16} color="#767676" />
              )}
            </View>
          </Pressable>
        </View>
      </View>

      <View className="absolute right-0 left-0 px-4" style={{ bottom: insets.bottom + 16 }}>
        <ButtonPrimary
          title={t('common.buttons.apply')}
          variant="secondaryBlue"
          className="rounded-full"
          onPress={() => router.push('/(tabs)')}
        />
      </View>
    </View>
  );
}
