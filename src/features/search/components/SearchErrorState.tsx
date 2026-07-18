import { StateMessage } from '@/shared/components/StateMessage';
import { colors } from '@/shared/theme/colors';

interface SearchErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function SearchErrorState({ message, onRetry }: SearchErrorStateProps) {
  return (
    <StateMessage
      actionAccessibilityHint="Retries the movie search"
      actionAccessibilityLabel="Retry search"
      actionLabel="Try Again"
      description={message}
      iconColor={colors.error}
      iconName="alert-circle-outline"
      onAction={onRetry}
      title="Unable to search movies"
    />
  );
}
