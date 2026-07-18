import { hasText } from '@/features/movies/domain/selectors';
import type { MovieDetails } from '@/features/movies/domain/types';

export interface MovieRatingCard {
  readonly key: string;
  readonly value: string;
  readonly suffix?: string;
  readonly label: string;
  readonly accessibilityLabel: string;
  readonly showStar?: boolean;
}

function isImdbSource(source: string): boolean {
  const normalized = source.toLowerCase();

  return (
    normalized.includes('imdb') ||
    normalized.includes('internet movie database')
  );
}

export function createMovieRatingCards(
  movie: MovieDetails,
): readonly MovieRatingCard[] {
  const cards: MovieRatingCard[] = [];

  if (hasText(movie.imdbRating)) {
    const votesSuffix = hasText(movie.imdbVotes)
      ? `, ${movie.imdbVotes} votes`
      : '';

    cards.push({
      key: 'imdb',
      value: movie.imdbRating,
      suffix: '/10',
      label: 'IMDb',
      accessibilityLabel: `IMDb rating ${movie.imdbRating} out of 10${votesSuffix}`,
      showStar: true,
    });
  }

  if (hasText(movie.metascore)) {
    cards.push({
      key: 'metascore',
      value: movie.metascore,
      label: 'Metascore',
      accessibilityLabel: `Metascore ${movie.metascore}`,
    });
  }

  for (const rating of movie.ratings) {
    if (isImdbSource(rating.source)) {
      continue;
    }

    cards.push({
      key: rating.source,
      value: rating.value,
      label: rating.source,
      accessibilityLabel: `${rating.source} rating ${rating.value}`,
    });
  }

  return cards;
}
