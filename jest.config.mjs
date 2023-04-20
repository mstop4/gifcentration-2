import nextJest from 'next/jest.js';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url); // https://stackoverflow.com/a/62499498/9693250

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    // https://github.com/uuidjs/uuid/issues/451#issuecomment-1112328417
    "uuid": require.resolve('uuid'),
  },
  collectCoverage: true,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
