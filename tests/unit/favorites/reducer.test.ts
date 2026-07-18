import {
  favoritesReducer,
  initialFavoritesState,
} from '@/features/favorites/domain/reducer';
import { completeMovieSummary } from '@tests/fixtures/movies';

describe('favoritesReducer', () => {
  it('clears error on hydrate start', () => {
    const state = favoritesReducer(
      { ...initialFavoritesState, error: 'boom' },
      { type: 'HYDRATE_START' },
    );

    expect(state.error).toBeNull();
    expect(state.isHydrated).toBe(false);
  });

  it('applies stored favorites on hydrate success', () => {
    const state = favoritesReducer(initialFavoritesState, {
      type: 'HYDRATE_SUCCESS',
      favorites: [completeMovieSummary],
    });

    expect(state).toEqual({
      favorites: [completeMovieSummary],
      isHydrated: true,
      hydrationFailed: false,
      error: null,
    });
  });

  it('marks hydration failed without wiping session favorites', () => {
    const state = favoritesReducer(
      {
        ...initialFavoritesState,
        favorites: [completeMovieSummary],
      },
      {
        type: 'HYDRATE_FAILURE',
        error: 'Unable to load',
      },
    );

    expect(state.favorites).toEqual([completeMovieSummary]);
    expect(state.isHydrated).toBe(true);
    expect(state.hydrationFailed).toBe(true);
    expect(state.error).toBe('Unable to load');
  });

  it('updates favorites and clears error', () => {
    const state = favoritesReducer(
      {
        ...initialFavoritesState,
        isHydrated: true,
        error: 'stale',
      },
      {
        type: 'SET_FAVORITES',
        favorites: [completeMovieSummary],
      },
    );

    expect(state.favorites).toEqual([completeMovieSummary]);
    expect(state.error).toBeNull();
    expect(state.isHydrated).toBe(true);
  });
});
