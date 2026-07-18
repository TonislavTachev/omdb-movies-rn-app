import {
  mapMovieDetails,
  mapMovieSummary,
} from '@/features/movies/domain/mapper';
import {
  omdbMovieDetailsDto,
  omdbMovieDetailsDtoUnknownType,
  omdbMovieDetailsDtoWithNaValues,
  omdbSearchMovieDto,
  omdbSearchMovieDtoNoPoster,
} from '@tests/fixtures/movieDtos';

describe('mapMovieSummary', () => {
  it('maps OMDb PascalCase fields into domain fields', () => {
    expect(mapMovieSummary(omdbSearchMovieDto)).toEqual({
      id: 'tt0468569',
      title: 'The Dark Knight',
      year: '2008',
      type: 'movie',
      posterUrl: 'https://example.com/dark-knight.jpg',
    });
  });

  it('converts Poster === "N/A" to null', () => {
    expect(mapMovieSummary(omdbSearchMovieDtoNoPoster).posterUrl).toBeNull();
  });
});

describe('mapMovieDetails', () => {
  it('maps OMDb PascalCase fields into domain fields', () => {
    const movie = mapMovieDetails(omdbMovieDetailsDto);

    expect(movie.id).toBe('tt0468569');
    expect(movie.title).toBe('The Dark Knight');
    expect(movie.year).toBe('2008');
    expect(movie.type).toBe('movie');
    expect(movie.contentRating).toBe('PG-13');
    expect(movie.plot).toContain('Joker');
  });

  it('converts optional "N/A" fields to null', () => {
    const movie = mapMovieDetails(omdbMovieDetailsDtoWithNaValues);

    expect(movie.posterUrl).toBeNull();
    expect(movie.contentRating).toBeNull();
    expect(movie.releasedAt).toBeNull();
    expect(movie.runtime).toBeNull();
    expect(movie.director).toBeNull();
    expect(movie.plot).toBeNull();
    expect(movie.metascore).toBeNull();
    expect(movie.imdbRating).toBeNull();
    expect(movie.imdbVotes).toBeNull();
    expect(movie.boxOffice).toBeNull();
    expect(movie.production).toBeNull();
    expect(movie.awards).toBeNull();
  });

  it('splits comma-separated actors, writers, genres, languages, and countries', () => {
    const movie = mapMovieDetails(omdbMovieDetailsDto);

    expect(movie.genres).toEqual(['Action', 'Crime', 'Drama']);
    expect(movie.writers).toEqual(['Jonathan Nolan', 'Christopher Nolan']);
    expect(movie.actors).toEqual([
      'Christian Bale',
      'Heath Ledger',
      'Aaron Eckhart',
    ]);
    expect(movie.languages).toEqual(['English', 'Mandarin']);
    expect(movie.countries).toEqual(['United States', 'United Kingdom']);
  });

  it('converts comma-separated "N/A" fields to empty arrays', () => {
    const movie = mapMovieDetails(omdbMovieDetailsDtoWithNaValues);

    expect(movie.genres).toEqual([]);
    expect(movie.writers).toEqual([]);
    expect(movie.actors).toEqual([]);
    expect(movie.languages).toEqual([]);
    expect(movie.countries).toEqual([]);
  });

  it('safely handles unknown movie types', () => {
    expect(mapMovieDetails(omdbMovieDetailsDtoUnknownType).type).toBe('unknown');
  });
});
