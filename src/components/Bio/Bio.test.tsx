import { render, screen, within } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Bio } from './Bio';
import { theme } from '../../styles/theme';
import type { Profile } from '../../types';
import en from '../../i18n/locales/en.json';
import type React from 'react';

const mockProfile: Profile = {
  name: 'Mark Drohan',
  title: 'Software Engineer',
  bio: en.profile.bio,
  image: 'test.jpg',
  email: 'test@example.com',
  github: 'testuser',
  graduationYear: 2027,
  university: 'University of Limerick',
};

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
    expect(screen.getByText(en.profile.title)).toBeInTheDocument();
  });

  it('renders bio sentences from translation', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    const firstSentence = en.profile.bio.split('. ')[0];
    expect(firstSentence).toBeDefined();
    expect(screen.getByText(new RegExp(firstSentence ?? '', 'i'))).toBeInTheDocument();
  });

  it('renders education from translation with graduationYear from prop', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    expect(
      within(screen.getByLabelText(en.bio.ariaLabels.education)).getByText(
        new RegExp(`${en.profile.university}.*${mockProfile.graduationYear}`, 'i'),
      ),
    ).toBeInTheDocument();
  });

  it('renders profile image with src from prop', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    const imageElement = screen.getByAltText(
      en.bio.ariaLabels.image
        .replace('{{name}}', mockProfile.name)
        .replace('{{title}}', en.profile.title),
    );
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockProfile.image);
  });

  it('renders profile image with high fetch priority for LCP', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    const imageElement = screen.getByAltText(
      en.bio.ariaLabels.image
        .replace('{{name}}', mockProfile.name)
        .replace('{{title}}', en.profile.title),
    );
    expect(imageElement).toHaveAttribute('fetchpriority', 'high');
  });

  it('renders about section with correct aria-label', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    expect(
      screen.getByLabelText(
        en.common.ariaLabels.section.replace('{{title}}', en.navigation.sections.about),
      ),
    ).toBeInTheDocument();
  });

  it('renders biography article with correct aria-label', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    expect(screen.getByRole('article', { name: en.bio.ariaLabels.biography })).toBeInTheDocument();
  });
});
