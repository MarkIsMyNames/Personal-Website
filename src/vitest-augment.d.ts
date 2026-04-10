// Augment jest.Expect to accept an optional message parameter, matching vitest runtime behavior.
// @testing-library/jest-dom pulls in @types/jest which only declares a 1-arg overload.
declare namespace jest {
  interface Expect {
    <T = unknown>(actual: T, message: string): jest.JestMatchers<T>;
  }
}
