import { StateMessage } from '@/shared/components/StateMessage';
import { colors } from '@/shared/theme/colors';

export function FavoritesEmptyState() {
  return (
    <StateMessage
      description="Save movies from their details page and they will appear here for quick access anytime."
      iconColor={colors.accent}
      iconName="heart-outline"
      title="No favorites yet"
    />
  );
}
