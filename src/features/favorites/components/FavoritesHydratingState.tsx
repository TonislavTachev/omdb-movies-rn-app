import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export function FavoritesHydratingState() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.accent} size="large" />
      <Text style={styles.text}>Loading your favorites…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: spacing.lg,
  },
});
