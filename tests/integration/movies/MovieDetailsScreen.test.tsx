import type { RootStackParamList } from '@/app/navigation/types';
import { getMovieDetails } from '@/features/movies/api/api';
import { MovieDetailsScreen } from '@/features/movies/screens/MovieDetailsScreen';
import { completeMovieDetails } from '@tests/fixtures/movies';
import { renderWithProviders } from '@tests/utilities/renderWithProviders';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { screen, userEvent, waitFor } from '@testing-library/react-native';
import { useMemo } from 'react';

jest.mock('@/features/movies/api/api', () => ({
  getMovieDetails: jest.fn(),
  searchMovies: jest.fn(),
}));

jest.mock(
  '@react-native-async-storage/async-storage',
  () => require('@tests/mocks/asyncStorage.mock'),
);

const mockedGetMovieDetails = jest.mocked(getMovieDetails);

type MovieDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MovieDetails'
>;

function MovieDetailsScreenHarness({
  imdbID = completeMovieDetails.id,
}: {
  imdbID?: string;
}) {
  const navigation = useMemo(
    () =>
      ({
        goBack: jest.fn(),
        setOptions: jest.fn(),
      }) as unknown as MovieDetailsScreenProps['navigation'],
    [],
  );

  const route = useMemo(
    () =>
      ({
        key: 'MovieDetails-test',
        name: 'MovieDetails',
        params: { imdbID },
      }) as MovieDetailsScreenProps['route'],
    [imdbID],
  );

  return <MovieDetailsScreen navigation={navigation} route={route} />;
}

describe('MovieDetailsScreen', () => {
  beforeEach(() => {
    mockedGetMovieDetails.mockReset();
  });

  it('loads movie details and toggles favorites from the header action', async () => {
    let resolveDetails: (value: typeof completeMovieDetails) => void = () => {};
    const detailsPromise = new Promise<typeof completeMovieDetails>((resolve) => {
      resolveDetails = resolve;
    });

    mockedGetMovieDetails.mockReturnValue(detailsPromise);

    const user = userEvent.setup();
    await renderWithProviders(<MovieDetailsScreenHarness />);

    await waitFor(() => {
      expect(mockedGetMovieDetails).toHaveBeenCalled();
    });

    expect(
      screen.queryByRole('header', { name: completeMovieDetails.title }),
    ).toBeNull();
    expect(screen.getByRole('button', { name: 'Go back' })).toBeTruthy();

    resolveDetails(completeMovieDetails);

    await waitFor(() => {
      expect(
        screen.getByRole('header', { name: completeMovieDetails.title }),
      ).toBeTruthy();
    });

    expect(screen.getByText(completeMovieDetails.plot!)).toBeTruthy();

    const addButton = await screen.findByRole('button', {
      name: 'Add to Favorites',
    });

    await user.press(addButton);

    expect(
      await screen.findByRole('button', { name: 'Remove from Favorites' }),
    ).toBeTruthy();
  });
});
