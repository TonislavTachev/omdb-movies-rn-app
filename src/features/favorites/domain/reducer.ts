import type { FavoritesState } from '@/features/favorites/types';
import type { MovieSummary } from '@/features/movies/domain/types';

export type FavoritesAction =
  | { type: 'HYDRATE_START' }
  | { type: 'HYDRATE_SUCCESS'; favorites: MovieSummary[] }
  | { type: 'HYDRATE_FAILURE'; error: string }
  | { type: 'SET_FAVORITES'; favorites: MovieSummary[] }
  | { type: 'PERSIST_ERROR'; error: string }
  | { type: 'CLEAR_ERROR' };

export const initialFavoritesState: FavoritesState = {
  favorites: [],
  isHydrated: false,
  hydrationFailed: false,
  error: null,
};

export function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction,
): FavoritesState {
  switch (action.type) {
    case 'HYDRATE_START':
      return {
        ...state,
        error: null,
      };
    case 'HYDRATE_SUCCESS':
      return {
        favorites: action.favorites,
        isHydrated: true,
        hydrationFailed: false,
        error: null,
      };
    case 'HYDRATE_FAILURE':
      return {
        ...state,
        isHydrated: true,
        hydrationFailed: true,
        error: action.error,
      };
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.favorites,
        error: null,
      };
    case 'PERSIST_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
