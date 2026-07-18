import type { MovieSummary } from '@/features/movies/domain/types';
import { removeDuplicatesById } from '@/shared/utils/removeDuplicatesById';

export function addFavorite(
  favorites: readonly MovieSummary[],
  movie: MovieSummary,
): MovieSummary[] {
  if (favorites.some((favorite) => favorite.id === movie.id)) {
    return [...favorites];
  }

  return removeDuplicatesById([...favorites, movie]);
}

export function removeFavorite(
  favorites: readonly MovieSummary[],
  movieId: string,
): MovieSummary[] {
  return favorites.filter((favorite) => favorite.id !== movieId);
}

export function toggleFavorite(
  favorites: readonly MovieSummary[],
  movie: MovieSummary,
): MovieSummary[] {
  const exists = favorites.some((favorite) => favorite.id === movie.id);

  if (exists) {
    return removeFavorite(favorites, movie.id);
  }

  return addFavorite(favorites, movie);
}
