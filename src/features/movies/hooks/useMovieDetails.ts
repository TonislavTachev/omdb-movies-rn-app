import { getMovieDetails } from '@/features/movies/api/api';
import { movieKeys } from '@/features/movies/api/keys';
import { useQuery } from '@tanstack/react-query';

export function useMovieDetails(
  imdbID: string,
  options?: {
    enabled?: boolean;
  },
) {
  const normalizedImdbID = imdbID.trim();
  const hasImdbID = normalizedImdbID.length > 0;
  const isEnabled = (options?.enabled ?? hasImdbID) && hasImdbID;

  return useQuery({
    queryKey: movieKeys.detail(normalizedImdbID),
    queryFn: ({ signal }) =>
      getMovieDetails({
        imdbID: normalizedImdbID,
        signal,
      }),
    enabled: isEnabled,
  });
}
