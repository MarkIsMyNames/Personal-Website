const accentHighlight = '#00d9ff';
const accentGradientEnd = '#7b2cbf';

export const theme = {
  colors: {
    pageBackground: '#0a0e27',
    sectionBackground: '#151934',
    cardBackground: '#1a1f3a',
    textDefault: '#e4e6eb',
    textMuted: '#b0b3b8',
    accentHighlight,
    accentGradientEnd,
    border: '#2a2f4a',
  },
  gradients: {
    accent: `linear-gradient(135deg, ${accentHighlight} 0%, ${accentGradientEnd} 100%)`,
  },
  shadows: {
    small: '0 4px 6px rgba(0, 0, 0, 0.3)',
    large: '0 10px 40px rgba(0, 0, 0, 0.4)',
    hover: '0 20px 60px rgba(0, 0, 0, 0.5)',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1200px',
  },
};

export type Theme = typeof theme;
