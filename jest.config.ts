/** @format */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  setupFiles: ["dotenv/config"],
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
  setupFilesAfterEnv: ["./src/test.setup.ts"],
};
