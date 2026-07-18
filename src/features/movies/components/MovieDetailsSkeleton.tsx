import { MOVIE_POSTER_ASPECT_RATIO } from '@/features/movies/constants/movieLayout';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { StyleSheet, View } from 'react-native';

export function MovieDetailsSkeleton() {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={styles.container}
    >
      <View style={styles.hero} />
      <View style={styles.heroContent}>
        <View style={styles.poster} />
        <View style={styles.heroText}>
          <View style={styles.titleLine} />
          <View style={styles.metaLine} />
          <View style={styles.genreRow}>
            <View style={styles.genreChip} />
            <View style={styles.genreChip} />
          </View>
        </View>
      </View>

      <View style={styles.ratingsRow}>
        <View style={styles.ratingCard} />
        <View style={styles.ratingCard} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitle} />
        <View style={styles.plotLine} />
        <View style={styles.plotLine} />
        <View style={styles.plotLineShort} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitle} />
        <View style={styles.peopleLine} />
        <View style={styles.peopleLine} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitle} />
        <View style={styles.factsRow}>
          <View style={styles.factBlock} />
          <View style={styles.factBlock} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.xxl,
  },
  hero: {
    backgroundColor: colors.surfaceElevated,
    height: 360,
    width: '100%',
  },
  heroContent: {
    flexDirection: 'row',
    marginTop: -72,
    paddingHorizontal: spacing.xl,
  },
  poster: {
    aspectRatio: MOVIE_POSTER_ASPECT_RATIO,
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.sm,
    marginRight: spacing.lg,
    width: 112,
  },
  heroText: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: spacing.lg,
  },
  titleLine: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.xs,
    height: 24,
    marginBottom: spacing.sm,
    width: '90%',
  },
  metaLine: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.xs,
    height: 14,
    marginBottom: spacing.sm,
    width: '70%',
  },
  genreRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  genreChip: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.lg,
    height: 24,
    width: 64,
  },
  ratingsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  ratingCard: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.md,
    height: 72,
    width: 96,
  },
  section: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  sectionTitle: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.xs,
    height: 20,
    marginBottom: spacing.md,
    width: 120,
  },
  plotLine: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.xs,
    height: 14,
    marginBottom: spacing.sm,
    width: '100%',
  },
  plotLineShort: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.xs,
    height: 14,
    width: '75%',
  },
  peopleLine: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.xs,
    height: 14,
    marginBottom: spacing.sm,
    width: '85%',
  },
  factsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  factBlock: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.xs,
    flex: 1,
    height: 56,
  },
});
