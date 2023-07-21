module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "!src/**/*.d.ts"],
  transformIgnorePatterns: ["^.+\\.module\\.(css|scss)$"],
  moduleNameMapper: {
    "^.+\\.module\\.(css|scss)$": "identity-obj-proxy",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/mocks/fileMock.js",
  },
};
