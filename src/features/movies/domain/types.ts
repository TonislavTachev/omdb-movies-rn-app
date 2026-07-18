export type MovieType = 'movie' | 'series' | 'episode' | 'game' | 'unknown';

export interface MovieSummary {
  id: string;
  title: string;
  year: string;
  type: MovieType;
  posterUrl: string | null;
}

export interface MovieSearchResult {
  movies: MovieSummary[];
  totalResults: number;
  page: number;
  searchTerm: string;
}

export interface MovieRating {
  source: string;
  value: string;
}

export interface MovieDetails {
  id: string;
  title: string;
  year: string;
  type: MovieType;
  posterUrl: string | null;
  contentRating: string | null;
  releasedAt: string | null;
  runtime: string | null;
  genres: string[];
  director: string | null;
  writers: string[];
  actors: string[];
  plot: string | null;
  languages: string[];
  countries: string[];
  awards: string | null;
  ratings: MovieRating[];
  metascore: string | null;
  imdbRating: string | null;
  imdbVotes: string | null;
  boxOffice: string | null;
  production: string | null;
}
