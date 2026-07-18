import type { RootStackParamList } from '@/app/navigation/types';
import { FavoriteIcon } from '@/features/favorites/components/FavoriteIcon';
import { useFavorites } from '@/features/favorites/context/FavoritesProvider';
import { getMovieErrorMessage } from '@/features/movies/api/errors';
import { MovieDetailsErrorState } from '@/features/movies/components/MovieDetailsErrorState';
import { MovieDetailsHero } from '@/features/movies/components/MovieDetailsHero';
import { MovieDetailsSection } from '@/features/movies/components/MovieDetailsSection';
import { MovieDetailsSkeleton } from '@/features/movies/components/MovieDetailsSkeleton';
import { MovieFactsGrid } from '@/features/movies/components/MovieFactsGrid';
import { MoviePeopleList } from '@/features/movies/components/MoviePeopleList';
import { MovieRatingSummary } from '@/features/movies/components/MovieRatingSummary';
import { movieDetailsToSummary } from '@/features/movies/domain/converters';
import {
  getMovieFacts,
  hasItems,
  hasText,
} from '@/features/movies/domain/selectors';
import { useMovieDetails } from '@/features/movies/hooks/useMovieDetails';
import { createMovieRatingCards } from '@/features/movies/presentation/movieRating';
import {
  APP_HEADER_BAR_HEIGHT,
  AppHeader,
  AppHeaderBackButton,
  AppHeaderButton,
} from '@/shared/components/AppHeader';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type MovieDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MovieDetails'
>;

export function MovieDetailsScreen({
  route,
  navigation,
}: MovieDetailsScreenProps) {
  const { imdbID } = route.params;
  const insets = useSafeAreaInsets();
  const { data, isPending, isError, error, refetch } = useMovieDetails(imdbID);
  const { isFavorite, toggleFavorite } = useFavorites();
  const headerOffset = insets.top + APP_HEADER_BAR_HEIGHT;

  const handleRetry = useCallback(() => {
    void refetch();
  }, [refetch]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleToggleFavorite = useCallback(() => {
    if (!data) {
      return;
    }

    toggleFavorite(movieDetailsToSummary(data));
  }, [data, toggleFavorite]);

  const isMovieFavorite = data ? isFavorite(data.id) : false;
  const favoriteLabel = isMovieFavorite
    ? 'Remove from Favorites'
    : 'Add to Favorites';

  const header = (
    <AppHeader
      left={<AppHeaderBackButton onPress={handleBack} />}
      right={
        data ? (
          <AppHeaderButton
            accessibilityLabel={favoriteLabel}
            onPress={handleToggleFavorite}
            selected={isMovieFavorite}
          >
            <FavoriteIcon isFavorite={isMovieFavorite} />
          </AppHeaderButton>
        ) : null
      }
      transparent
    />
  );

  if (isPending) {
    return (
      <View style={styles.container}>
        {header}
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: headerOffset },
          ]}
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <MovieDetailsSkeleton />
        </ScrollView>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.container}>
        {header}
        <View style={[styles.container, { paddingTop: headerOffset }]}>
          <MovieDetailsErrorState
            message={getMovieErrorMessage(error)}
            onRetry={handleRetry}
          />
        </View>
      </View>
    );
  }

  const movieFacts = getMovieFacts(data);
  const ratingCards = createMovieRatingCards(data);
  const hasCrewOrCast =
    hasText(data.director) || hasItems(data.writers) || hasItems(data.actors);

  return (
    <View style={styles.container}>
      {header}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MovieDetailsHero movie={data} />

        <MovieRatingSummary cards={ratingCards} />

        {hasText(data.plot) ? (
          <MovieDetailsSection title="Plot">
            <Text style={styles.plot}>{data.plot}</Text>
          </MovieDetailsSection>
        ) : null}

        {hasCrewOrCast ? (
          <MovieDetailsSection title="Cast & Crew">
            {hasText(data.director) ? (
              <MoviePeopleList label="Director" people={[data.director]} />
            ) : null}
            {hasItems(data.writers) ? (
              <MoviePeopleList label="Writers" people={data.writers} />
            ) : null}
            {hasItems(data.actors) ? (
              <MoviePeopleList label="Cast" people={data.actors} />
            ) : null}
          </MovieDetailsSection>
        ) : null}

        {movieFacts.length > 0 ? (
          <MovieDetailsSection title="Details">
            <MovieFactsGrid facts={movieFacts} />
          </MovieDetailsSection>
        ) : null}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xxl,
  },
  plot: {
    color: colors.textPrimary,
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 26,
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});
