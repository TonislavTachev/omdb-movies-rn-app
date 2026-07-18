import { getMovieErrorMessage, MovieApiError } from '@/features/movies/api/errors';
import { useInfiniteMovieSearch } from '@/features/movies/hooks/useInfiniteMovieSearch';
import type { MovieSummary } from '@/features/movies/domain/types';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { removeDuplicatesById } from '@/shared/utils/removeDuplicatesById';
import { useCallback, useMemo, useState } from 'react';

const DEBOUNCE_DELAY_MS = 450;

export interface UseSearchScreenResult {
  searchInput: string;
  setSearchInput: (value: string) => void;
  clearSearch: () => void;
  searchTerm: string;
  isSearchActive: boolean;
  showInputLoading: boolean;
  movies: MovieSummary[];
  isPending: boolean;
  isError: boolean;
  isNotFound: boolean;
  errorMessage: string;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  hasPaginationError: boolean;
  retry: () => void;
  retryPagination: () => void;
  loadMore: () => void;
}

export function useSearchScreen(): UseSearchScreenResult {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchInput = useDebouncedValue(searchInput, DEBOUNCE_DELAY_MS);

  const searchTerm = debouncedSearchInput.trim();
  const normalizedInput = searchInput.trim();
  const isSearchActive = searchTerm.length > 0;
  const isDebouncing =
    normalizedInput.length > 0 && normalizedInput !== searchTerm;

  const {
    data,
    isPending,
    isFetching,
    isFetchingNextPage,
    isFetchNextPageError,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteMovieSearch({
    searchTerm,
    enabled: isSearchActive,
  });

  const movies = useMemo(() => {
    if (!isSearchActive) {
      return [];
    }

    const flattenedMovies =
      data?.pages.flatMap((page) => page.movies) ?? [];

    return removeDuplicatesById(flattenedMovies);
  }, [data, isSearchActive]);

  const isNotFound =
    isError && error instanceof MovieApiError && error.code === 'NOT_FOUND';

  const clearSearch = useCallback(() => {
    setSearchInput('');
  }, []);

  const retry = useCallback(() => {
    void refetch();
  }, [refetch]);

  const retryPagination = useCallback(() => {
    void fetchNextPage();
  }, [fetchNextPage]);

  const loadMore = useCallback(() => {
    if (!isSearchActive || !hasNextPage || isFetchingNextPage) {
      return;
    }

    void fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isSearchActive]);

  return {
    searchInput,
    setSearchInput,
    clearSearch,
    searchTerm,
    isSearchActive,
    showInputLoading:
      isDebouncing || (isFetching && isSearchActive && !isFetchingNextPage),
    movies,
    isPending,
    isError,
    isNotFound,
    errorMessage: getMovieErrorMessage(error),
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    hasPaginationError: isFetchNextPageError,
    retry,
    retryPagination,
    loadMore,
  };
}
