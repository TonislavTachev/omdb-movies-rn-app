import type { MainTabScreenProps } from "@/app/navigation/types";
import { MovieGridItem } from "@/features/movies/components/MovieGridItem";
import type { MovieSummary } from "@/features/movies/domain/types";
import { SearchEmptyState } from "@/features/search/components/SearchEmptyState";
import { SearchErrorState } from "@/features/search/components/SearchErrorState";
import { SearchFooter } from "@/features/search/components/SearchFooter";
import { SearchInitialState } from "@/features/search/components/SearchInitialState";
import { SearchInput } from "@/features/search/components/SearchInput";
import { SearchResultSkeleton } from "@/features/search/components/SearchResultSkeleton";
import { useSearchScreen } from "@/features/search/hooks/useSearchScreen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { useCallback, useMemo } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SearchScreenProps = MainTabScreenProps<"Search">;

export function SearchScreen({ navigation }: SearchScreenProps) {
  const {
    searchInput,
    setSearchInput,
    clearSearch,
    searchTerm,
    isSearchActive,
    showInputLoading,
    movies,
    isPending,
    isError,
    isNotFound,
    errorMessage,
    hasNextPage,
    isFetchingNextPage,
    hasPaginationError,
    retry,
    retryPagination,
    loadMore,
  } = useSearchScreen();

  const handleMoviePress = useCallback(
    (movie: MovieSummary) => {
      Keyboard.dismiss();
      navigation.navigate("MovieDetails", { imdbID: movie.id });
    },
    [navigation],
  );

  const renderItem: ListRenderItem<MovieSummary> = useCallback(
    ({ item }) => <MovieGridItem movie={item} onPress={handleMoviePress} />,
    [handleMoviePress],
  );

  const keyExtractor = useCallback((item: MovieSummary) => item.id, []);

  const listEmptyComponent = useMemo(() => {
    if (!isSearchActive) {
      return <SearchInitialState />;
    }

    if (isPending) {
      return <SearchResultSkeleton />;
    }

    if (isError) {
      if (isNotFound) {
        return <SearchEmptyState searchTerm={searchTerm} />;
      }

      return <SearchErrorState message={errorMessage} onRetry={retry} />;
    }

    if (movies.length === 0) {
      return <SearchEmptyState searchTerm={searchTerm} />;
    }

    return null;
  }, [
    errorMessage,
    isError,
    isNotFound,
    isPending,
    isSearchActive,
    movies.length,
    retry,
    searchTerm,
  ]);

  const listFooterComponent = useMemo(
    () => (
      <SearchFooter
        hasNextPage={hasNextPage}
        hasPaginationError={hasPaginationError}
        hasResults={movies.length > 0}
        isFetchingNextPage={isFetchingNextPage}
        onRetryPagination={retryPagination}
      />
    ),
    [
      hasNextPage,
      hasPaginationError,
      isFetchingNextPage,
      movies.length,
      retryPagination,
    ],
  );

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>DISCOVER</Text>
        <Text style={styles.heading}>Search movies</Text>
        <Text style={styles.subtitle}>
          Find films by title and browse paginated results.
        </Text>
        <SearchInput
          isLoading={showInputLoading}
          onChangeText={setSearchInput}
          onClear={clearSearch}
          value={searchInput}
        />
      </View>

      <FlatList
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        data={movies}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        keyExtractor={keyExtractor}
        ListEmptyComponent={listEmptyComponent}
        ListFooterComponent={listFooterComponent}
        numColumns={2}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
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
  header: {
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  heading: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  columnWrapper: {
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
});
