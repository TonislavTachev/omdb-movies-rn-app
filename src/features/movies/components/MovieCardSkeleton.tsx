import { MOVIE_CARD_WIDTH } from '@/features/movies/components/MovieCard';
import { MOVIE_POSTER_ASPECT_RATIO } from '@/features/movies/constants/movieLayout';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { StyleSheet, View } from 'react-native';

export function MovieCardSkeleton() {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={styles.card}
    >
      <View style={styles.poster} />
      <View style={styles.titleLine} />
      <View style={styles.metaLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: MOVIE_CARD_WIDTH,
  },
  poster: {
    aspectRatio: MOVIE_POSTER_ASPECT_RATIO,
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.sm,
    width: '100%',
  },
  titleLine: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.xs,
    height: 14,
    marginTop: spacing.sm,
    width: '90%',
  },
  metaLine: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.xs,
    height: 12,
    marginTop: spacing.sm,
    width: '60%',
  },
});
