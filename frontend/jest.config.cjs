module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Transforms JavaScript/TypeScript files
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-stub", // Mock image assets
  },
  setupFilesAfterEnv: ["./jest.setup.js"], // Runs after test environment is set up
};
