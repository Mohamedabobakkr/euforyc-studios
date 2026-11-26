// Jest, for the unit tests in __tests__/ (run with `npm test`).
// next/jest supplies the TypeScript transform and stands in for `server-only`,
// which Next itself enforces at build time.
const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const config = {
  // Route handlers and server logic: no browser needed
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    // The "@/..." imports from tsconfig.json
    '^@/(.*)$': '<rootDir>/$1',
  },
};

module.exports = createJestConfig(config);
