import { theme } from './theme';
import {
  WCAG_AA_LARGE_TEXT_MIN_RATIO,
  WCAG_LUMINANCE_OFFSET,
  WCAG_RED_COEFFICIENT,
  WCAG_GREEN_COEFFICIENT,
  WCAG_BLUE_COEFFICIENT,
  SRGB_LINEARIZATION_THRESHOLD,
  SRGB_LINEARIZATION_DIVISOR,
  SRGB_GAMMA_ADDEND,
  SRGB_GAMMA_DIVISOR,
  SRGB_GAMMA_EXPONENT,
  HEX_CHANNEL_RADIX,
  HEX_CHANNEL_MAX_VALUE,
  HEX_R_START,
  HEX_R_END,
  HEX_G_START,
  HEX_G_END,
  HEX_B_START,
  HEX_B_END,
} from '../config';

function toLinearRgb(c: number): number {
  return c <= SRGB_LINEARIZATION_THRESHOLD ?
      c / SRGB_LINEARIZATION_DIVISOR
    : ((c + SRGB_GAMMA_ADDEND) / SRGB_GAMMA_DIVISOR) ** SRGB_GAMMA_EXPONENT;
}

function relativeLuminance(hex: string): number {
  const r = parseInt(hex.slice(HEX_R_START, HEX_R_END), HEX_CHANNEL_RADIX) / HEX_CHANNEL_MAX_VALUE;
  const g = parseInt(hex.slice(HEX_G_START, HEX_G_END), HEX_CHANNEL_RADIX) / HEX_CHANNEL_MAX_VALUE;
  const b = parseInt(hex.slice(HEX_B_START, HEX_B_END), HEX_CHANNEL_RADIX) / HEX_CHANNEL_MAX_VALUE;
  return (
    WCAG_RED_COEFFICIENT * toLinearRgb(r) +
    WCAG_GREEN_COEFFICIENT * toLinearRgb(g) +
    WCAG_BLUE_COEFFICIENT * toLinearRgb(b)
  );
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + WCAG_LUMINANCE_OFFSET) / (darker + WCAG_LUMINANCE_OFFSET);
}

// SectionTitle (h2) is bold 2.5rem — qualifies as WCAG large text, threshold is 3:1 for AA.
const sectionBackgrounds: [string, string][] = [
  ['pageBackground', theme.colors.pageBackground],
  ['sectionBackground', theme.colors.sectionBackground],
  ['cardBackground', theme.colors.cardBackground],
];

const gradientColours: [string, string][] = [
  ['accentHighlight', theme.colors.accentHighlight],
  ['accentGradientMid', theme.colors.accentGradientMid],
  ['accentGradientEnd', theme.colors.accentGradientEnd],
];

describe('gradient text colours meet WCAG AA large text contrast (3:1) on all section backgrounds', () => {
  it.each(gradientColours)('%s', (_colour, hex) => {
    sectionBackgrounds.forEach(([_bg, bg]) => {
      expect(contrastRatio(hex, bg)).toBeGreaterThanOrEqual(WCAG_AA_LARGE_TEXT_MIN_RATIO);
    });
  });
});
