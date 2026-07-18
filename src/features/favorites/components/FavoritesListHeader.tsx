import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { StyleSheet, Text, View } from 'react-native';

interface FavoritesListHeaderProps {
  favoriteCount: number;
  warningMessage?: string | null;
}

function formatSavedMoviesSubtitle(count: number): string {
  if (count === 1) {
    return '1 saved movie';
  }

  return `${count} saved movies`;
}

export function FavoritesListHeader({
  favoriteCount,
  warningMessage,
}: FavoritesListHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.eyebrow}>YOUR COLLECTION</Text>
      <Text style={styles.heading}>Favorites</Text>
      <Text style={styles.subtitle}>
        {favoriteCount > 0
          ? formatSavedMoviesSubtitle(favoriteCount)
          : 'Save movies to build your personal watchlist.'}
      </Text>
      {warningMessage ? (
        <Text style={styles.warningText}>{warningMessage}</Text>
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
  warningText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.md,
  },
});
