import { FeaturedMovie } from '@/features/movies/components/FeaturedMovie';
import { MovieCarousel } from '@/features/movies/components/MovieCarousel';
import { MovieCarouselSkeleton } from '@/features/movies/components/MovieCarouselSkeleton';
import type { MovieSummary } from '@/features/movies/domain/types';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { StyleSheet, Text, View } from 'react-native';

const HERO_HEIGHT = 400;
const SKELETON_SECTION_COUNT = 4;

interface HomeListCollection {
  id: string;
  title: string;
  movies: MovieSummary[];
}

interface HomeListHeaderProps {
  isInitialLoading: boolean;
  hasCompleteFailure: boolean;
  featuredMovie: MovieSummary | null;
  collections: HomeListCollection[];
  showExploreHeading: boolean;
  onMoviePress: (movie: MovieSummary) => void;
}

function HeroSkeleton() {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={styles.heroSkeleton}
    />
  );
}

export function HomeListHeader({
  isInitialLoading,
  hasCompleteFailure,
  featuredMovie,
  collections,
  showExploreHeading,
  onMoviePress,
}: HomeListHeaderProps) {
  const visibleCollections = collections.filter(
    (collection) => collection.movies.length > 0,
  );

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>OMDB MOVIES</Text>
        <Text style={styles.heading}>Find your next favorite</Text>
        <Text style={styles.subtitle}>
          Curated collections and hand-picked titles to explore tonight.
        </Text>
      </View>

      {isInitialLoading ? (
        <>
          <HeroSkeleton />
          {Array.from({ length: SKELETON_SECTION_COUNT }, (_, index) => (
            <MovieCarouselSkeleton key={`skeleton-${index}`} />
          ))}
        </>
      ) : null}

      {!isInitialLoading && !hasCompleteFailure ? (
        <>
          {featuredMovie ? (
            <FeaturedMovie movie={featuredMovie} onPress={onMoviePress} />
          ) : null}

          {visibleCollections.map((collection) => (
            <MovieCarousel
              key={collection.id}
              movies={collection.movies}
              onMoviePress={onMoviePress}
              title={collection.title}
            />
          ))}

          {showExploreHeading ? (
            <Text accessibilityRole="header" style={styles.exploreHeading}>
              Explore Movies
            </Text>
          ) : null}
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  heading: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
  },
  heroSkeleton: {
    backgroundColor: colors.surfaceElevated,
    height: HERO_HEIGHT,
    marginBottom: spacing.xl,
    width: '100%',
  },
  exploreHeading: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xl,
  },
});
