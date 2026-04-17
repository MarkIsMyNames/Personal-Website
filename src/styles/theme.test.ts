import { gradientColours, sectionBackgrounds } from './theme';
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
  HEX_PREFIX,
  HEX_CHANNEL_MAX_VALUE,
  HEX_R_START,
  HEX_R_END,
  HEX_G_START,
  HEX_G_END,
  HEX_B_START,
  HEX_B_END,
} from '../config';

function toLinearRgb(colourDecimal: number): number {
  return colourDecimal <= SRGB_LINEARIZATION_THRESHOLD ?
      colourDecimal / SRGB_LINEARIZATION_DIVISOR
    : ((colourDecimal + SRGB_GAMMA_ADDEND) / SRGB_GAMMA_DIVISOR) ** SRGB_GAMMA_EXPONENT;
}

function relativeLuminance(hexColour: string): number {
  const parseHexChannel = (start: number, end: number): number =>
    Number(`${HEX_PREFIX}${hexColour.slice(start, end)}`) / HEX_CHANNEL_MAX_VALUE;
  return (
    WCAG_RED_COEFFICIENT * toLinearRgb(parseHexChannel(HEX_R_START, HEX_R_END)) +
    WCAG_GREEN_COEFFICIENT * toLinearRgb(parseHexChannel(HEX_G_START, HEX_G_END)) +
    WCAG_BLUE_COEFFICIENT * toLinearRgb(parseHexChannel(HEX_B_START, HEX_B_END))
  );
}

function contrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  return (Math.max(l1, l2) + WCAG_LUMINANCE_OFFSET) / (Math.min(l1, l2) + WCAG_LUMINANCE_OFFSET);
}

type ContrastPair = { colourName: string; bgName: string; colourHex: string; bgHex: string };

// SectionTitle (h2) is bold 2.5rem — qualifies as WCAG large text, threshold is 3:1 for AA.
// Add entries to gradientColours/sectionBackgrounds in theme.ts to extend coverage automatically.
const contrastPairs: ContrastPair[] = Object.entries(gradientColours).flatMap(
  ([colourName, colourHex]) =>
    Object.entries(sectionBackgrounds).map(([bgName, bgHex]) => ({
      colourName,
      bgName,
      colourHex,
      bgHex,
    })),
);

describe('gradient text colours meet WCAG AA large text contrast (3:1) on all section backgrounds', () => {
  it.each(contrastPairs)('$colourName on $bgName', ({ colourHex, bgHex }) => {
    expect(contrastRatio(colourHex, bgHex)).toBeGreaterThanOrEqual(WCAG_AA_LARGE_TEXT_MIN_RATIO);
  });
});
