// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  // Enable ESM support
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  
  // Clear mocks automatically
  clearMocks: true,
  
  // Coverage provider
  coverageProvider: "v8",
  
  // Use ts-jest preset
  preset: 'ts-jest/presets/js-with-ts-esm',
  
  // Set up files
  setupFiles: ['<rootDir>/jest.setup.ts'],
  
  // Module file extensions
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  
  // Transform TypeScript files with ESM support
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.json'
      }
    ]
  },
  
  // Handle path aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  
  // Node environment for tests
  testEnvironment: 'node',
  
  // Ignore specific paths
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/'
  ]
};

export default config;