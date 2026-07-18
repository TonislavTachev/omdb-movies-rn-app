import type { MovieRatingCard } from '@/features/movies/presentation/movieRating';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MovieRatingSummaryProps {
  cards: readonly MovieRatingCard[];
}

function chunkItems<T>(items: readonly T[], size: number): T[][] {
  const rows: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }

  return rows;
}

export function MovieRatingSummary({ cards }: MovieRatingSummaryProps) {
  const rows = useMemo(() => chunkItems(cards, 2), [cards]);

  if (cards.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={`rating-row-${rowIndex}`} style={styles.row}>
          {row.map((item) => (
            <View
              key={item.key}
              style={[
                styles.cardWrapper,
                row.length === 1 && styles.cardWrapperFull,
              ]}
            >
              <View
                accessibilityLabel={item.accessibilityLabel}
                accessibilityRole="text"
                style={styles.card}
              >
                {item.showStar ? (
                  <Ionicons
                    accessibilityElementsHidden
                    color={colors.accent}
                    name="star"
                    size={18}
                  />
                ) : null}
                <View style={styles.cardText}>
                  <Text style={styles.value}>
                    {item.value}
                    {item.suffix ? (
                      <Text style={styles.suffix}>{item.suffix}</Text>
                    ) : null}
                  </Text>
                  <Text numberOfLines={2} style={styles.label}>
                    {item.label}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  cardWrapper: {
    flex: 1,
    minWidth: 0,
  },
  cardWrapperFull: {
    flexGrow: 1,
    width: '100%',
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: spacing.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    minHeight: 72,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  cardText: {
    flex: 1,
    minWidth: 0,
  },
  value: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  suffix: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
});
