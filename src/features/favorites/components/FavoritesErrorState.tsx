import { StateMessage } from '@/shared/components/StateMessage';
import { colors } from '@/shared/theme/colors';

interface FavoritesErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function FavoritesErrorState({
  message,
  onRetry,
}: FavoritesErrorStateProps) {
  return (
    <StateMessage
      actionAccessibilityHint="Retries loading favorites"
      actionAccessibilityLabel="Retry loading favorites"
      actionLabel="Try Again"
      description={message}
      iconColor={colors.error}
      iconName="alert-circle-outline"
      onAction={onRetry}
      title="Unable to load favorites"
    />
  );
}
