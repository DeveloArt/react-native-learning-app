import AsyncStorage from '@react-native-async-storage/async-storage';

const SELECTED_CATEGORY_KEY = 'selected-category';

export async function saveSelectedCategory(key: string | null) {
  try {
    if (key === null) {
      await AsyncStorage.removeItem(SELECTED_CATEGORY_KEY);
    } else {
      await AsyncStorage.setItem(SELECTED_CATEGORY_KEY, key);
    }
  } catch (e) {
    console.error('Error saving selected category', e);
  }
}

export async function getSelectedCategory(): Promise<string | null> {
  try {
    const v = await AsyncStorage.getItem(SELECTED_CATEGORY_KEY);
    return v;
  } catch (e) {
    console.error('Error reading selected category', e);
    return null;
  }
}

export default { saveSelectedCategory, getSelectedCategory };
