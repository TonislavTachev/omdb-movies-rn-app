import { MOVIE_POSTER_ASPECT_RATIO } from '@/features/movies/constants/movieLayout';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { StyleSheet, View } from 'react-native';

const SKELETON_ITEM_COUNT = 6;

function SearchResultSkeletonItem() {
  return (
    <View style={styles.item}>
      <View style={styles.poster} />
      <View style={styles.titleLine} />
      <View style={styles.metaLine} />
    </View>
  );
}

export function SearchResultSkeleton() {
  const rows = Array.from({ length: SKELETON_ITEM_COUNT / 2 }, (_, rowIndex) => (
    <View key={`skeleton-row-${rowIndex}`} style={styles.row}>
      <SearchResultSkeletonItem />
      <SearchResultSkeletonItem />
    </View>
  ));

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={styles.container}
    >
      {rows}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  item: {
    flex: 1,
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
