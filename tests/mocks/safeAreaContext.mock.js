const inset = { top: 0, right: 0, bottom: 0, left: 0 };

module.exports = {
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => inset,
  useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
};
