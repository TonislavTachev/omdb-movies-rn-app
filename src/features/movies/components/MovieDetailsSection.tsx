import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MovieDetailsSectionProps {
  title: string;
  children: ReactNode;
}

export function MovieDetailsSection({
  title,
  children,
}: MovieDetailsSectionProps) {
  if (children == null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
});
