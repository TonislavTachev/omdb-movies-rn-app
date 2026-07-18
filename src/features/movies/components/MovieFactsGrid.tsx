import type { MovieFact } from '@/features/movies/domain/selectors';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { StyleSheet, Text, View } from 'react-native';

interface MovieFactsGridProps {
  facts: readonly MovieFact[];
}

export function MovieFactsGrid({ facts }: MovieFactsGridProps) {
  if (facts.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {facts.map((fact) => (
        <View key={fact.label} style={styles.factItem}>
          <Text style={styles.label}>{fact.label}</Text>
          <Text style={styles.value}>{fact.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  factItem: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: '45%',
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  value: {
    color: colors.textPrimary,
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 24,
  },
});
