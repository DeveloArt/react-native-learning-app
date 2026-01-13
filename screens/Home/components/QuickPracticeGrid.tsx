import { Colors } from '@/constants/color';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function QuickPracticeGrid() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      paddingHorizontal: 16,
      paddingBottom: 8,
      paddingTop: 16,
    },
    gridContainer: {
      flexDirection: 'row',
      gap: 12,
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    practiceCard: {
      flex: 1,
      aspectRatio: 1,
      backgroundColor: colorScheme === 'dark' ? '#1e293b' : '#ffffff',
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#334155' : '#f1f5f9',
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#2b8cee20',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
    },
  });

  const practiceItems = [
    {
      id: 'flashcards',
      icon: 'cards',
      titleKey: 'home.quickPractice.flashcards',
      route: '/(content)/flashcards',
    },
    {
      id: 'builder',
      icon: 'view-dashboard',
      titleKey: 'home.quickPractice.builder',
      route: '/(content)/builder',
    },
    {
      id: 'speaking',
      icon: 'microphone',
      titleKey: 'home.quickPractice.speaking',
      route: '/(content)/speaking',
    },
  ];

  return (
    <>
      <Text style={styles.sectionTitle}>{t('home.quickPractice.title')}</Text>
      <View style={styles.gridContainer}>
        {practiceItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.practiceCard}
            onPress={() => router.push(item.route as any)}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={item.icon as any} size={32} color="#2b8cee" />
            </View>
            <Text style={styles.cardTitle}>{t(item.titleKey)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
