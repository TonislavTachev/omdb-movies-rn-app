import { APP_HEADER_BAR_HEIGHT } from "@/shared/components/AppHeader/constants";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AppHeaderProps {
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
  transparent?: boolean;
  backgroundColor?: string;
}

export function AppHeader({
  title,
  left,
  right,
  transparent = false,
  backgroundColor = colors.background,
}: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.container,
        transparent ? styles.transparent : { backgroundColor },
        { paddingTop: insets.top },
      ]}
    >
      <View style={styles.bar}>
        <View style={[styles.side, styles.sideLeft]}>{left}</View>

        {title ? (
          <View pointerEvents="none" style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
          </View>
        ) : null}

        <View style={[styles.side, styles.sideRight]}>{right}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    top: 0,
    zIndex: 20,
  },
  transparent: {
    backgroundColor: "transparent",
    position: "absolute",
  },
  bar: {
    alignItems: "center",
    flexDirection: "row",
    height: APP_HEADER_BAR_HEIGHT,
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
  },
  side: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    minWidth: APP_HEADER_BAR_HEIGHT,
  },
  sideLeft: {
    justifyContent: "flex-start",
  },
  sideRight: {
    justifyContent: "flex-end",
  },
  titleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: APP_HEADER_BAR_HEIGHT + spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
  },
});
