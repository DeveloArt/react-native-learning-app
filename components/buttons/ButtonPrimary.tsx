import { memo, useState } from 'react';
import { AccessibilityRole, Pressable, Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'secondary' | 'secondaryBlue' | 'secondaryBlueLight';

interface Props {
  title?: string;
  onPress?: () => void;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
}

const getVariantClasses = (variant: ButtonVariant, disabled: boolean, pressed: boolean) => {
  const baseClasses = 'flex items-center justify-center rounded-xl';

  switch (variant) {
    case 'secondary':
      return twMerge(
        baseClasses,
        disabled
          ? 'bg-surfaceDisabled dark:bg-surfaceDisabled-dark'
          : pressed
            ? 'bg-surfaceTertiary dark:bg-surfaceTertiary-dark'
            : 'bg-surfacePrimary dark:bg-surfacePrimary-dark',
        'border-0',
      );
    case 'secondaryBlue':
      return twMerge(
        baseClasses,
        disabled
          ? 'bg-surfaceDisabled dark:bg-surfaceDisabled-dark'
          : pressed
            ? 'bg-surfaceActionSecondaryPress'
            : 'bg-surfaceActionSecondary dark:bg-surfaceActionSecondary-dark',
        'border-0',
      );
    case 'secondaryBlueLight':
      return twMerge(
        baseClasses,
        disabled
          ? 'bg-surfaceDisabled dark:bg-surfaceDisabled-dark'
          : pressed
            ? 'bg-surfaceActionSecondary'
            : 'bg-surfaceActionSecondaryLight dark:bg-surfaceActionSecondaryLight-dark',
        'border-0',
      );
    default:
      return baseClasses;
  }
};

const getTextClasses = (variant: ButtonVariant, disabled: boolean, pressed: boolean) => {
  const baseClasses = 'text-[18px] font-montserratSemiBold';

  if (disabled) {
    return twMerge(baseClasses, 'text-textDisabled');
  }

  switch (variant) {
    case 'secondary':
      return twMerge(baseClasses, 'text-textPrimary dark:text-textPrimary-dark');
    case 'secondaryBlue':
      return twMerge(baseClasses, 'text-white');
    case 'secondaryBlueLight':
      return twMerge(
        baseClasses,
        pressed ? 'text-white' : 'text-textPrimary dark:text-textPrimary-dark',
      );
    default:
      return baseClasses;
  }
};

const getSizeClasses = () => 'h-16';

export const ButtonPrimary = memo(function ButtonPrimary({
  title,
  onPress,
  className,
  textClassName,
  disabled = false,
  variant = 'secondaryBlue',
  accessibilityLabel,
  accessibilityRole = 'button',
}: Props) {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    if (!disabled) setPressed(true);
  };

  const handlePressOut = () => {
    setPressed(false);
  };

  const variantClasses = getVariantClasses(variant, disabled, pressed);
  const textClasses = getTextClasses(variant, disabled, pressed);
  const sizeClasses = getSizeClasses();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel ?? title}
      className={twMerge(variantClasses, sizeClasses, 'w-full', className)}
    >
      <View className="flex-row gap-2 justify-center items-center">
        {title && <Text className={twMerge(textClasses, textClassName)}>{title}</Text>}
      </View>
    </Pressable>
  );
});
