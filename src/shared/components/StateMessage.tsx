import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

type StateMessageBaseProps = {
  title: string;
  description?: string;
  iconName?: IoniconName;
  iconColor?: string;
  centered?: boolean;
};

type StateMessageWithoutAction = {
  actionLabel?: never;
  onAction?: never;
  actionAccessibilityLabel?: never;
  actionAccessibilityHint?: never;
};

type StateMessageWithAction = {
  actionLabel: string;
  onAction: () => void;
  actionAccessibilityLabel?: string;
  actionAccessibilityHint?: string;
};

export type StateMessageProps = StateMessageBaseProps &
  (StateMessageWithoutAction | StateMessageWithAction);

const ICON_SIZE = 48;

export function StateMessage({
  title,
  description,
  iconName,
  iconColor = colors.textSecondary,
  actionLabel,
  onAction,
  actionAccessibilityLabel,
  actionAccessibilityHint,
  centered = false,
}: StateMessageProps) {
  const showAction = onAction !== undefined;

  return (
    <View style={[styles.container, centered && styles.containerCentered]}>
      {iconName ? (
        <Ionicons
          accessibilityElementsHidden
          color={iconColor}
          name={iconName}
          size={ICON_SIZE}
          style={styles.icon}
        />
      ) : null}
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {showAction ? (
        <Pressable
          accessibilityHint={actionAccessibilityHint}
          accessibilityLabel={actionAccessibilityLabel ?? actionLabel}
          accessibilityRole="button"
          onPress={onAction}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  containerCentered: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: spacing.md,
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});
