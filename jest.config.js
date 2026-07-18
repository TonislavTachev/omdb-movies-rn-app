/** @type {import('jest').Config} */
module.exports = {
  preset: './jest.preset.js',
  roots: ['<rootDir>/tests'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.afterEnv.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
  },
  collectCoverageFrom: [
    'src/features/movies/domain/**/*.{ts,tsx}',
    'src/features/movies/presentation/**/*.{ts,tsx}',
    'src/features/favorites/domain/**/*.{ts,tsx}',
    'src/features/favorites/storage/**/*.{ts,tsx}',
    'src/shared/utils/**/*.{ts,tsx}',
    'src/shared/components/StateMessage.tsx',
    'src/features/movies/components/MoviePoster.tsx',
    'src/features/favorites/components/FavoriteButton.tsx',
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
};
