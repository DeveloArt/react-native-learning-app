import { ThemedText } from '@/components/typography/ThemedText';
import { categoryCards } from '@/screens/Categories/data/cards';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native';

interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onCategorySelect: (categoryKey: string) => void;
  paddingTop: number;
  paddingBottom: number;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  visible,
  onClose,
  onCategorySelect,
  paddingTop,
  paddingBottom,
}) => {
  const { t } = useTranslation();

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <ScrollView
        className="flex-1 bg-surfaceSecondary dark:bg-surfaceSecondary-dark"
        contentContainerStyle={{ padding: 16, paddingTop, paddingBottom }}
      >
        <View className="gap-3 mt-2">
          {categoryCards.map((c) => (
            <TouchableOpacity
              key={c.key}
              onPress={() => onCategorySelect(c.key)}
              className="rounded-2xl bg-surfacePrimary dark:bg-surfacePrimary-dark"
            >
              <View className="flex-row justify-between items-center p-4">
                <View className="flex-row gap-4 items-center">
                  <View className="p-3 rounded-xl" style={{ backgroundColor: c.color }}>
                    <MaterialCommunityIcons name={c.icon as any} size={22} color={c.iconColor} />
                  </View>
                  <View>
                    <ThemedText weight="bold">{t(`builder.categories.${c.key}`)}</ThemedText>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <View style={{ height: 24 }} />
          <TouchableOpacity
            onPress={onClose}
            className="w-full px-4 py-3 rounded-full bg-white dark:bg-surfaceTertiary-dark"
          >
            <ThemedText className="text-center text-black dark:text-white">
              {t('common.buttons.close') || 'Close'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};
