import { ThemedText } from '@/components/typography/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Platform, Pressable, View } from 'react-native';

interface Props {
  onPressIn?: () => void;
  onPressOut?: () => void;
  isRecording?: boolean;
  isProcessing?: boolean;
}

export function SpeakingMic({
  onPressIn,
  onPressOut,
  isRecording = false,
  isProcessing = false,
}: Props) {
  const { t } = useTranslation();
  const tabBarHeight = useBottomTabBarHeight();
  const bottomInset = Platform.OS === 'ios' ? tabBarHeight + 100 : 100;

  return (
    <View className="absolute right-0 left-0 px-4 pb-6" style={{ bottom: bottomInset }}>
      <View className="items-center">
        <Pressable
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          className={`items-center justify-center rounded-full shadow-dropShadow ${
            isRecording ? 'bg-red-500' : isProcessing ? 'bg-blue-500' : 'bg-surfaceActionSecondary'
          }`}
          style={{ width: 96, height: 96 }}
        >
          {isProcessing ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <MaterialCommunityIcons
              name={isRecording ? 'microphone' : 'microphone-outline'}
              size={48}
              color="#fff"
            />
          )}
        </Pressable>
        <ThemedText
          size="small"
          className="mt-2 text-textSecondary dark:text-textSecondary-dark text-center"
        >
          {isRecording
            ? t('speaking.recording')
            : isProcessing
              ? t('speaking.processing')
              : t('speaking.tapMic')}
        </ThemedText>
      </View>
    </View>
  );
}
