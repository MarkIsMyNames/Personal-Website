import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

// jest-dom 7 augments the Vitest 4 `Assertion<T>` shape; Vitest 5 uses `Matchers<R, T>`.
declare module 'vitest' {
  interface Matchers<R, T> extends TestingLibraryMatchers<T, R> {}
}
