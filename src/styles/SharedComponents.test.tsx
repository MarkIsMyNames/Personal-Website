import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { SectionTitle } from './SharedComponents';
import { theme } from './theme';
import React from 'react';

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

    it('renders with compact styling', () => {
      const { container } = renderWithTheme(<SectionTitle $compact>Test Title</SectionTitle>);
      const title = container.querySelector('h2');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Test Title');
    });

    it('renders without compact styling by default', () => {
      const { container } = renderWithTheme(<SectionTitle>Test Title</SectionTitle>);
      const title = container.querySelector('h2');
      expect(title).toBeInTheDocument();
    });
  });
});
