module.exports = {
  roots: [
    "<rootDir>/"
  ],
  testEnvironment: 'node',
  testMatch: [
    "**/test/?(*.)+(test).+(ts)"
  ],
  transform: {
    "^.+\\.(ts|js)$": "ts-jest"
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@assemblyscript/.*)']
};
