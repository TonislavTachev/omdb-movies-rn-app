import { FavoriteIcon } from '@/features/favorites/components/FavoriteIcon';
import { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  disabled?: boolean;
}

function FavoriteButtonComponent({
  isFavorite,
  onPress,
  disabled = false,
}: FavoriteButtonProps) {
  const label = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled, selected: isFavorite }}
      disabled={disabled}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <FavoriteIcon isFavorite={isFavorite} />
    </Pressable>
  );
}

export const FavoriteButton = memo(FavoriteButtonComponent);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 44,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
});
