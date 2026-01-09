export interface SubcategoryItem {
  key: string; // i18n key under builder.subcategories
  color: string; // color hue derived from the parent category color
}

export interface CategoryCard {
  key: string; // i18n key under builder.categories
  color: string; // base color for the category icon background
  icon: string;
  iconColor: string;
  progress?: number; // progress percentage (0-100)
  subcategories: SubcategoryItem[]; // exactly 4 subcategories
}

export interface CategoryItemProps {
  card: CategoryCard;
  expanded: boolean;
  onToggle: () => void;
  onPressSubcategory: (categoryKey: string, subKey: string) => void;
}
