process.env.EXPO_PUBLIC_OMDB_API_KEY ??= 'test-api-key';

jest.mock(
  'react-native-safe-area-context',
  () => require('./tests/mocks/safeAreaContext.mock.js'),
);
