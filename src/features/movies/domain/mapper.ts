import type { OmdbMovieDetailsDto, OmdbSearchMovieDto } from '@/features/movies/api/dto';
import type {
  MovieDetails,
  MovieRating,
  MovieSummary,
  MovieType,
} from '@/features/movies/domain/types';

function toNullableString(value: string | undefined): string | null {
  if (!value || value === 'N/A') {
    return null;
  }

  return value;
}

function toCommaSeparatedArray(value: string | undefined): string[] {
  if (!value || value === 'N/A') {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function mapOmdbType(type: string): MovieType {
  switch (type) {
    case 'movie':
    case 'series':
    case 'episode':
    case 'game':
      return type;
    default:
      return 'unknown';
  }
}

function mapRatings(
  ratings: OmdbMovieDetailsDto['Ratings'] | undefined,
): MovieRating[] {
  if (!ratings) {
    return [];
  }

  return ratings.map((rating) => ({
    source: rating.Source,
    value: rating.Value,
  }));
}

export function mapMovieSummary(dto: OmdbSearchMovieDto): MovieSummary {
  return {
    id: dto.imdbID,
    title: dto.Title,
    year: dto.Year,
    type: mapOmdbType(dto.Type),
    posterUrl: toNullableString(dto.Poster),
  };
}

export function mapMovieDetails(dto: OmdbMovieDetailsDto): MovieDetails {
  return {
    id: dto.imdbID,
    title: dto.Title,
    year: dto.Year,
    type: mapOmdbType(dto.Type),
    posterUrl: toNullableString(dto.Poster),
    contentRating: toNullableString(dto.Rated),
    releasedAt: toNullableString(dto.Released),
    runtime: toNullableString(dto.Runtime),
    genres: toCommaSeparatedArray(dto.Genre),
    director: toNullableString(dto.Director),
    writers: toCommaSeparatedArray(dto.Writer),
    actors: toCommaSeparatedArray(dto.Actors),
    plot: toNullableString(dto.Plot),
    languages: toCommaSeparatedArray(dto.Language),
    countries: toCommaSeparatedArray(dto.Country),
    awards: toNullableString(dto.Awards),
    ratings: mapRatings(dto.Ratings),
    metascore: toNullableString(dto.Metascore),
    imdbRating: toNullableString(dto.imdbRating),
    imdbVotes: toNullableString(dto.imdbVotes),
    boxOffice: toNullableString(dto.BoxOffice),
    production: toNullableString(dto.Production),
  };
}
