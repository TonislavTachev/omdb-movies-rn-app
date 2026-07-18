import type { MainTabScreenProps } from '@/app/navigation/types';
import { HomeEmptyState } from '@/features/movies/components/HomeEmptyState';
import { HomeErrorState } from '@/features/movies/components/HomeErrorState';
import { HomeListHeader } from '@/features/movies/components/HomeListHeader';
import { MovieGridItem } from '@/features/movies/components/MovieGridItem';
import { useHomeMovies } from '@/features/movies/hooks/useHomeMovies';
import type { MovieSummary } from '@/features/movies/domain/types';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { useCallback, useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  type ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenProps = MainTabScreenProps<'Home'>;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const {
    collections,
    featuredMovie,
    exploreMovies,
    isInitialLoading,
    hasAnyData,
    hasCompleteFailure,
    errorMessage,
    refetchAll,
  } = useHomeMovies();

  const handleMoviePress = useCallback(
    (movie: MovieSummary) => {
      navigation.navigate('MovieDetails', { imdbID: movie.id });
    },
    [navigation],
  );

  const handleRetry = useCallback(() => {
    void refetchAll();
  }, [refetchAll]);

  const renderGridItem: ListRenderItem<MovieSummary> = useCallback(
    ({ item }) => <MovieGridItem movie={item} onPress={handleMoviePress} />,
    [handleMoviePress],
  );

  const keyExtractor = useCallback((item: MovieSummary) => item.id, []);

  const listHeaderComponent = useMemo(
    () => (
      <HomeListHeader
        collections={collections}
        featuredMovie={featuredMovie}
        hasCompleteFailure={hasCompleteFailure}
        isInitialLoading={isInitialLoading}
        onMoviePress={handleMoviePress}
        showExploreHeading={exploreMovies.length > 0}
      />
    ),
    [
      collections,
      exploreMovies.length,
      featuredMovie,
      handleMoviePress,
      hasCompleteFailure,
      isInitialLoading,
    ],
  );

  const listEmptyComponent = useMemo(() => {
    if (isInitialLoading) {
      return null;
    }

    if (hasCompleteFailure) {
      return (
        <HomeErrorState
          message={errorMessage ?? 'Something went wrong while loading movies.'}
          onRetry={handleRetry}
        />
      );
    }

    if (!hasAnyData) {
      return <HomeEmptyState onRetry={handleRetry} />;
    }

    return null;
  }, [
    errorMessage,
    handleRetry,
    hasAnyData,
    hasCompleteFailure,
    isInitialLoading,
  ]);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <FlatList
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        data={exploreMovies}
        keyExtractor={keyExtractor}
        ListEmptyComponent={listEmptyComponent}
        ListFooterComponent={<View style={styles.footerSpacer} />}
        ListHeaderComponent={listHeaderComponent}
        numColumns={2}
        renderItem={renderGridItem}
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
