module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "src",
    "dist",
    "node_modules",
  ],
 "transformIgnorePatterns": ["/node_modules/(?!@vespaiach/axios-fetch-adapter)"],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  }
};
