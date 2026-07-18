import {
  MovieApiError,
  normalizeOmdbErrorMessage,
} from '@/features/movies/api/errors';
import { omdbConfig } from '@/features/movies/api/config';

const OMDB_BASE_URL = 'https://www.omdbapi.com/';

interface OmdbBaseResponse {
  Response: 'True' | 'False';
  Error?: string;
}

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError';
}

export async function omdbRequest<T extends OmdbBaseResponse>(
  params: Record<string, string | number | undefined>,
  signal?: AbortSignal,
): Promise<T> {
  try {
    const url = new URL(OMDB_BASE_URL);

    url.searchParams.set('apikey', omdbConfig.apiKey);

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }

    const response = await fetch(url.toString(), { signal });

    if (!response.ok) {
      throw new MovieApiError({
        code: 'NETWORK_ERROR',
        userMessage: 'Unable to reach the movie service. Please try again.',
      });
    }

    let data: T;

    try {
      data = (await response.json()) as T;
    } catch {
      throw new MovieApiError({
        code: 'INVALID_RESPONSE',
        userMessage: 'Received an invalid response from the movie service.',
      });
    }

    if (data.Response === 'False') {
      throw normalizeOmdbErrorMessage(data.Error);
    }

    return data;
  } catch (error) {
    if (isAbortError(error)) {
      throw error;
    }

    if (error instanceof MovieApiError) {
      throw error;
    }

    throw new MovieApiError({
      code: 'NETWORK_ERROR',
      userMessage: 'Unable to reach the movie service. Please try again.',
    });
  }
}
