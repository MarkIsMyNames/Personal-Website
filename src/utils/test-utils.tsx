import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import type React from 'react';

export const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
