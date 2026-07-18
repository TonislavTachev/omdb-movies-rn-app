export type OmdbMovieType = 'movie' | 'series' | 'episode' | 'game';

export interface OmdbSearchMovieDto {
  Title: string;
  Year: string;
  imdbID: string;
  Type: OmdbMovieType | string;
  Poster: string;
}

export interface OmdbSearchResponseDto {
  Search?: OmdbSearchMovieDto[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}

export interface OmdbRatingDto {
  Source: string;
  Value: string;
}

export interface OmdbMovieDetailsDto {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: OmdbRatingDto[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: OmdbMovieType | string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: 'True' | 'False';
  Error?: string;
}
