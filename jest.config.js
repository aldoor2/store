// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const customConfig = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: ".coverage",
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "^@/Pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@/Utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/Product/(.*)$": "<rootDir>/src/product/$1",
    "^@/Cart/(.*)$": "<rootDir>/src/cart/$1",
  },
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ["./jest.setup.ts"],
  // By default jest will use a node environment, so DOM elements (like document) will be undefined without this
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "<rootDir>/cypress/",
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
  ],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/cypress/",
    "<rootDir>/.next/",
  ],
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  moduleDirectories: ["node_modules", "src"],
};

module.exports = createJestConfig(customConfig);
