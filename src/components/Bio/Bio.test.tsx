import { screen, within } from '@testing-library/react';
import { Bio } from './Bio';
import { AriaRole, FetchPriority, HtmlAttr, TestErrorMessage } from '../../types';
import { defaultLocale } from '../../i18n/localeConfig';
import { FIRST_INDEX, BIO_SENTENCE_DELIMITER, REGEX_FLAG_CASE_INSENSITIVE } from '../../config';
import { renderWithTheme } from '../../test-utils';

const mockProfile = defaultLocale.profile;

describe('Bio Component', () => {
  it('renders profile name from translation', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    screen.getByText(mockProfile.name);
  });

  it('renders profile title from translation', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    screen.getByText(defaultLocale.profile.title);
  });

  it('renders bio sentences from translation', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    const firstSentence = defaultLocale.profile.bio.split(BIO_SENTENCE_DELIMITER)[FIRST_INDEX];
    if (!firstSentence) {
      throw new Error(TestErrorMessage.NoBioSentence);
    }
    screen.getByText(new RegExp(firstSentence, REGEX_FLAG_CASE_INSENSITIVE));
  });

  it('renders education from translation with graduationYear from prop', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    within(screen.getByLabelText(defaultLocale.bio.ariaLabels.education)).getByText(
      new RegExp(
        `${defaultLocale.profile.university}.*${mockProfile.graduationYear}`,
        REGEX_FLAG_CASE_INSENSITIVE,
      ),
    );
  });

  it('renders profile image with src and high fetch priority', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    const imageElement = screen.getByAltText(
      defaultLocale.bio.ariaLabels.image
        .replace('{{name}}', mockProfile.name)
        .replace('{{title}}', defaultLocale.profile.title),
    );
    expect(imageElement).toHaveAttribute(HtmlAttr.Src, mockProfile.image);
    expect(imageElement).toHaveAttribute(HtmlAttr.FetchPriority, FetchPriority.High);
  });

  it('renders about section with correct aria-label', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    screen.getByLabelText(
      defaultLocale.common.ariaLabels.section.replace(
        '{{title}}',
        defaultLocale.navigation.sections.about,
      ),
    );
  });

  it('renders biography article with correct aria-label', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    screen.getByRole(AriaRole.Article, { name: defaultLocale.bio.ariaLabels.biography });
  });
});
