import { StateMessage } from '@/shared/components/StateMessage';
import { colors } from '@/shared/theme/colors';

interface HomeErrorStateProps {
  title?: string;
  message: string;
  onRetry: () => void;
}

export function HomeErrorState({
  title = 'Unable to load movies',
  message,
  onRetry,
}: HomeErrorStateProps) {
  return (
    <StateMessage
      actionAccessibilityHint="Retries loading movies"
      actionAccessibilityLabel="Retry loading movies"
      actionLabel="Try Again"
      description={message}
      iconColor={colors.error}
      iconName="alert-circle-outline"
      onAction={onRetry}
      title={title}
    />
  );
}
