import type { MovieSummary } from '@/features/movies/domain/types';

export interface FavoritesState {
  favorites: MovieSummary[];
  isHydrated: boolean;
  hydrationFailed: boolean;
  error: string | null;
}
