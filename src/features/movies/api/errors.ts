export type MovieApiErrorCode =
  | 'CONFIGURATION_ERROR'
  | 'NETWORK_ERROR'
  | 'API_ERROR'
  | 'NOT_FOUND'
  | 'INVALID_RESPONSE';

interface MovieApiErrorOptions {
  code: MovieApiErrorCode;
  userMessage: string;
  apiMessage?: string;
}

export class MovieApiError extends Error {
  readonly code: MovieApiErrorCode;
  readonly userMessage: string;
  readonly apiMessage?: string;

  constructor({ code, userMessage, apiMessage }: MovieApiErrorOptions) {
    super(userMessage);
    this.name = 'MovieApiError';
    this.code = code;
    this.userMessage = userMessage;
    this.apiMessage = apiMessage;
  }
}

export function normalizeOmdbErrorMessage(errorMessage?: string): MovieApiError {
  if (!errorMessage) {
    return new MovieApiError({
      code: 'API_ERROR',
      userMessage: 'Something went wrong while fetching movie data.',
    });
  }

  const normalizedMessage = errorMessage.toLowerCase();

  if (
    normalizedMessage.includes('not found') ||
    normalizedMessage.includes('invalid imdb')
  ) {
    return new MovieApiError({
      code: 'NOT_FOUND',
      userMessage: 'We could not find that movie.',
      apiMessage: errorMessage,
    });
  }

  return new MovieApiError({
    code: 'API_ERROR',
    userMessage: 'Something went wrong while fetching movie data.',
    apiMessage: errorMessage,
  });
}

export function getMovieErrorMessage(error: unknown): string {
  if (error instanceof MovieApiError) {
    if (error.code === 'NOT_FOUND') {
      return "We couldn't find this movie.";
    }

    if (error.code === 'NETWORK_ERROR') {
      return 'Check your internet connection and try again.';
    }

    return error.userMessage;
  }

  return 'Something went wrong while fetching movie data.';
}
