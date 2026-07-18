import {
  AppHeader,
  AppHeaderBackButton,
  AppHeaderButton,
} from '@/shared/components/AppHeader';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

describe('AppHeader', () => {
  it('renders title and left/right slots', async () => {
    await render(
      <AppHeader
        left={<AppHeaderBackButton onPress={jest.fn()} />}
        right={
          <AppHeaderButton
            accessibilityLabel="Share"
            onPress={jest.fn()}
          >
            <Text>Share</Text>
          </AppHeaderButton>
        }
        title="Inception"
      />,
    );

    expect(screen.getByText('Inception')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Go back' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Share' })).toBeTruthy();
  });

  it('invokes slot button presses', async () => {
    const onBack = jest.fn();
    const onAction = jest.fn();

    await render(
      <AppHeader
        left={<AppHeaderBackButton onPress={onBack} />}
        right={
          <AppHeaderButton accessibilityLabel="Action" onPress={onAction}>
            <Text>Action</Text>
          </AppHeaderButton>
        }
      />,
    );

    fireEvent.press(screen.getByRole('button', { name: 'Go back' }));
    fireEvent.press(screen.getByRole('button', { name: 'Action' }));

    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
