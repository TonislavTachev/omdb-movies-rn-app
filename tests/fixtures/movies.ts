import type { MovieDetails, MovieSummary } from '@/features/movies/domain/types';

export const completeMovieSummary: MovieSummary = {
  id: 'tt0468569',
  title: 'The Dark Knight',
  year: '2008',
  type: 'movie',
  posterUrl: 'https://example.com/dark-knight.jpg',
};

export const movieSummaryWithoutPoster: MovieSummary = {
  id: 'tt0000001',
  title: 'Missing Poster Film',
  year: '1999',
  type: 'movie',
  posterUrl: null,
};

export const completeMovieDetails: MovieDetails = {
  id: 'tt0468569',
  title: 'The Dark Knight',
  year: '2008',
  type: 'movie',
  posterUrl: 'https://example.com/dark-knight.jpg',
  contentRating: 'PG-13',
  releasedAt: '18 Jul 2008',
  runtime: '152 min',
  genres: ['Action', 'Crime', 'Drama'],
  director: 'Christopher Nolan',
  writers: ['Jonathan Nolan', 'Christopher Nolan'],
  actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
  plot: 'When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests.',
  languages: ['English', 'Mandarin'],
  countries: ['United States', 'United Kingdom'],
  awards: 'Won 2 Oscars',
  ratings: [
    { source: 'Internet Movie Database', value: '9.0/10' },
    { source: 'Rotten Tomatoes', value: '94%' },
  ],
  metascore: '84',
  imdbRating: '9.0',
  imdbVotes: '2,800,000',
  boxOffice: '$533,345,358',
  production: 'Warner Bros. Pictures',
};

export const movieDetailsWithMissingOptionals: MovieDetails = {
  id: 'tt0000002',
  title: 'Sparse Details',
  year: '2001',
  type: 'unknown',
  posterUrl: null,
  contentRating: null,
  releasedAt: null,
  runtime: null,
  genres: [],
  director: null,
  writers: [],
  actors: [],
  plot: null,
  languages: [],
  countries: [],
  awards: null,
  ratings: [],
  metascore: null,
  imdbRating: null,
  imdbVotes: null,
  boxOffice: null,
  production: null,
};
