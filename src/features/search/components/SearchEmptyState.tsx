import { StateMessage } from '@/shared/components/StateMessage';

interface SearchEmptyStateProps {
  searchTerm: string;
}

export function SearchEmptyState({ searchTerm }: SearchEmptyStateProps) {
  return (
    <StateMessage
      description={`We could not find any movies matching “${searchTerm}”. Try a different title or check your spelling.`}
      iconName="search-outline"
      title="No movies found"
    />
  );
}
