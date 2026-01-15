import type { Theme } from './styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Theme['colors'];
    gradients: Theme['gradients'];
    shadows: Theme['shadows'];
    breakpoints: Theme['breakpoints'];
  }
}
