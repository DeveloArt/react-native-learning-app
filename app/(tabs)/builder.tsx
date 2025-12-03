import { BuilderPracticeScreen } from '@/screens/Builder/BuilderPracticeScreen';
import { CategoriesScreen } from '@/screens/Categories/CategoriesScreen';
import { addSelectedCategoryListener, getSelectedCategory } from '@/src/storage/category';
import { useEffect, useState } from 'react';

export default function BuilderTab() {
  // undefined = loading, null = no saved category, string = selected category
  const [selected, setSelected] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    // subscribe to changes so tab updates immediately
    const unsub = addSelectedCategoryListener((v) => {
      if (!mounted) return;

      console.debug('[tabs/builder] listener got category', v);
      setSelected(v);
    });
    getSelectedCategory()
      .then((v) => {
        if (!mounted) return;

        console.debug('[tabs/builder] initial getSelectedCategory', v);
        setSelected(v);
      })
      .catch((e) => {
        console.debug('[tabs/builder] getSelectedCategory error', e);
        setSelected(null);
      });
    return () => {
      mounted = false;
      try {
        unsub();
      } catch {}
    };
  }, []);

  // while loading, render nothing to avoid flashing categories briefly
  if (selected === undefined) return null;

  if (selected) {
    return (
      <BuilderPracticeScreen
        categoryKey={selected}
        onExit={() => {
          // show categories without clearing persisted selection
          setSelected(null);
        }}
      />
    );
  }

  return <CategoriesScreen />;
}
