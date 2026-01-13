import { ThemedText } from '@/components/typography/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

interface Props {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
}

export function TopAppBar({ title, showBackButton = true, onBackPress, rightAction }: Props) {
  const scheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <View className="flex items-center bg-surfacePrimary dark:bg-surfacePrimary-dark p-6 pb-2 justify-between">
      {showBackButton && (
        <Pressable
          onPress={onBackPress}
          className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10"
        >
          <MaterialIcons name="arrow-back-ios" size={20} className="text-primary" />
        </Pressable>
      )}

      <View className="flex-1 items-center">
        <ThemedText weight="bold" className="text-xl">
          {title}
        </ThemedText>
      </View>

      {rightAction || <View className="w-10" />}
    </View>
  );
}
