import { MovieCardSkeleton } from '@/features/movies/components/MovieCardSkeleton';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { StyleSheet, View } from 'react-native';

const SKELETON_COUNT = 4;

export function MovieCarouselSkeleton() {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={styles.container}
    >
      <View style={styles.titlePlaceholder} />
      <View style={styles.row}>
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <View key={index} style={index > 0 ? styles.cardSpacing : undefined}>
            <MovieCardSkeleton />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  titlePlaceholder: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.xs,
    height: 20,
    marginBottom: spacing.md,
    width: 180,
  },
  row: {
    flexDirection: 'row',
  },
  cardSpacing: {
    marginLeft: spacing.md,
  },
});
