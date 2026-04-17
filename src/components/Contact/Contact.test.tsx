import { screen } from '@testing-library/react';
import { Contact } from './Contact';
import { AriaRole, HtmlAttr, ContactMethods } from '../../types';
import { defaultLocale } from '../../i18n/localeConfig';
import {
  EXTERNAL_LINK_REL,
  EXTERNAL_LINK_TARGET,
  GITHUB_BASE_URL,
  MAILTO_PREFIX,
} from '../../config';
import { renderWithTheme } from '../../test-utils';

const mockProfile = defaultLocale.profile;

describe('Contact Component', () => {
  it('renders section title', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    screen.getByText(defaultLocale.contact.sectionTitle);
  });

  it('renders email link with correct href', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    const emailLink = screen.getByLabelText(
      defaultLocale.contact.ariaLabels.email.replace('{{email}}', mockProfile.email),
    );
    expect(emailLink).toHaveAttribute(HtmlAttr.Href, `${MAILTO_PREFIX}${mockProfile.email}`);
    expect(emailLink).not.toHaveAttribute(HtmlAttr.Target, EXTERNAL_LINK_TARGET);
  });

  it('renders GitHub link with correct href and opens in new tab', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    const githubLink = screen.getByLabelText(
      defaultLocale.contact.ariaLabels.github.replace('{{username}}', mockProfile.github),
    );
    expect(githubLink).toHaveAttribute(HtmlAttr.Href, `${GITHUB_BASE_URL}${mockProfile.github}`);
    expect(githubLink).toHaveAttribute(HtmlAttr.Target, EXTERNAL_LINK_TARGET);
    expect(githubLink).toHaveAttribute(HtmlAttr.Rel, EXTERNAL_LINK_REL);
  });

  it('renders email and GitHub as visible text', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    screen.getByText(mockProfile.email);
    screen.getByText(defaultLocale.contact.githubUrl.replace('{{username}}', mockProfile.github));
  });

  it('renders contact section with correct aria-label', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    screen.getByLabelText(
      defaultLocale.common.ariaLabels.section.replace(
        '{{title}}',
        defaultLocale.navigation.sections.contact,
      ),
    );
  });

  it('renders all configured contact methods', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    expect(screen.getAllByRole(AriaRole.ListItem)).toHaveLength(ContactMethods.length);
  });
});
