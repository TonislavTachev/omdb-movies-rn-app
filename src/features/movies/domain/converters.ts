import type { MovieDetails, MovieSummary } from '@/features/movies/domain/types';

export function movieDetailsToSummary(movie: MovieDetails): MovieSummary {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.year,
    type: movie.type,
    posterUrl: movie.posterUrl,
  };
}
