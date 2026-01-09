import { ThemedText } from '@/components/typography/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Image, TouchableOpacity, View } from 'react-native';

export function HomeScreenHeading() {
  const { t } = useTranslation();
  return (
    <View className="flex-col">
      {/* Top Bar */}
      <View className="flex-row items-center px-4 py-4 justify-between">
        <View className="w-12 h-12 items-center justify-center">
          <Image 
            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAsikV3g9uckfMY8qngscAVNoQNs5RbEjsl7rVBgne5ieyd3m9QTDmomCHla5prCSE4roZr2KtKCcE7ML9lAbgfXLfquiN-stn7sjrGTnFYXdyi-xytpF232aGLB-daJss_IUTMhodcVTO53oa86VUjXeancitFQ_x_PzrvzAXt45a8U6PJnQqgO2nlm0X_104aFEc05El-yGyB1ox9XIYCmr9riyX9QuGA-iSUpVuMunxMKnnwU8TvZZkAt2_0nOz0O3eLvhdCLI" }}
            className="w-10 h-10 rounded-full border-2 border-primary/20"
            resizeMode="cover"
          />
        </View>
        <ThemedText weight="bold" className="text-lg flex-1 px-3">
          ¡Hola!
        </ThemedText>
        <TouchableOpacity className="w-12 h-12 items-center justify-end">
          <MaterialCommunityIcons name="bell-outline" size={28} />
        </TouchableOpacity>
      </View>

      {/* Greeting */}
      <View className="px-4 pt-4">
        <ThemedText weight="bold" className="text-[32px] leading-tight">
          ¡Hola, Alex!
        </ThemedText>
        <ThemedText 
          size="small" 
          className="mt-1 text-textSecondary dark:text-textSecondary-dark"
        >
          Ready for your Spanish lesson today?
        </ThemedText>
      </View>
    </View>
  );
}
