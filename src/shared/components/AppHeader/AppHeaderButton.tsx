import { APP_HEADER_BUTTON_SIZE } from '@/shared/components/AppHeader/constants';
import { type ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

interface AppHeaderButtonProps {
  children: ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
  disabled?: boolean;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function AppHeaderButton({
  children,
  onPress,
  accessibilityLabel,
  disabled = false,
  selected = false,
  style,
}: AppHeaderButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled, selected }}
      disabled={disabled}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.buttonPressed,
        disabled && styles.buttonDisabled,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: APP_HEADER_BUTTON_SIZE / 2,
    height: APP_HEADER_BUTTON_SIZE,
    justifyContent: 'center',
    width: APP_HEADER_BUTTON_SIZE,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
