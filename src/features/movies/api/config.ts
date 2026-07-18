declare const process: {
  env: {
    EXPO_PUBLIC_OMDB_API_KEY?: string;
  };
};

const apiKey = process.env.EXPO_PUBLIC_OMDB_API_KEY;

if (!apiKey) {
  throw new Error(
    'Missing EXPO_PUBLIC_OMDB_API_KEY. Add it to your .env file to use the OMDb API.',
  );
}

export const omdbConfig = {
  apiKey,
} as const;
