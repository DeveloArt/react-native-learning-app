import { Colors } from '@/constants/color';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function StreakCard() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { t } = useTranslation();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colorScheme === 'dark' ? '#1e293b' : '#ffffff',
      borderRadius: 12,
      padding: 20,
      marginVertical: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 20,
      elevation: 5,
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#334155' : '#f1f5f9',
    },
    contentContainer: {
      flex: 1.5,
      justifyContent: 'space-between',
      gap: 16,
    },
    streakHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 4,
    },
    streakTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    streakDescription: {
      fontSize: 14,
      color: colors.text + '80',
      lineHeight: 20,
    },
    practiceButton: {
      alignSelf: 'flex-start',
      backgroundColor: '#2b8cee',
      paddingHorizontal: 24,
      paddingVertical: 10,
      borderRadius: 20,
      shadowColor: '#2b8cee',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    practiceButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
    },
    imageContainer: {
      flex: 1,
      maxWidth: 120,
      aspectRatio: 1,
      borderRadius: 12,
      overflow: 'hidden',
    },
    imagePlaceholder: {
      width: '100%',
      height: '100%',
      backgroundColor: '#fb923c',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imagePlaceholderText: {
      fontSize: 48,
      color: 'white',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <View style={styles.streakHeader}>
            <MaterialCommunityIcons name="fire" size={24} color="#fb923c" />
            <Text style={styles.streakTitle}>{t('home.streak.dayStreak')}</Text>
          </View>
          <Text style={styles.streakDescription}>{t('home.streak.encouragement')}</Text>
        </View>
        <TouchableOpacity
          style={styles.practiceButton}
          onPress={() => router.push('/(content)/flashcards')}
        >
          <Text style={styles.practiceButtonText}>{t('home.streak.practiceNow')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZmrpnpMa9OHYHM7tJcYZffApQoCvXM5d_pFgA-zrD2EPIT7o_1dRW0QRudSxBWhmXrrY8V4_M8WfLkxIizG1JrJMPJxht_OEHZf0R7o2MaRaZeFiIyofx-4UvHwcjaPz793kmi1olB4zOA3ZXNqpe4chpSA4EI2JqrDH5atcgULo6G-YoBEpqf_c9f9BBWTOdtzdGYDQqZakPnzfJD0POTt_kqceoqaoZqvQcDoyHhq9kBRm6xVitP2O3mJdF1Fq5XgqRB99u_sg',
          }}
          style={styles.imageContainer}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}
