import type {
  OmdbMovieDetailsDto,
  OmdbSearchResponseDto,
} from '@/features/movies/api/dto';
import { MovieApiError } from '@/features/movies/api/errors';
import { omdbRequest } from '@/features/movies/api/client';
import {
  mapMovieDetails,
  mapMovieSummary,
} from '@/features/movies/domain/mapper';
import type {
  MovieDetails,
  MovieSearchResult,
  MovieType,
} from '@/features/movies/domain/types';

export interface SearchMoviesParams {
  searchTerm: string;
  page?: number;
  type?: MovieType;
  year?: string;
  signal?: AbortSignal;
}

export interface GetMovieDetailsParams {
  imdbID: string;
  signal?: AbortSignal;
}

function parseTotalResults(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? '0', 10);

  return Number.isNaN(parsed) ? 0 : parsed;
}

export async function searchMovies(
  params: SearchMoviesParams,
): Promise<MovieSearchResult> {
  const normalizedSearchTerm = params.searchTerm.trim();

  if (!normalizedSearchTerm) {
    throw new MovieApiError({
      code: 'API_ERROR',
      userMessage: 'Please enter a search term.',
    });
  }

  const requestParams: Record<string, string | number | undefined> = {
    s: normalizedSearchTerm,
    page: params.page ?? 1,
    y: params.year,
  };

  if (params.type && params.type !== 'unknown') {
    requestParams.type = params.type;
  }

  const response = await omdbRequest<OmdbSearchResponseDto>(
    requestParams,
    params.signal,
  );

  const movies = (response.Search ?? []).map(mapMovieSummary);

  return {
    movies,
    totalResults: parseTotalResults(response.totalResults),
    page: params.page ?? 1,
    searchTerm: normalizedSearchTerm,
  };
}

export async function getMovieDetails(
  params: GetMovieDetailsParams,
): Promise<MovieDetails> {
  const imdbID = params.imdbID.trim();

  if (!imdbID) {
    throw new MovieApiError({
      code: 'API_ERROR',
      userMessage: 'A valid IMDb ID is required.',
    });
  }

  const response = await omdbRequest<OmdbMovieDetailsDto>(
    {
      i: imdbID,
      plot: 'full',
    },
    params.signal,
  );

  return mapMovieDetails(response);
}
