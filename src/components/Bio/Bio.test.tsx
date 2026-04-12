import { render, screen, within } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Bio } from './Bio';
import { theme } from '../../styles/theme';
import { AriaRole, HtmlAttr, ErrorMessage } from '../../types';
import { defaultLocale } from '../../i18n/localeConfig';
import {
  FIRST_INDEX,
  BIO_SENTENCE_DELIMITER,
  FETCH_PRIORITY_HIGH,
  REGEX_FLAG_CASE_INSENSITIVE,
} from '../../config';
import type React from 'react';

const mockProfile = defaultLocale.profile;

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Bio Component', () => {
  it('renders profile name from translation', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    expect(screen.getByText(mockProfile.name)).toBeInTheDocument();
  });

  it('renders profile title from translation', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    expect(screen.getByText(defaultLocale.profile.title)).toBeInTheDocument();
  });

  it('renders bio sentences from translation', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    const firstSentence = defaultLocale.profile.bio.split(BIO_SENTENCE_DELIMITER)[FIRST_INDEX];
    if (!firstSentence) {
      throw new Error(ErrorMessage.NoBioSentence);
    }
    expect(
      screen.getByText(new RegExp(firstSentence, REGEX_FLAG_CASE_INSENSITIVE)),
    ).toBeInTheDocument();
  });

  it('renders education from translation with graduationYear from prop', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    expect(
      within(screen.getByLabelText(defaultLocale.bio.ariaLabels.education)).getByText(
        new RegExp(
          `${defaultLocale.profile.university}.*${mockProfile.graduationYear}`,
          REGEX_FLAG_CASE_INSENSITIVE,
        ),
      ),
    ).toBeInTheDocument();
  });

  it('renders profile image with src from prop', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    const imageElement = screen.getByAltText(
      defaultLocale.bio.ariaLabels.image
        .replace('{{name}}', mockProfile.name)
        .replace('{{title}}', defaultLocale.profile.title),
    );
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(HtmlAttr.Src, mockProfile.image);
  });

  it('renders profile image with high fetch priority for LCP', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    const imageElement = screen.getByAltText(
      defaultLocale.bio.ariaLabels.image
        .replace('{{name}}', mockProfile.name)
        .replace('{{title}}', defaultLocale.profile.title),
    );
    expect(imageElement).toHaveAttribute(HtmlAttr.FetchPriority, FETCH_PRIORITY_HIGH);
  });

  it('renders about section with correct aria-label', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    expect(
      screen.getByLabelText(
        defaultLocale.common.ariaLabels.section.replace(
          '{{title}}',
          defaultLocale.navigation.sections.about,
        ),
      ),
    ).toBeInTheDocument();
  });

  it('renders biography article with correct aria-label', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    expect(
      screen.getByRole(AriaRole.Article, { name: defaultLocale.bio.ariaLabels.biography }),
    ).toBeInTheDocument();
  });
});
