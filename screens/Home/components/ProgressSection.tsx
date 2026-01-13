import { Colors } from '@/constants/color';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

export function ProgressSection() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
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
    progressContainer: {
      paddingHorizontal: 16,
      paddingBottom: 40,
      gap: 16,
    },
    progressCard: {
      backgroundColor: colorScheme === 'dark' ? '#1e293b' : '#ffffff',
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#334155' : '#f1f5f9',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 3,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 8,
    },
    progressTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text,
    },
    progressValue: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.text + '60',
    },
    progressBarBackground: {
      width: '100%',
      height: 12,
      backgroundColor: colorScheme === 'dark' ? '#334155' : '#e2e8f0',
      borderRadius: 6,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      borderRadius: 6,
    },
    progressBarFillPrimary: {
      backgroundColor: '#2b8cee',
      width: '45%',
      shadowColor: '#2b8cee',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    progressBarFillSuccess: {
      backgroundColor: '#10b981',
      width: '80%',
      shadowColor: '#10b981',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    progressMessage: {
      fontSize: 11,
      color: colors.text + '60',
      fontStyle: 'italic',
      marginTop: 8,
    },
    progressValueHighlight: {
      fontSize: 12,
      fontWeight: '500',
      color: '#2b8cee',
    },
  });

  return (
    <>
      <Text style={styles.sectionTitle}>{t('home.progress.title')}</Text>
      <View style={styles.progressContainer}>
        {/* Words Learned Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>{t('home.progress.wordsLearned')}</Text>
            <Text style={styles.progressValue}>450 / 1000</Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, styles.progressBarFillPrimary]} />
          </View>
        </View>

        {/* Daily Goal Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>{t('home.progress.dailyGoal')}</Text>
            <Text style={styles.progressValueHighlight}>80%</Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, styles.progressBarFillSuccess]} />
          </View>
          <Text style={styles.progressMessage}>{t('home.progress.almostThere')}</Text>
        </View>
      </View>
    </>
  );
}
