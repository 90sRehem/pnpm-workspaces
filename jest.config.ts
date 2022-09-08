export default {
  clearMocks: true,
  preset: "ts-jest",
  projects: [
    "<rootDir>/api/**/jest.config.ts",
    "<rootDir>/client/**/jest.config.ts",
    "<rootDir>/domain/**/jest.config.ts",
    "<rootDir>/infra/**/jest.config.ts",
    "<rootDir>/packages/**/jest.config.ts",
  ],
  testEnvironment: "node",
  testMatch: ["*.spec.ts", "*.spec.tsx"],
};
