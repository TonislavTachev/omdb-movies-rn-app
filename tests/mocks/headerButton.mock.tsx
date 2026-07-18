import type { ReactNode } from 'react';
import { Pressable } from 'react-native';

interface HeaderButtonMockProps {
  children?: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
  };
  disabled?: boolean;
}

export function HeaderButton({
  children,
  onPress,
  accessibilityLabel,
  accessibilityState,
  disabled,
}: HeaderButtonMockProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      disabled={disabled}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}
