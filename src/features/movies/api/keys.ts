import type { MovieType } from '@/features/movies/domain/types';

export const movieKeys = {
  all: ['movies'] as const,
  searches: () => [...movieKeys.all, 'search'] as const,
  search: (
    searchTerm: string,
    page: number,
    type?: MovieType,
    year?: string,
  ) =>
    [
      ...movieKeys.searches(),
      searchTerm,
      page,
      type ?? 'unknown',
      year ?? '',
    ] as const,
  infiniteSearch: ({
    searchTerm,
    type,
    year,
  }: {
    searchTerm: string;
    type?: MovieType;
    year?: string;
  }) => {
    const normalizedSearchTerm = searchTerm.trim();

    return [
      ...movieKeys.searches(),
      'infinite',
      {
        searchTerm: normalizedSearchTerm,
        type: type ?? 'unknown',
        year: year ?? '',
      },
    ] as const;
  },
  details: () => [...movieKeys.all, 'details'] as const,
  detail: (imdbID: string) => [...movieKeys.details(), imdbID] as const,
};
