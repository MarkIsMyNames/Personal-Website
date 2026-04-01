import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { SectionTitle } from './SharedComponents';
import { theme } from './theme';
import type React from 'react';

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('SharedComponents', () => {
  describe('SectionTitle', () => {
    it('renders with default styling', () => {
      const { container } = renderWithTheme(<SectionTitle>Test Title</SectionTitle>);
      const title = container.querySelector('h2');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Test Title');
    });

    it('renders as an h2 element', () => {
      const { container } = renderWithTheme(<SectionTitle>Test Title</SectionTitle>);
      const title = container.querySelector('h2');
      expect(title).toBeInTheDocument();
    });
  });
});
