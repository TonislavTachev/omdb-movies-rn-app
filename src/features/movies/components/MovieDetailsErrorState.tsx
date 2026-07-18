import { StateMessage } from '@/shared/components/StateMessage';
import { colors } from '@/shared/theme/colors';

interface MovieDetailsErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function MovieDetailsErrorState({
  message,
  onRetry,
}: MovieDetailsErrorStateProps) {
  return (
    <StateMessage
      actionAccessibilityHint="Retries loading movie details"
      actionAccessibilityLabel="Retry loading movie"
      actionLabel="Try Again"
      centered
      description={message}
      iconColor={colors.error}
      iconName="alert-circle-outline"
      onAction={onRetry}
      title="Unable to load movie"
    />
  );
}
