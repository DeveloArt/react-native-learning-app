import {
  ThemedTextColorName,
  ThemedTextProps,
  ThemedTextSize,
  ThemedTextWeight,
} from '@/types/types';
import { Text } from 'react-native';

const sizeToClass: Record<ThemedTextSize, string> = {
  small: 'text-[12px]',
  medium: 'text-[16px]',
  large: 'text-[20px]',
};

const weightToFontClass: Record<ThemedTextWeight, string> = {
  regular: 'font-montserratRegular',
  medium: 'font-montserratSemiBold',
  bold: 'font-montserratBold',
};

const colorToClass: Partial<Record<ThemedTextColorName, string>> = {
  text: 'text-textPrimary dark:text-textPrimary-dark',
  icon: 'text-icon dark:text-icon-dark',
};

export const ThemedText = ({
  children,
  size = 'medium',
  weight = 'regular',
  color = 'text',
  fontFamily,
  className,
  ...rest
}: ThemedTextProps) => {
  const sizeClass = sizeToClass[size];
  const fontClass = fontFamily ? `font-[${fontFamily}]` : weightToFontClass[weight];
  const colorClass = colorToClass[color] ?? colorToClass.text;
  const mergedClassName = [sizeClass, fontClass, colorClass, className].filter(Boolean).join(' ');

  return (
    <Text {...rest} className={mergedClassName}>
      {children}
    </Text>
  );
};
