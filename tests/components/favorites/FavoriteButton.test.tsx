import { FavoriteButton } from '@/features/favorites/components/FavoriteButton';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('FavoriteButton', () => {
  it('renders selected and unselected states', async () => {
    const { rerender } = await render(
      <FavoriteButton isFavorite={false} onPress={jest.fn()} />,
    );

    expect(
      screen.getByRole('button', { name: 'Add to Favorites' }),
    ).toBeTruthy();

    await rerender(<FavoriteButton isFavorite onPress={jest.fn()} />);

    expect(
      screen.getByRole('button', { name: 'Remove from Favorites' }),
    ).toBeTruthy();
  });

  it('exposes selected accessibility state', async () => {
    await render(<FavoriteButton isFavorite onPress={jest.fn()} />);

    expect(
      screen.getByRole('button', {
        name: 'Remove from Favorites',
        selected: true,
      }),
    ).toBeTruthy();
  });

  it('invokes onPress', async () => {
    const onPress = jest.fn();

    await render(<FavoriteButton isFavorite={false} onPress={onPress} />);

    fireEvent.press(screen.getByRole('button', { name: 'Add to Favorites' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('respects disabled state', async () => {
    const onPress = jest.fn();

    await render(
      <FavoriteButton disabled isFavorite={false} onPress={onPress} />,
    );

    const button = screen.getByRole('button', {
      name: 'Add to Favorites',
      disabled: true,
    });

    fireEvent.press(button);

    expect(onPress).not.toHaveBeenCalled();
  });
});
