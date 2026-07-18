import { MoviePoster } from '@/features/movies/components/MoviePoster';
import { MOVIE_POSTER_ASPECT_RATIO } from '@/features/movies/constants/movieLayout';
import { formatMovieType } from '@/features/movies/domain/formatters';
import { hasItems, hasText } from '@/features/movies/domain/selectors';
import type { MovieDetails } from '@/features/movies/domain/types';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

const HERO_HEIGHT = 360;
const FOREGROUND_POSTER_WIDTH = 112;

interface MovieDetailsHeroProps {
  movie: MovieDetails;
}

export function MovieDetailsHero({ movie }: MovieDetailsHeroProps) {
  const metadataParts = [
    movie.year,
    hasText(movie.runtime) ? movie.runtime : null,
    hasText(movie.contentRating) ? movie.contentRating : null,
    formatMovieType(movie.type),
  ].filter(Boolean);

  return (
    <View style={styles.container}>
      {movie.posterUrl ? (
        <Image
          accessibilityElementsHidden
          contentFit="cover"
          source={{ uri: movie.posterUrl }}
          style={styles.backgroundImage}
        />
      ) : (
        <View style={styles.backgroundFallback} />
      )}

      <LinearGradient
        colors={['rgba(11, 11, 15, 0.35)', 'rgba(11, 11, 15, 0.92)', colors.background]}
        locations={[0, 0.55, 1]}
        style={styles.gradient}
      />

      <View style={styles.content}>
        <MoviePoster
          posterUrl={movie.posterUrl}
          style={styles.foregroundPoster}
          title={movie.title}
        />

        <View style={styles.textContent}>
          <Text accessibilityRole="header" numberOfLines={3} style={styles.title}>
            {movie.title}
          </Text>
          <Text style={styles.metadata}>{metadataParts.join(' · ')}</Text>

          {hasItems(movie.genres) ? (
            <View style={styles.genreRow}>
              {movie.genres.map((genre) => (
                <View key={genre} style={styles.genreChip}>
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HERO_HEIGHT,
    overflow: 'hidden',
    width: '100%',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
  },
  backgroundFallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.surfaceElevated,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    alignItems: 'flex-end',
    bottom: 0,
    flexDirection: 'row',
    left: 0,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
    position: 'absolute',
    right: 0,
  },
  foregroundPoster: {
    aspectRatio: MOVIE_POSTER_ASPECT_RATIO,
    borderRadius: spacing.sm,
    marginRight: spacing.lg,
    width: FOREGROUND_POSTER_WIDTH,
  },
  textContent: {
    flex: 1,
    justifyContent: 'flex-end',
    minWidth: 0,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: spacing.sm,
  },
  metadata: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  genreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  genreChip: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderRadius: spacing.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  genreText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
});
