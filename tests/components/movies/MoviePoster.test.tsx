import { MoviePoster } from '@/features/movies/components/MoviePoster';
import { render, screen } from '@testing-library/react-native';

describe('MoviePoster', () => {
  it('renders an accessible poster when URL exists', async () => {
    await render(
      <MoviePoster
        posterUrl="https://example.com/poster.jpg"
        title="The Dark Knight"
      />,
    );

    expect(screen.getByLabelText('Poster for The Dark Knight')).toBeTruthy();
  });

  it('renders the unavailable placeholder when posterUrl is null', async () => {
    await render(<MoviePoster posterUrl={null} title="The Dark Knight" />);

    expect(
      screen.getByLabelText('Poster unavailable for The Dark Knight'),
    ).toBeTruthy();
    expect(screen.getByText('No poster')).toBeTruthy();
  });
});
