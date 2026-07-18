import { colors } from '@/shared/theme/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { memo } from 'react';

interface FavoriteIconProps {
  isFavorite: boolean;
  size?: number;
}

function FavoriteIconComponent({
  isFavorite,
  size = 24,
}: FavoriteIconProps) {
  return (
    <Ionicons
      color={isFavorite ? colors.accent : colors.textPrimary}
      name={isFavorite ? 'heart' : 'heart-outline'}
      size={size}
    />
  );
}

export const FavoriteIcon = memo(FavoriteIconComponent);
