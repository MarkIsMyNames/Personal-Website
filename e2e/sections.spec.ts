import { test, expect } from '@playwright/test';
import {
  E2E_ABOUT_IMG_SELECTOR,
  E2E_PROJECTS_IMG_SELECTOR,
  E2E_CONTACT_EMAIL_SELECTOR,
  E2E_CONTACT_GITHUB_SELECTOR,
  MAILTO_PREFIX,
  GITHUB_BASE_URL,
  E2E_DEFAULT_LANG_PATH,
  E2E_SECTION_ABOUT,
  E2E_SECTION_PROJECTS,
  E2E_SECTION_CONTACT,
  E2E_SKILLS_LISTITEM_SELECTOR,
} from '../src/config';
import { HtmlAttr, HtmlTag, LinkRel, LinkTarget } from '../src/types';
import { defaultLocale } from '../src/i18n/localeConfig';

test.beforeEach(async ({ page }) => {
  await page.goto(E2E_DEFAULT_LANG_PATH);
});

test.describe('Bio / About section', () => {
  test('renders profile image, name, and education', async ({ page }) => {
    const img = page.locator(E2E_ABOUT_IMG_SELECTOR).first();
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute(HtmlAttr.Src, new RegExp(defaultLocale.profile.image));
    await expect(page.locator(E2E_SECTION_ABOUT)).toContainText(defaultLocale.profile.name);
    await expect(page.locator(E2E_SECTION_ABOUT)).toContainText(defaultLocale.profile.university);
  });
});

test.describe('Skills section', () => {
  test('renders correct number of skill cards each with an icon', async ({ page }) => {
    await expect(page.getByText(defaultLocale.skills.sectionTitle)).toBeVisible();
    const cards = page.locator(E2E_SKILLS_LISTITEM_SELECTOR);
    await expect(cards).toHaveCount(defaultLocale.skillsData.length);
    await expect(cards.first().locator(HtmlTag.Svg)).toBeVisible();
  });
});

test.describe('Projects section', () => {
  test('renders section title, all project titles, and images', async ({ page }) => {
    await expect(page.getByText(defaultLocale.projects.sectionTitle)).toBeVisible();
    for (const { title } of defaultLocale.projectsData) {
      await expect(page.locator(E2E_SECTION_PROJECTS).getByText(title).first()).toBeVisible();
    }
    await expect(page.locator(E2E_PROJECTS_IMG_SELECTOR).first()).toBeVisible();
  });
});

test.describe('Contact section', () => {
  test('renders email and GitHub links', async ({ page }) => {
    await page.locator(E2E_SECTION_CONTACT).scrollIntoViewIfNeeded();

    const emailLink = page.locator(E2E_CONTACT_EMAIL_SELECTOR);
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute(
      HtmlAttr.Href,
      `${MAILTO_PREFIX}${defaultLocale.profile.email}`,
    );

    const githubLink = page.locator(E2E_CONTACT_GITHUB_SELECTOR);
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute(
      HtmlAttr.Href,
      `${GITHUB_BASE_URL}${defaultLocale.profile.github}`,
    );
    await expect(githubLink).toHaveAttribute(HtmlAttr.Target, LinkTarget.Blank);
    await expect(githubLink).toHaveAttribute(HtmlAttr.Rel, LinkRel.NoopenerNoreferrer);
  });
});
