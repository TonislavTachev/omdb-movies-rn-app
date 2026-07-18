import { getMovieFacts } from '@/features/movies/domain/selectors';
import {
  completeMovieDetails,
  movieDetailsWithMissingOptionals,
} from '@tests/fixtures/movies';

describe('getMovieFacts', () => {
  it('omits unavailable facts', () => {
    const facts = getMovieFacts(movieDetailsWithMissingOptionals);

    expect(facts).toEqual([]);
  });

  it('joins languages and countries correctly', () => {
    const facts = getMovieFacts(completeMovieDetails);

    expect(facts).toEqual(
      expect.arrayContaining([
        { label: 'Language', value: 'English, Mandarin' },
        { label: 'Country', value: 'United States, United Kingdom' },
      ]),
    );
  });

  it('does not mutate the movie', () => {
    const movie = { ...completeMovieDetails, languages: ['English'] };
    const snapshot = { ...movie, languages: [...movie.languages] };

    getMovieFacts(movie);

    expect(movie).toEqual(snapshot);
  });
});
