import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: ${({ theme }) => theme.cssValues.inset.zero};
    padding: ${({ theme }) => theme.cssValues.inset.zero};
    box-sizing: ${({ theme }) => theme.cssValues.boxSizing.borderBox};
  }

  body * {
    background-color: ${({ theme }) => theme.cssValues.color.transparent};
    color: ${({ theme }) => theme.cssValues.color.inherit};
  }

  body {
    background-color: ${({ theme }) => theme.colors.pageBackground};
    color: ${({ theme }) => theme.colors.textDefault};
    font-family: ${({ theme }) => theme.fonts.system};
    -webkit-font-smoothing: ${({ theme }) => theme.cssValues.fontSmoothing.antialiased};
    -moz-osx-font-smoothing: ${({ theme }) => theme.cssValues.fontSmoothing.grayscale};
    line-height: ${({ theme }) => theme.text.lineHeight.tight};
  }
`;
