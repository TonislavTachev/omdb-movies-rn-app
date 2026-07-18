import { MoviePoster } from '@/features/movies/components/MoviePoster';
import { formatMovieType } from '@/features/movies/domain/formatters';
import type { MovieSummary } from '@/features/movies/domain/types';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const HERO_HEIGHT = 400;

interface FeaturedMovieProps {
  movie: MovieSummary;
  onPress: (movie: MovieSummary) => void;
}

export function FeaturedMovie({ movie, onPress }: FeaturedMovieProps) {
  return (
    <View style={styles.container}>
      <MoviePoster
        contentFit="cover"
        posterUrl={movie.posterUrl}
        style={styles.heroImage}
        title={movie.title}
      />
      <LinearGradient
        colors={['transparent', 'rgba(11, 11, 15, 0.85)', colors.background]}
        locations={[0.35, 0.75, 1]}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {movie.title}
        </Text>
        <Text style={styles.meta}>
          {movie.year} · {formatMovieType(movie.type)}
        </Text>
        <Pressable
          accessibilityHint="Opens movie details"
          accessibilityLabel={`View details for ${movie.title}`}
          accessibilityRole="button"
          onPress={() => {
            onPress(movie);
          }}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HERO_HEIGHT,
    marginBottom: spacing.xl,
    overflow: 'hidden',
    width: '100%',
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    aspectRatio: undefined,
    borderRadius: 0,
    height: HERO_HEIGHT,
    width: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    bottom: 0,
    left: 0,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    position: 'absolute',
    right: 0,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 38,
    marginBottom: spacing.sm,
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 16,
    marginBottom: spacing.lg,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent,
    borderRadius: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});
