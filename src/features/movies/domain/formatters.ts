import type { MovieType } from '@/features/movies/domain/types';

const MOVIE_TYPE_LABELS: Record<MovieType, string> = {
  movie: 'Movie',
  series: 'Series',
  episode: 'Episode',
  game: 'Game',
  unknown: 'Unknown',
};

export function formatMovieType(type: MovieType): string {
  return MOVIE_TYPE_LABELS[type];
}
