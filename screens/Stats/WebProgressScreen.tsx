import { ThemedText } from '@/components/typography/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const WEEK_DATA = [
  { day: 'L', mins: 45, opacity: 0.4 },
  { day: 'M', mins: 60, opacity: 0.6 },
  { day: 'M', mins: 30, opacity: 0.3 },
  { day: 'J', mins: 85, opacity: 1 },
  { day: 'V', mins: 70, opacity: 0.8 },
  { day: 'S', mins: 20, opacity: 0.2 },
  { day: 'D', mins: 75, opacity: 0.9 },
];

const MASTERED = [
  { id: '1', word: 'Biblioteca', translation: 'Library', type: 'Sustantivo' },
  { id: '2', word: 'Desayuno', translation: 'Breakfast', type: 'Sustantivo' },
  { id: '3', word: 'Caminar', translation: 'To walk', type: 'Verbo' },
];

export function WebProgressScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + 2;
  const paddingBottom = insets.bottom + 10;

  return (
    <View 
      className="flex-1 bg-surfaceSecondary dark:bg-surfaceSecondary-dark"
      style={{ paddingTop, paddingBottom }}
    >
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-800">
          <TouchableOpacity className="w-10 h-10 rounded-full items-center justify-center">
            <MaterialCommunityIcons name="arrow-left" size={20} />
          </TouchableOpacity>
          <ThemedText weight="bold" className="text-lg">
            Progreso de Aprendizaje
          </ThemedText>
          <TouchableOpacity className="w-10 h-10 rounded-full items-center justify-center">
            <MaterialCommunityIcons name="share" size={20} />
          </TouchableOpacity>
        </View>

        <View className="p-4 gap-4">
          {/* Branding */}
          <View className="flex-row items-center gap-2 px-2">
            <View className="w-8 h-8 bg-primary rounded-full items-center justify-center">
              <ThemedText weight="bold" className="text-white text-xs">
                ¡H!
              </ThemedText>
            </View>
            <ThemedText weight="bold" className="text-primary">
              ¡Hola! App
            </ThemedText>
          </View>

          {/* Summary Stats */}
          <View className="gap-3">
            <View className="flex-col gap-2 rounded-xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surfaceSecondary-dark">
              <View className="flex-row justify-between items-center">
                <ThemedText 
                  size="small" 
                  className="text-textSecondary dark:text-textSecondary-dark font-medium"
                >
                  Palabras Totales
                </ThemedText>
                <MaterialCommunityIcons name="book-open" size={20} color="#0d59f2" />
              </View>
              <ThemedText weight="bold" className="text-3xl">
                450
              </ThemedText>
              <View className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <View className="h-full bg-primary rounded-full" style={{ width: '65%' }}></View>
              </View>
              <ThemedText 
                size="small" 
                className="text-textSecondary dark:text-textSecondary-dark"
              >
                Objetivo: 1000 palabras
              </ThemedText>
            </View>
            
            <View className="flex-row gap-3">
              <View className="flex-1 flex-col gap-2 rounded-xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surfaceSecondary-dark">
                <ThemedText 
                  size="small" 
                  className="text-textSecondary dark:text-textSecondary-dark font-medium"
                >
                  Días de Estudio
                </ThemedText>
                <ThemedText weight="bold" className="text-2xl">
                  24
                </ThemedText>
                <MaterialCommunityIcons name="calendar" size={20} color="#fb923c" />
              </View>
              
              <View className="flex-1 flex-col gap-2 rounded-xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surfaceSecondary-dark">
                <ThemedText 
                  size="small" 
                  className="text-textSecondary dark:text-textSecondary-dark font-medium"
                >
                  Racha Actual
                </ThemedText>
                <ThemedText weight="bold" className="text-2xl">
                  7 días
                </ThemedText>
                <MaterialCommunityIcons name="fire" size={20} color="#ef4444" />
              </View>
            </View>
          </View>

          {/* Activity Chart */}
          <View className="rounded-xl p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-surfaceSecondary-dark">
            <View className="flex-row items-center justify-between mb-6">
              <View>
                <ThemedText weight="bold" className="text-base">
                  Actividad Semanal
                </ThemedText>
                <ThemedText 
                  size="small" 
                  className="text-textSecondary dark:text-textSecondary-dark"
                >
                  Minutos de estudio por día
                </ThemedText>
              </View>
              <View className="items-end">
                <ThemedText weight="bold" className="text-xl text-primary">
                  120 min
                </ThemedText>
                <View className="flex-row items-center gap-1">
                  <MaterialCommunityIcons name="trending-up" size={12} color="#16a34a" />
                  <ThemedText 
                    weight="bold" 
                    size="small" 
                    className="text-green-500"
                  >
                    +15%
                  </ThemedText>
                </View>
              </View>
            </View>
            
            {/* Simple bar chart representation */}
            <View className="flex-row items-end justify-between h-40 w-full px-2">
              {WEEK_DATA.map((entry, index) => (
                <View key={index} className="flex-1 items-center">
                  <View 
                    className="w-full bg-primary rounded-t-lg"
                    style={{ 
                      height: `${(entry.mins / 100) * 100}%`,
                      opacity: entry.opacity
                    }}
                  />
                  <ThemedText 
                    size="small" 
                    className="text-textSecondary dark:text-textSecondary-dark font-bold mt-2"
                  >
                    {entry.day}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>

          {/* Mastered Section */}
          <View>
            <View className="flex-row items-center justify-between mb-4">
              <ThemedText weight="bold" className="text-lg">
                Recién Dominadas
              </ThemedText>
              <TouchableOpacity>
                <ThemedText weight="bold" className="text-primary text-sm">
                  Ver todas
                </ThemedText>
              </TouchableOpacity>
            </View>
            <View className="gap-3">
              {MASTERED.map((word) => (
                <View key={word.id} className="flex-row items-center justify-between p-4 bg-white dark:bg-surfaceSecondary-dark rounded-xl border border-slate-200 dark:border-slate-800">
                  <View className="flex-row items-center gap-4">
                    <View className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center">
                      <MaterialCommunityIcons name="check-decagram" size={20} color="#16a34a" />
                    </View>
                    <View>
                      <ThemedText weight="bold" className="text-base">
                        {word.word}
                      </ThemedText>
                      <ThemedText 
                        size="small" 
                        className="text-textSecondary dark:text-textSecondary-dark"
                      >
                        {word.translation}
                      </ThemedText>
                    </View>
                  </View>
                  <View className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <ThemedText 
                      weight="bold" 
                      size="small" 
                      className="text-textSecondary dark:text-textSecondary-dark uppercase tracking-wider"
                    >
                      {word.type}
                    </ThemedText>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* CTA */}
          <TouchableOpacity className="w-full bg-primary rounded-full py-4 flex-row items-center justify-center gap-2">
            <ThemedText weight="bold" className="text-white">
              Continuar Aprendiendo
            </ThemedText>
            <MaterialCommunityIcons name="play-circle" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
