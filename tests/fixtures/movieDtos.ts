import type {
  OmdbMovieDetailsDto,
  OmdbSearchMovieDto,
} from '@/features/movies/api/dto';

export const omdbSearchMovieDto: OmdbSearchMovieDto = {
  Title: 'The Dark Knight',
  Year: '2008',
  imdbID: 'tt0468569',
  Type: 'movie',
  Poster: 'https://example.com/dark-knight.jpg',
};

export const omdbSearchMovieDtoNoPoster: OmdbSearchMovieDto = {
  Title: 'Missing Poster Film',
  Year: '1999',
  imdbID: 'tt0000001',
  Type: 'movie',
  Poster: 'N/A',
};

export const omdbMovieDetailsDto: OmdbMovieDetailsDto = {
  Title: 'The Dark Knight',
  Year: '2008',
  Rated: 'PG-13',
  Released: '18 Jul 2008',
  Runtime: '152 min',
  Genre: 'Action, Crime, Drama',
  Director: 'Christopher Nolan',
  Writer: 'Jonathan Nolan, Christopher Nolan',
  Actors: 'Christian Bale, Heath Ledger, Aaron Eckhart',
  Plot: 'When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests.',
  Language: 'English, Mandarin',
  Country: 'United States, United Kingdom',
  Awards: 'Won 2 Oscars',
  Poster: 'https://example.com/dark-knight.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '9.0/10' },
    { Source: 'Rotten Tomatoes', Value: '94%' },
  ],
  Metascore: '84',
  imdbRating: '9.0',
  imdbVotes: '2,800,000',
  imdbID: 'tt0468569',
  Type: 'movie',
  DVD: 'N/A',
  BoxOffice: '$533,345,358',
  Production: 'Warner Bros. Pictures',
  Website: 'N/A',
  Response: 'True',
};

export const omdbMovieDetailsDtoWithNaValues: OmdbMovieDetailsDto = {
  ...omdbMovieDetailsDto,
  imdbID: 'tt0000003',
  Title: 'Partial N/A Fields',
  Poster: 'N/A',
  Rated: 'N/A',
  Released: 'N/A',
  Runtime: 'N/A',
  Genre: 'N/A',
  Director: 'N/A',
  Writer: 'N/A',
  Actors: 'N/A',
  Plot: 'N/A',
  Language: 'N/A',
  Country: 'N/A',
  Awards: 'N/A',
  Metascore: 'N/A',
  imdbRating: 'N/A',
  imdbVotes: 'N/A',
  BoxOffice: 'N/A',
  Production: 'N/A',
};

export const omdbMovieDetailsDtoUnknownType: OmdbMovieDetailsDto = {
  ...omdbMovieDetailsDto,
  imdbID: 'tt0000004',
  Title: 'Unknown Type Show',
  Type: 'short',
};
