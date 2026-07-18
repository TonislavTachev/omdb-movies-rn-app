import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

interface SearchFooterProps {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  hasResults: boolean;
  hasPaginationError?: boolean;
  onRetryPagination?: () => void;
}

export function SearchFooter({
  isFetchingNextPage,
  hasNextPage,
  hasResults,
  hasPaginationError = false,
  onRetryPagination,
}: SearchFooterProps) {
  if (!hasResults) {
    return <View style={styles.spacer} />;
  }
  if (isFetchingNextPage) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colors.accent} size="small" />
        <Text style={styles.loadingText}>Loading more movies</Text>
      </View>
    );
  }

  if (hasPaginationError && onRetryPagination) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Unable to load more results right now.
        </Text>
        <Pressable
          accessibilityHint="Retries loading more search results"
          accessibilityLabel="Retry loading more results"
          accessibilityRole="button"
          onPress={onRetryPagination}
          style={({ pressed }) => [styles.retryButton, pressed && styles.retryButtonPressed]}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  if (!hasNextPage) {
    return (
      <View style={styles.container}>
        <Text style={styles.endText}>You&apos;ve reached the end</Text>
      </View>
    );
  }

  return <View style={styles.spacer} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: spacing.sm,
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderRadius: spacing.md,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  retryButtonPressed: {
    opacity: 0.85,
  },
  retryButtonText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  endText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
  spacer: {
    height: spacing.xxl,
  },
});
