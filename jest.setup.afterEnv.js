const { cleanup } = require('@testing-library/react-native');

afterEach(async () => {
  await cleanup();
});
