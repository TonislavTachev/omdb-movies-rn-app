import {
  loadFavorites,
  saveFavorites,
} from '@/features/favorites/storage';
import {
  completeMovieSummary,
  movieSummaryWithoutPoster,
} from '@tests/fixtures/movies';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock(
  '@react-native-async-storage/async-storage',
  () => require('@tests/mocks/asyncStorage.mock'),
);

describe('favorites storage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('returns [] when storage is empty', async () => {
    await expect(loadFavorites()).resolves.toEqual([]);
  });

  it('loads valid MovieSummary values', async () => {
    await AsyncStorage.setItem(
      '@omdb-movies/favorites:v1',
      JSON.stringify([completeMovieSummary, movieSummaryWithoutPoster]),
    );

    await expect(loadFavorites()).resolves.toEqual([
      completeMovieSummary,
      movieSummaryWithoutPoster,
    ]);
  });

  it('filters malformed entries', async () => {
    await AsyncStorage.setItem(
      '@omdb-movies/favorites:v1',
      JSON.stringify([
        completeMovieSummary,
        { id: '', title: 'Broken', year: '2020', type: 'movie', posterUrl: null },
        { title: 'Missing id', year: '2020', type: 'movie' },
      ]),
    );

    await expect(loadFavorites()).resolves.toEqual([completeMovieSummary]);
  });

  it('deduplicates by movie ID', async () => {
    const duplicate = { ...completeMovieSummary, title: 'Duplicate title' };

    await AsyncStorage.setItem(
      '@omdb-movies/favorites:v1',
      JSON.stringify([completeMovieSummary, duplicate]),
    );

    await expect(loadFavorites()).resolves.toEqual([completeMovieSummary]);
  });

  it('handles malformed JSON without crashing', async () => {
    await AsyncStorage.setItem('@omdb-movies/favorites:v1', '{not-json');

    await expect(loadFavorites()).resolves.toEqual([]);
  });

  it('saves the expected serialized representation', async () => {
    const favorites = [completeMovieSummary, movieSummaryWithoutPoster];

    await saveFavorites(favorites);

    expect(await AsyncStorage.getItem('@omdb-movies/favorites:v1')).toBe(
      JSON.stringify(favorites),
    );
  });
});
