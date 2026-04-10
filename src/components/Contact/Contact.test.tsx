import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Contact } from './Contact';
import { theme } from '../../styles/theme';
import type { Profile } from '../../types';
import en from '../../i18n/locales/en.json';
import { EXPECTED_CONTACT_METHODS, EXTERNAL_LINK_REL, EXTERNAL_LINK_TARGET } from '../../config';
import type React from 'react';

const mockProfile: Profile = {
  name: 'Test User',
  title: 'Test Engineer',
  bio: 'Test bio',
  image: 'test.jpg',
  email: 'test@example.com',
  github: 'testuser',
  graduationYear: 2027,
  university: 'Test University',
};

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Contact Component', () => {
  it('renders section title', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    expect(screen.getByText(en.contact.sectionTitle)).toBeInTheDocument();
  });

  it('renders email link with correct href', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    const emailLink = screen.getByLabelText(
      en.contact.ariaLabels.email.replace('{{email}}', mockProfile.email),
    );
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', `mailto:${mockProfile.email}`);
  });

  it('renders GitHub link with correct href', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    const githubLink = screen.getByLabelText(
      en.contact.ariaLabels.github.replace('{{username}}', mockProfile.github),
    );
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', `https://github.com/${mockProfile.github}`);
  });

  it('GitHub link opens in new tab', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    const githubLink = screen.getByLabelText(
      en.contact.ariaLabels.github.replace('{{username}}', mockProfile.github),
    );
    expect(githubLink).toHaveAttribute('target', EXTERNAL_LINK_TARGET);
    expect(githubLink).toHaveAttribute('rel', EXTERNAL_LINK_REL);
  });

  it('email link does not open in new tab', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    const emailLink = screen.getByLabelText(
      en.contact.ariaLabels.email.replace('{{email}}', mockProfile.email),
    );
    expect(emailLink).not.toHaveAttribute('target', EXTERNAL_LINK_TARGET);
  });

  it('renders email and GitHub as visible text', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    expect(screen.getByText(mockProfile.email)).toBeInTheDocument();
    expect(screen.getByText(`github.com/${mockProfile.github}`)).toBeInTheDocument();
  });

  it('renders contact section with correct aria-label', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    expect(
      screen.getByLabelText(
        en.common.ariaLabels.section.replace('{{title}}', en.navigation.sections.contact),
      ),
    ).toBeInTheDocument();
  });

  it('renders all configured contact methods', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(EXPECTED_CONTACT_METHODS);
  });
});
