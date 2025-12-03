import AsyncStorage from '@react-native-async-storage/async-storage';

const SELECTED_CATEGORY_KEY = 'selected-category';

type Listener = (key: string | null) => void;
const listeners = new Set<Listener>();

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
  try {
    listeners.forEach((l) => {
      try {
        l(key);
      } catch (e) {}
    });
  } catch (err) {
    console.error('[category] notify error', err);
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

export function addSelectedCategoryListener(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function removeSelectedCategoryListener(fn: Listener) {
  listeners.delete(fn);
}

export default {
  saveSelectedCategory,
  getSelectedCategory,
  addSelectedCategoryListener,
  removeSelectedCategoryListener,
};
