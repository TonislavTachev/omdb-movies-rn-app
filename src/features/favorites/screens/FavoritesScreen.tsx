import type { MainTabScreenProps } from '@/app/navigation/types';
import { FavoritesEmptyState } from '@/features/favorites/components/FavoritesEmptyState';
import { FavoritesErrorState } from '@/features/favorites/components/FavoritesErrorState';
import { FavoritesHydratingState } from '@/features/favorites/components/FavoritesHydratingState';
import { FavoritesListHeader } from '@/features/favorites/components/FavoritesListHeader';
import { useFavorites } from '@/features/favorites/context/FavoritesProvider';
import { MovieGridItem } from '@/features/movies/components/MovieGridItem';
import type { MovieSummary } from '@/features/movies/domain/types';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { useCallback, useMemo } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  View,
  type ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FavoritesScreenProps = MainTabScreenProps<'Favorites'>;

export function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  const {
    favorites,
    favoriteCount,
    isHydrated,
    hydrationFailed,
    error,
    retryHydration,
  } = useFavorites();

  const handleMoviePress = useCallback(
    (movie: MovieSummary) => {
      Keyboard.dismiss();
      navigation.navigate('MovieDetails', { imdbID: movie.id });
    },
    [navigation],
  );

  const handleRetryHydration = useCallback(() => {
    void retryHydration();
  }, [retryHydration]);

  const renderItem: ListRenderItem<MovieSummary> = useCallback(
    ({ item }) => <MovieGridItem movie={item} onPress={handleMoviePress} />,
    [handleMoviePress],
  );

  const keyExtractor = useCallback((item: MovieSummary) => item.id, []);

  const listHeaderComponent = useMemo(
    () => (
      <FavoritesListHeader
        favoriteCount={favoriteCount}
        warningMessage={
          error && favorites.length > 0 ? error : null
        }
      />
    ),
    [error, favoriteCount, favorites.length],
  );

  const listEmptyComponent = useMemo(() => {
    if (!isHydrated) {
      return <FavoritesHydratingState />;
    }

    if (favorites.length === 0 && hydrationFailed && error) {
      return (
        <FavoritesErrorState
          message={error}
          onRetry={handleRetryHydration}
        />
      );
    }

    if (favorites.length === 0) {
      return <FavoritesEmptyState />;
    }

    return null;
  }, [
    error,
    favorites.length,
    handleRetryHydration,
    hydrationFailed,
    isHydrated,
  ]);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <FlatList
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        data={isHydrated ? favorites : []}
        keyExtractor={keyExtractor}
        ListEmptyComponent={listEmptyComponent}
        ListFooterComponent={<View style={styles.footerSpacer} />}
        ListHeaderComponent={listHeaderComponent}
        numColumns={2}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  columnWrapper: {
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  footerSpacer: {
    height: spacing.xxl,
  },
});
