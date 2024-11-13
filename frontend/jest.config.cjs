module.exports = {
    preset: 'ts-jest',
    testEnvironment: "jsdom",
    transform: {
       '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
   //  setupFilesAfterEnv: ['@testing-library/jest-dom'],
   setupFilesAfterEnv: ['./jest.setup.js']    
   };