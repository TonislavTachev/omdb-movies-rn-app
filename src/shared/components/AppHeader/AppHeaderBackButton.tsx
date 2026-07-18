import { AppHeaderButton } from '@/shared/components/AppHeader/AppHeaderButton';
import { colors } from '@/shared/theme/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

interface AppHeaderBackButtonProps {
  onPress: () => void;
  accessibilityLabel?: string;
}

export function AppHeaderBackButton({
  onPress,
  accessibilityLabel = 'Go back',
}: AppHeaderBackButtonProps) {
  return (
    <AppHeaderButton accessibilityLabel={accessibilityLabel} onPress={onPress}>
      <Ionicons color={colors.textPrimary} name="chevron-back" size={24} />
    </AppHeaderButton>
  );
}
