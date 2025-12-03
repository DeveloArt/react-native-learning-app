import { BuilderPracticeScreen } from '@/screens/Builder/BuilderPracticeScreen';
import { addSelectedCategoryListener, getSelectedCategory } from '@/src/storage/category';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function BuilderPracticeRoute() {
  const params = useLocalSearchParams<{ category?: string }>();
  const paramCategory = params?.category as string | undefined;
  const [category, setCategory] = useState<string | undefined>(paramCategory);

  useEffect(() => {
    if (paramCategory) return;
    let mounted = true;
    const unsub = addSelectedCategoryListener((v) => {
      if (!mounted) return;

      console.debug('[builder] received selected-category-changed', v);
      setCategory(v ?? undefined);
    });
    getSelectedCategory()
      .then((v) => {
        if (!mounted) return;

        console.debug('[builder] initial getSelectedCategory', v);
        if (v) setCategory(v);
      })
      .catch((e) => {
        console.debug('[builder] getSelectedCategory error', e);
      });
    return () => {
      mounted = false;
      try {
        unsub();
      } catch {}
    };
  }, [paramCategory]);

  if (!category) return null;
  return <BuilderPracticeScreen categoryKey={category} />;
}
