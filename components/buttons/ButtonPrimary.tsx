import { memo, useState } from 'react';
import { AccessibilityRole, Pressable, StyleSheet, Text } from 'react-native';

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

const styles = StyleSheet.create({
  button: {
    height: 64,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  secondary: {
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#d7d7d7',
  },
  secondaryBlue: {
    backgroundColor: '#0d59f2',
  },
  secondaryBlueLight: {
    backgroundColor: '#E6EFFD',
  },
  textWhite: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  textDark: {
    color: '#1d1d1d',
    fontSize: 18,
    fontWeight: '600',
  },
});

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

  const buttonStyle = [
    styles.button,
    variant === 'secondary'
      ? styles.secondary
      : variant === 'secondaryBlue'
        ? styles.secondaryBlue
        : styles.secondaryBlueLight,
    pressed && { opacity: 0.8 },
    disabled && { opacity: 0.5 },
  ];

  const textStyle =
    variant === 'secondary'
      ? styles.textDark
      : variant === 'secondaryBlue'
        ? styles.textWhite
        : styles.textDark;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel ?? title}
      style={buttonStyle}
    >
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
});
