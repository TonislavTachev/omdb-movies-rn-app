import { searchMovies } from '@/features/movies/api/api';
import { movieKeys } from '@/features/movies/api/keys';
import type { MovieType } from '@/features/movies/domain/types';
import { useInfiniteQuery } from '@tanstack/react-query';

const STALE_TIME = 5 * 60 * 1000;

export interface UseInfiniteMovieSearchParams {
  searchTerm: string;
  type?: MovieType;
  year?: string;
  enabled?: boolean;
}

export function useInfiniteMovieSearch({
  searchTerm,
  type,
  year,
  enabled,
}: UseInfiniteMovieSearchParams) {
  const normalizedSearchTerm = searchTerm.trim();
  const hasSearchTerm = normalizedSearchTerm.length > 0;
  const isEnabled = (enabled ?? hasSearchTerm) && hasSearchTerm;

  return useInfiniteQuery({
    queryKey: movieKeys.infiniteSearch({
      searchTerm: normalizedSearchTerm,
      type,
      year,
    }),
    queryFn: ({ pageParam, signal }) =>
      searchMovies({
        searchTerm: normalizedSearchTerm,
        page: pageParam,
        type,
        year,
        signal,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce(
        (total, page) => total + page.movies.length,
        0,
      );

      if (loadedCount >= lastPage.totalResults || lastPage.movies.length === 0) {
        return undefined;
      }

      return lastPage.page + 1;
    },
    enabled: isEnabled,
    staleTime: STALE_TIME,
  });
}
