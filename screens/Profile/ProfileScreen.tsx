import { Colors } from '@/constants/color';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const colors = Colors[colorScheme ?? 'light'];

  const [ttsSpeed, setTtsSpeed] = useState(1.0);
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      paddingTop: 20,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      flex: 1,
      textAlign: 'center',
      marginRight: 40,
    },
    profileSection: {
      padding: 24,
      alignItems: 'center',
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: '#2b8cee',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    avatarText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      color: '#2b8cee',
      marginBottom: 8,
    },
    section: {
      padding: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
    },
    card: {
      backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : 'white',
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    languageSelector: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    languageLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: '#2b8cee',
      marginBottom: 8,
    },
    languageButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#333' : '#e2e8f0',
      borderRadius: 12,
      backgroundColor: colors.background,
    },
    languageText: {
      fontSize: 16,
      color: colors.text,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
    },
    settingLabel: {
      fontSize: 16,
      color: colors.text,
    },
    settingValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#2b8cee',
    },
    sliderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginTop: 8,
    },
    linkCard: {
      backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : 'white',
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    linkRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colorScheme === 'dark' ? '#333' : '#f1f5f9',
    },
    linkContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    linkText: {
      fontSize: 16,
      color: colors.text,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: 16,
      backgroundColor: colorScheme === 'dark' ? '#7f1d1d' : '#fef2f2',
      borderRadius: 12,
      marginTop: 24,
    },
    logoutText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colorScheme === 'dark' ? '#ef4444' : '#dc2626',
    },
    slider: {
      flex: 1,
      height: 40,
    },
    versionText: {
      textAlign: 'center',
      fontSize: 12,
      color: colors.text + '80',
      marginTop: 16,
    },
  });

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const handleLogout = () => {
    Alert.alert(t('profile.logout'), t('profile.logoutConfirm'), [
      { text: t('common.buttons.cancel'), style: 'cancel' },
      { text: t('profile.logout'), onPress: () => console.log('Logout') },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('profile.title')}</Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AM</Text>
          </View>
          <Text style={styles.name}>Alex Miller</Text>
          <Text style={styles.subtitle}>Spanish Learner • Level 12</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.preferences')}</Text>
          <View style={styles.card}>
            <Text style={styles.languageLabel}>{t('profile.appLanguage')}</Text>
            <TouchableOpacity
              style={styles.languageButton}
              onPress={() => handleLanguageChange(i18n.language === 'en' ? 'pl' : 'en')}
            >
              <Text style={styles.languageText}>
                {i18n.language === 'en' ? '🇬🇧 English' : '🇵🇱 Polski'}
              </Text>
              <MaterialCommunityIcons name="chevron-down" size={20} color="#2b8cee" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.learningSettings')}</Text>
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>{t('profile.ttsSpeed')}</Text>
              <Text style={styles.settingValue}>{ttsSpeed.toFixed(1)}x</Text>
            </View>
            <View style={styles.sliderContainer}>
              <MaterialCommunityIcons name="turtle" size={24} color={colors.text + '60'} />
              <Slider
                style={styles.slider}
                minimumValue={0.5}
                maximumValue={2.0}
                step={0.1}
                value={ttsSpeed}
                onValueChange={setTtsSpeed}
                minimumTrackTintColor="#2b8cee"
                maximumTrackTintColor={colorScheme === 'dark' ? '#475569' : '#e2e8f0'}
              />
              <MaterialCommunityIcons name="rabbit" size={24} color={colors.text + '60'} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.legalAndSupport')}</Text>
          <View style={styles.linkCard}>
            <TouchableOpacity style={styles.linkRow}>
              <View style={styles.linkContent}>
                <MaterialCommunityIcons name="shield-account" size={24} color="#2b8cee" />
                <Text style={styles.linkText}>{t('profile.privacyPolicy')}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text + '40'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkRow}>
              <View style={styles.linkContent}>
                <MaterialCommunityIcons name="file-document" size={24} color="#2b8cee" />
                <Text style={styles.linkText}>{t('profile.termsOfService')}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text + '40'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkRow}>
              <View style={styles.linkContent}>
                <MaterialCommunityIcons name="help-circle" size={24} color="#2b8cee" />
                <Text style={styles.linkText}>{t('profile.helpCenter')}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color={colors.text + '40'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialCommunityIcons
              name="logout"
              size={24}
              color={colorScheme === 'dark' ? '#ef4444' : '#dc2626'}
            />
            <Text style={styles.logoutText}>{t('profile.logout')}</Text>
          </TouchableOpacity>
          <Text style={styles.versionText}>¡Hola! v2.4.0 — Made for Language Lovers</Text>
        </View>
      </ScrollView>
    </View>
  );
}
