import { StateMessage } from '@/shared/components/StateMessage';
import { colors } from '@/shared/theme/colors';

export function SearchInitialState() {
  return (
    <StateMessage
      description="Enter a movie title to browse matching results from the OMDb catalogue."
      iconColor={colors.accent}
      iconName="film-outline"
      title="Search for movies"
    />
  );
}
