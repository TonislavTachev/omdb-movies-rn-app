import type { MovieSummary, MovieType } from '@/features/movies/domain/types';
import { removeDuplicatesById } from '@/shared/utils/removeDuplicatesById';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_STORAGE_KEY = '@omdb-movies/favorites:v1';

const VALID_MOVIE_TYPES: readonly MovieType[] = [
  'movie',
  'series',
  'episode',
  'game',
  'unknown',
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isMovieType(value: unknown): value is MovieType {
  return (
    typeof value === 'string' &&
    VALID_MOVIE_TYPES.includes(value as MovieType)
  );
}

function normalizeMovieSummary(value: unknown): MovieSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = typeof value.id === 'string' ? value.id.trim() : '';
  const title = typeof value.title === 'string' ? value.title.trim() : '';
  const yearValue = value.year;
  const year =
    typeof yearValue === 'string'
      ? yearValue
      : typeof yearValue === 'number'
        ? String(yearValue)
        : '';

  if (!id || !title || !year || !isMovieType(value.type)) {
    return null;
  }

  const posterUrl =
    typeof value.posterUrl === 'string' || value.posterUrl === null
      ? value.posterUrl
      : null;

  return {
    id,
    title,
    year,
    type: value.type,
    posterUrl,
  };
}

function parseFavoritesJson(rawValue: string): MovieSummary[] {
  let parsed: unknown;

  try {
    parsed = JSON.parse(rawValue);
  } catch {
    return [];
  }

  if (!Array.isArray(parsed)) {
    return [];
  }

  const validFavorites = parsed
    .map(normalizeMovieSummary)
    .filter((favorite): favorite is MovieSummary => favorite !== null);

  return removeDuplicatesById(validFavorites);
}

export async function loadFavorites(): Promise<MovieSummary[]> {
  const rawValue = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  return parseFavoritesJson(rawValue);
}

export async function saveFavorites(
  favorites: readonly MovieSummary[],
): Promise<void> {
  const serializedFavorites = JSON.stringify(removeDuplicatesById(favorites));

  await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, serializedFavorites);
}
