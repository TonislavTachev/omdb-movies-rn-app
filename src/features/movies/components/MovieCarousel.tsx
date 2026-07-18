import {
  MOVIE_CARD_WIDTH,
  MovieCard,
} from '@/features/movies/components/MovieCard';
import type { MovieSummary } from '@/features/movies/domain/types';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View, type ListRenderItem } from 'react-native';

const CARD_SEPARATOR_WIDTH = spacing.md;
const ITEM_LENGTH = MOVIE_CARD_WIDTH + CARD_SEPARATOR_WIDTH;

interface MovieCarouselProps {
  title: string;
  movies: MovieSummary[];
  onMoviePress: (movie: MovieSummary) => void;
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

export function MovieCarousel({
  title,
  movies,
  onMoviePress,
}: MovieCarouselProps) {
  const renderItem: ListRenderItem<MovieSummary> = useCallback(
    ({ item }) => <MovieCard movie={item} onPress={onMoviePress} />,
    [onMoviePress],
  );

  const keyExtractor = useCallback((item: MovieSummary) => item.id, []);

  const getItemLayout = useCallback(
    (_data: ArrayLike<MovieSummary> | null | undefined, index: number) => ({
      length: ITEM_LENGTH,
      offset: ITEM_LENGTH * index,
      index,
    }),
    [],
  );

  if (movies.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <FlatList
        accessibilityLabel={`${title} movie collection`}
        contentContainerStyle={styles.listContent}
        data={movies}
        getItemLayout={getItemLayout}
        horizontal
        nestedScrollEnabled
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
  },
  separator: {
    width: CARD_SEPARATOR_WIDTH,
  },
});
