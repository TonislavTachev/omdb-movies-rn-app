import { StateMessage } from '@/shared/components/StateMessage';

interface HomeEmptyStateProps {
  onRetry: () => void;
}

export function HomeEmptyState({ onRetry }: HomeEmptyStateProps) {
  return (
    <StateMessage
      actionAccessibilityHint="Retries loading movies"
      actionAccessibilityLabel="Retry loading movies"
      actionLabel="Try Again"
      description="We could not find any movies for the curated collections right now."
      onAction={onRetry}
      title="No movies found"
    />
  );
}
