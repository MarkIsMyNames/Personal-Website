import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Contact } from './Contact';
import { theme } from '../../styles/theme';
import { AriaRole, HtmlAttr, ContactMethods } from '../../types';
import { defaultLocale } from '../../i18n/localeConfig';
import {
  EXTERNAL_LINK_REL,
  EXTERNAL_LINK_TARGET,
  GITHUB_BASE_URL,
  MAILTO_PREFIX,
} from '../../config';
import type React from 'react';

const mockProfile = defaultLocale.profile;

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Contact Component', () => {
  it('renders section title', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    expect(screen.getByText(defaultLocale.contact.sectionTitle)).toBeInTheDocument();
  });

  it('renders email link with correct href', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    const emailLink = screen.getByLabelText(
      defaultLocale.contact.ariaLabels.email.replace('{{email}}', mockProfile.email),
    );
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute(HtmlAttr.Href, `${MAILTO_PREFIX}${mockProfile.email}`);
  });

  it('renders GitHub link with correct href', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    const githubLink = screen.getByLabelText(
      defaultLocale.contact.ariaLabels.github.replace('{{username}}', mockProfile.github),
    );
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(HtmlAttr.Href, `${GITHUB_BASE_URL}${mockProfile.github}`);
  });

  it('GitHub link opens in new tab', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    const githubLink = screen.getByLabelText(
      defaultLocale.contact.ariaLabels.github.replace('{{username}}', mockProfile.github),
    );
    expect(githubLink).toHaveAttribute(HtmlAttr.Target, EXTERNAL_LINK_TARGET);
    expect(githubLink).toHaveAttribute(HtmlAttr.Rel, EXTERNAL_LINK_REL);
  });

  it('email link does not open in new tab', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    const emailLink = screen.getByLabelText(
      defaultLocale.contact.ariaLabels.email.replace('{{email}}', mockProfile.email),
    );
    expect(emailLink).not.toHaveAttribute(HtmlAttr.Target, EXTERNAL_LINK_TARGET);
  });

  it('renders email and GitHub as visible text', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    expect(screen.getByText(mockProfile.email)).toBeInTheDocument();
    expect(
      screen.getByText(defaultLocale.contact.githubUrl.replace('{{username}}', mockProfile.github)),
    ).toBeInTheDocument();
  });

  it('renders contact section with correct aria-label', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    expect(
      screen.getByLabelText(
        defaultLocale.common.ariaLabels.section.replace(
          '{{title}}',
          defaultLocale.navigation.sections.contact,
        ),
      ),
    ).toBeInTheDocument();
  });

  it('renders all configured contact methods', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    expect(screen.getAllByRole(AriaRole.ListItem)).toHaveLength(ContactMethods.length);
  });
});
