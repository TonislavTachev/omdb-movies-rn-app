import type { MovieDetails } from '@/features/movies/domain/types';
import { createMovieRatingCards } from '@/features/movies/presentation/movieRating';
import { completeMovieDetails } from '@tests/fixtures/movies';

describe('createMovieRatingCards', () => {
  it('creates IMDb card first', () => {
    const cards = createMovieRatingCards(completeMovieDetails);

    expect(cards[0]).toMatchObject({
      key: 'imdb',
      label: 'IMDb',
      value: '9.0',
    });
  });

  it('adds Metascore when present', () => {
    const cards = createMovieRatingCards(completeMovieDetails);

    expect(cards[1]).toMatchObject({
      key: 'metascore',
      label: 'Metascore',
      value: '84',
    });
  });

  it('removes duplicate IMDb entry from external ratings', () => {
    const cards = createMovieRatingCards(completeMovieDetails);
    const imdbDuplicates = cards.filter((card) => card.label === 'IMDb');

    expect(imdbDuplicates).toHaveLength(1);
  });

  it('preserves external ratings', () => {
    const cards = createMovieRatingCards(completeMovieDetails);

    expect(cards).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: 'Rotten Tomatoes',
          value: '94%',
        }),
      ]),
    );
  });

  it('creates correct accessibility labels', () => {
    const cards = createMovieRatingCards(completeMovieDetails);

    expect(cards[0]?.accessibilityLabel).toBe(
      'IMDb rating 9.0 out of 10, 2,800,000 votes',
    );
    expect(cards[1]?.accessibilityLabel).toBe('Metascore 84');
    expect(cards[2]?.accessibilityLabel).toBe('Rotten Tomatoes rating 94%');
  });

  it('returns an empty array when no ratings exist', () => {
    const movieWithoutRatings: MovieDetails = {
      ...completeMovieDetails,
      imdbRating: null,
      imdbVotes: null,
      metascore: null,
      ratings: [],
    };

    expect(createMovieRatingCards(movieWithoutRatings)).toEqual([]);
  });
});
