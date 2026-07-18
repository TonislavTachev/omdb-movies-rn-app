import {
  addFavorite as addFavoriteMutation,
  removeFavorite as removeFavoriteMutation,
  toggleFavorite as toggleFavoriteMutation,
} from '@/features/favorites/domain/mutations';
import {
  favoritesReducer,
  initialFavoritesState,
} from '@/features/favorites/domain/reducer';
import {
  loadFavorites,
  saveFavorites,
} from '@/features/favorites/storage';
import type { MovieSummary } from '@/features/movies/domain/types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type PropsWithChildren,
} from 'react';
import { AppState, type AppStateStatus } from 'react-native';

interface FavoritesContextValue {
  favorites: MovieSummary[];
  favoriteCount: number;
  isHydrated: boolean;
  hydrationFailed: boolean;
  error: string | null;
  isFavorite: (movieId: string) => boolean;
  addFavorite: (movie: MovieSummary) => void;
  removeFavorite: (movieId: string) => void;
  toggleFavorite: (movie: MovieSummary) => void;
  retryHydration: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const PERSISTENCE_ERROR_MESSAGE =
  'Unable to save favorites right now. Your changes are kept for this session.';

const HYDRATION_ERROR_MESSAGE =
  'Unable to load your saved favorites right now.';

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(
    favoritesReducer,
    initialFavoritesState,
  );
  const isHydratingRef = useRef(false);
  const favoritesRef = useRef<MovieSummary[]>(state.favorites);
  const isHydratedRef = useRef(state.isHydrated);

  useEffect(() => {
    favoritesRef.current = state.favorites;
    isHydratedRef.current = state.isHydrated;
  }, [state.favorites, state.isHydrated]);

  const persistFavorites = useCallback(async (favorites: MovieSummary[]) => {
    await saveFavorites(favorites);
  }, []);

  const schedulePersist = useCallback(
    (favorites: MovieSummary[]) => {
      void persistFavorites(favorites).catch(() => {
        dispatch({
          type: 'PERSIST_ERROR',
          error: PERSISTENCE_ERROR_MESSAGE,
        });
      });
    },
    [persistFavorites],
  );

  const commitFavorites = useCallback(
    (nextFavorites: MovieSummary[]) => {
      // Always update UI/memory immediately. Never drop a tap because storage
      // hasn't finished loading yet.
      favoritesRef.current = nextFavorites;
      dispatch({ type: 'SET_FAVORITES', favorites: nextFavorites });

      if (!isHydratedRef.current) {
        return;
      }

      schedulePersist(nextFavorites);
    },
    [schedulePersist],
  );

  const hydrateFavorites = useCallback(async () => {
    if (isHydratingRef.current) {
      return;
    }

    isHydratingRef.current = true;
    dispatch({ type: 'HYDRATE_START' });

    try {
      const storedFavorites = await loadFavorites();
      const mergeWithSession = (sessionFavorites: readonly MovieSummary[]) => {
        const storedIds = new Set(
          storedFavorites.map((favorite) => favorite.id),
        );
        const pendingAdds = sessionFavorites.filter(
          (favorite) => !storedIds.has(favorite.id),
        );
        return {
          favorites: [...storedFavorites, ...pendingAdds],
          pendingAdds,
        };
      };

      // Mark hydrated before applying state so any tap during this window
      // persists instead of being deferred and then wiped.
      isHydratedRef.current = true;

      const { favorites: nextFavorites, pendingAdds } = mergeWithSession(
        favoritesRef.current,
      );
      favoritesRef.current = nextFavorites;
      dispatch({ type: 'HYDRATE_SUCCESS', favorites: nextFavorites });

      // Reconcile a tap that landed between merge and dispatch.
      const reconciled = mergeWithSession(favoritesRef.current);
      if (reconciled.favorites.length !== nextFavorites.length) {
        favoritesRef.current = reconciled.favorites;
        dispatch({
          type: 'SET_FAVORITES',
          favorites: reconciled.favorites,
        });
        await persistFavorites(reconciled.favorites);
      } else if (pendingAdds.length > 0) {
        await persistFavorites(nextFavorites);
      }
    } catch {
      isHydratedRef.current = true;
      dispatch({
        type: 'HYDRATE_FAILURE',
        error: HYDRATION_ERROR_MESSAGE,
      });
      // Keep in-session favorites and persist them if we have any.
      if (favoritesRef.current.length > 0) {
        schedulePersist(favoritesRef.current);
      }
    } finally {
      isHydratingRef.current = false;
    }
  }, [persistFavorites, schedulePersist]);

  useEffect(() => {
    void hydrateFavorites();
  }, [hydrateFavorites]);

  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState !== 'background' && nextState !== 'inactive') {
        return;
      }

      if (!isHydratedRef.current) {
        return;
      }

      schedulePersist(favoritesRef.current);
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [schedulePersist]);

  const isFavorite = useCallback(
    (movieId: string) =>
      state.favorites.some((favorite) => favorite.id === movieId),
    [state.favorites],
  );

  const addFavorite = useCallback(
    (movie: MovieSummary) => {
      commitFavorites(addFavoriteMutation(favoritesRef.current, movie));
    },
    [commitFavorites],
  );

  const removeFavorite = useCallback(
    (movieId: string) => {
      commitFavorites(removeFavoriteMutation(favoritesRef.current, movieId));
    },
    [commitFavorites],
  );

  const toggleFavorite = useCallback(
    (movie: MovieSummary) => {
      commitFavorites(toggleFavoriteMutation(favoritesRef.current, movie));
    },
    [commitFavorites],
  );

  const contextValue = useMemo<FavoritesContextValue>(
    () => ({
      favorites: state.favorites,
      favoriteCount: state.favorites.length,
      isHydrated: state.isHydrated,
      hydrationFailed: state.hydrationFailed,
      error: state.error,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      retryHydration: hydrateFavorites,
    }),
    [
      addFavorite,
      hydrateFavorites,
      isFavorite,
      removeFavorite,
      state.error,
      state.favorites,
      state.hydrationFailed,
      state.isHydrated,
      toggleFavorite,
    ],
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider.');
  }

  return context;
}
