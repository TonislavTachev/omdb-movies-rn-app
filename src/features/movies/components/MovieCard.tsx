import { MoviePoster } from '@/features/movies/components/MoviePoster';
import { formatMovieType } from '@/features/movies/domain/formatters';
import type { MovieSummary } from '@/features/movies/domain/types';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export const MOVIE_CARD_WIDTH = 145;

interface MovieCardProps {
  movie: MovieSummary;
  onPress: (movie: MovieSummary) => void;
}

function MovieCardComponent({ movie, onPress }: MovieCardProps) {
  return (
    <Pressable
      accessibilityHint="Opens movie details"
      accessibilityLabel={`${movie.title}, ${movie.year}`}
      accessibilityRole="button"
      onPress={() => {
        onPress(movie);
      }}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <MoviePoster posterUrl={movie.posterUrl} title={movie.title} />
      <Text numberOfLines={2} style={styles.title}>
        {movie.title}
      </Text>
      <Text numberOfLines={1} style={styles.meta}>
        {movie.year} · {formatMovieType(movie.type)}
      </Text>
    </Pressable>
  );
}

export const MovieCard = memo(MovieCardComponent);

const styles = StyleSheet.create({
  card: {
    width: MOVIE_CARD_WIDTH,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  title: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    marginTop: spacing.sm,
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});
