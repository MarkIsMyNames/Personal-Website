import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

// jest-dom 7 augments the Vitest 4 `Assertion<T>` shape; Vitest 5 uses `Matchers<R, T>`.
// Declaration merging requires the type parameters to match Vitest's exactly.
declare module 'vitest' {
  /* eslint-disable @typescript-eslint/no-unused-vars, no-restricted-syntax */
  interface Matchers<
    R extends void | Promise<void> = void | Promise<void>,
    T = unknown,
  > extends TestingLibraryMatchers<unknown, R> {}
  /* eslint-enable @typescript-eslint/no-unused-vars, no-restricted-syntax */
}
