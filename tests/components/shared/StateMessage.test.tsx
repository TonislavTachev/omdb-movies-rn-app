import { StateMessage } from '@/shared/components/StateMessage';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('StateMessage', () => {
  it('renders title and description', async () => {
    await render(
      <StateMessage
        description="Try again in a moment."
        title="Something went wrong"
      />,
    );

    expect(screen.getByText('Something went wrong')).toBeTruthy();
    expect(screen.getByText('Try again in a moment.')).toBeTruthy();
  });

  it('renders no action when action props are absent', async () => {
    await render(<StateMessage title="No results" />);

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('renders the complete accessible action', async () => {
    await render(
      <StateMessage
        actionAccessibilityHint="Reloads the movie list"
        actionAccessibilityLabel="Retry loading movies"
        actionLabel="Retry"
        onAction={jest.fn()}
        title="Unable to load"
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Retry loading movies' }),
    ).toBeTruthy();
    expect(
      screen.getByRole('button', { name: 'Retry loading movies' }).props
        .accessibilityHint,
    ).toBe('Reloads the movie list');
  });

  it('pressing the action calls onAction', async () => {
    const onAction = jest.fn();

    await render(
      <StateMessage actionLabel="Retry" onAction={onAction} title="Unable to load" />,
    );

    fireEvent.press(screen.getByRole('button', { name: 'Retry' }));

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('verifies the title header role', async () => {
    await render(<StateMessage title="Empty list" />);

    expect(screen.getByRole('header', { name: 'Empty list' })).toBeTruthy();
  });
});
