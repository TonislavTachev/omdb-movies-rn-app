import { searchMovies } from '@/features/movies/api/api';
import { getMovieErrorMessage } from '@/features/movies/api/errors';
import { movieKeys } from '@/features/movies/api/keys';
import { HOME_COLLECTIONS } from '@/features/movies/constants/homeCollections';
import type { MovieSummary } from '@/features/movies/domain/types';
import { removeDuplicatesById } from '@/shared/utils/removeDuplicatesById';
import { useQueries } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

const EXPLORE_LIMIT = 20;
const STALE_TIME = 10 * 60 * 1000;

export interface HomeMovieCollection {
  id: string;
  title: string;
  movies: MovieSummary[];
  isLoading: boolean;
  isError: boolean;
}

export interface UseHomeMoviesResult {
  collections: HomeMovieCollection[];
  featuredMovie: MovieSummary | null;
  exploreMovies: MovieSummary[];
  isInitialLoading: boolean;
  hasAnyData: boolean;
  hasCompleteFailure: boolean;
  errorMessage: string | null;
  refetchAll: () => Promise<void>;
}

export function useHomeMovies(): UseHomeMoviesResult {
  const queries = useQueries({
    queries: HOME_COLLECTIONS.map((collection) => ({
      queryKey: movieKeys.search(collection.searchTerm, 1),
      queryFn: ({ signal }: { signal: AbortSignal }) =>
        searchMovies({
          searchTerm: collection.searchTerm,
          page: 1,
          signal,
        }),
      staleTime: STALE_TIME,
    })),
  });

  const collections = useMemo(
    (): HomeMovieCollection[] =>
      HOME_COLLECTIONS.map((config, index) => {
        const query = queries[index];

        return {
          id: config.id,
          title: config.title,
          movies: query.data?.movies ?? [],
          isLoading: query.isPending,
          isError: query.isError,
        };
      }),
    [queries],
  );

  const successfulCollections = useMemo(
    () => collections.filter((collection) => collection.movies.length > 0),
    [collections],
  );

  const featuredMovie = successfulCollections[0]?.movies[0] ?? null;

  const exploreMovies = useMemo(() => {
    const combinedMovies = successfulCollections.flatMap(
      (collection) => collection.movies,
    );

    return removeDuplicatesById(combinedMovies).slice(0, EXPLORE_LIMIT);
  }, [successfulCollections]);

  const hasAnyData = collections.some((collection) => collection.movies.length > 0);

  const hasCompleteFailure =
    !hasAnyData && collections.every((collection) => collection.isError);

  const isInitialLoading =
    !hasAnyData && collections.some((collection) => collection.isLoading);

  const errorMessage = useMemo(() => {
    if (!hasCompleteFailure) {
      return null;
    }

    const firstError = queries.find((query) => query.error)?.error;

    return getMovieErrorMessage(firstError);
  }, [hasCompleteFailure, queries]);

  const refetchAll = useCallback(async () => {
    await Promise.all(queries.map((query) => query.refetch()));
  }, [queries]);

  return {
    collections,
    featuredMovie,
    exploreMovies,
    isInitialLoading,
    hasAnyData,
    hasCompleteFailure,
    errorMessage,
    refetchAll,
  };
}
