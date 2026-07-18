import type { MovieDetails } from '@/features/movies/domain/types';

export function hasText(value: string | null | undefined): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function hasItems<T>(
  items: readonly T[] | null | undefined,
): items is readonly T[] {
  return Array.isArray(items) && items.length > 0;
}

export interface MovieFact {
  label: string;
  value: string;
}

interface MovieFactDefinition {
  label: string;
  resolve: (movie: MovieDetails) => string | null;
}

function joinList(items: readonly string[]): string {
  return items.filter((item) => item.trim().length > 0).join(', ');
}

function textFact(value: string | null | undefined): string | null {
  return hasText(value) ? value : null;
}

function listFact(items: readonly string[]): string | null {
  return hasItems(items) ? joinList(items) : null;
}

const MOVIE_FACT_DEFINITIONS: readonly MovieFactDefinition[] = [
  { label: 'Released', resolve: (movie) => textFact(movie.releasedAt) },
  { label: 'Runtime', resolve: (movie) => textFact(movie.runtime) },
  {
    label: 'Content rating',
    resolve: (movie) => textFact(movie.contentRating),
  },
  { label: 'Language', resolve: (movie) => listFact(movie.languages) },
  { label: 'Country', resolve: (movie) => listFact(movie.countries) },
  { label: 'Production', resolve: (movie) => textFact(movie.production) },
  { label: 'Box office', resolve: (movie) => textFact(movie.boxOffice) },
  { label: 'Awards', resolve: (movie) => textFact(movie.awards) },
];

export function getMovieFacts(movie: MovieDetails): MovieFact[] {
  return MOVIE_FACT_DEFINITIONS.flatMap(({ label, resolve }) => {
    const value = resolve(movie);
    return value === null ? [] : [{ label, value }];
  });
}
