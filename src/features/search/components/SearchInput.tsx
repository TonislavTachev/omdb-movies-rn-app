import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

interface SearchInputProps {
  value: string;
  onChangeText: (value: string) => void;
  onClear: () => void;
  isLoading?: boolean;
}

export function SearchInput({
  value,
  onChangeText,
  onClear,
  isLoading = false,
}: SearchInputProps) {
  const showClearButton = value.length > 0;
  const showLoadingIndicator = isLoading && value.length > 0;

  return (
    <View style={styles.container}>
      <Ionicons
        accessibilityElementsHidden
        color={colors.textSecondary}
        name="search-outline"
        size={20}
        style={styles.searchIcon}
      />
      <TextInput
        accessibilityHint="Enter a movie title to search"
        accessibilityLabel="Search by movie title"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onChangeText}
        placeholder="Search by movie title"
        placeholderTextColor={colors.textSecondary}
        returnKeyType="search"
        style={styles.input}
        value={value}
      />
      {showLoadingIndicator ? (
        <ActivityIndicator
          accessibilityLabel="Searching movies"
          color={colors.accent}
          size="small"
          style={styles.trailingIcon}
        />
      ) : null}
      {showClearButton && !showLoadingIndicator ? (
        <Pressable
          accessibilityHint="Clears the search input"
          accessibilityLabel="Clear search"
          accessibilityRole="button"
          hitSlop={8}
          onPress={onClear}
          style={styles.trailingIcon}
        >
          <Ionicons color={colors.textSecondary} name="close-circle" size={20} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: spacing.lg,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  trailingIcon: {
    marginLeft: spacing.sm,
  },
});
