import { BuilderPracticeScreen } from '@/screens/Builder/BuilderPracticeScreen';
import { getSelectedCategory } from '@/src/storage/category';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function BuilderPracticeRoute() {
  const params = useLocalSearchParams<{ category?: string }>();
  const paramCategory = params?.category as string | undefined;
  const [category, setCategory] = useState<string | undefined>(paramCategory);

  useEffect(() => {
    if (paramCategory) return;
    let mounted = true;
    getSelectedCategory().then((v) => {
      if (!mounted) return;
      if (v) setCategory(v);
    });
    return () => {
      mounted = false;
    };
  }, [paramCategory]);

  if (!category) return null;
  return <BuilderPracticeScreen categoryKey={category} />;
}
