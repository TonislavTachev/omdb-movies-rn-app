import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { StyleSheet, Text, View } from 'react-native';

interface MoviePeopleListProps {
  label: string;
  people: readonly string[];
}

export function MoviePeopleList({ label, people }: MoviePeopleListProps) {
  if (people.length === 0) {
    return null;
  }

  return (
    <View accessibilityRole="text" style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.people}>{people.join(', ')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  people: {
    color: colors.textPrimary,
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 24,
  },
});
