import { test, expect } from '@playwright/test';
import {
  E2E_REGEX_ANY_TEXT,
  E2E_FAVICON_PATTERN,
  E2E_ROUTE_RENDERS_AT,
  ROOT_PATH,
  E2E_DEFAULT_LANG_PATH,
  E2E_META_DESCRIPTION_SELECTOR,
  E2E_FAVICON_SELECTOR,
  UNSUPPORTED_LANG_CODE,
  TEST_LANG_FR,
} from '../src/config';
import { HtmlTag, HtmlAttr, AriaRole } from '../src/types';
import { DEFAULT_LANG, SUPPORTED_LANGS, defaultLocale, LOCALES } from '../src/i18n/localeConfig';

test.describe('Language routing', () => {
  test('redirects bare / to default lang by default', async ({ page }) => {
    await page.goto(ROOT_PATH);
    await expect(page).toHaveURL(new RegExp(`\\/${DEFAULT_LANG}`));
  });

  for (const lang of SUPPORTED_LANGS) {
    test(`${E2E_ROUTE_RENDERS_AT} ${ROOT_PATH}${lang}`, async ({ page }) => {
      await page.goto(`${ROOT_PATH}${lang}`);
      await expect(page).toHaveURL(`${ROOT_PATH}${lang}`);
      await expect(page.getByRole(AriaRole.Navigation)).toBeVisible();
    });
  }

  test('redirects unsupported language to default lang', async ({ page }) => {
    await page.goto(`${ROOT_PATH}${UNSUPPORTED_LANG_CODE}`);
    await expect(page).toHaveURL(new RegExp(`\\/${DEFAULT_LANG}`));
  });

  test('page has correct lang attribute for each locale', async ({ page }) => {
    for (const lang of SUPPORTED_LANGS) {
      await page.goto(`${ROOT_PATH}${lang}`);
      await expect(page.locator(HtmlTag.Html)).toHaveAttribute(HtmlAttr.Lang, lang);
    }
  });
});

test.describe('i18n content', () => {
  test('switching language renders translated content', async ({ page }) => {
    await page.goto(`${ROOT_PATH}${TEST_LANG_FR}`);
    await expect(page.getByText(LOCALES[TEST_LANG_FR].skills.sectionTitle)).toBeVisible();
    await expect(page.getByText(defaultLocale.skills.sectionTitle)).not.toBeVisible();
  });
});

test.describe('SEO', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(E2E_DEFAULT_LANG_PATH);
  });

  test('page title is set', async ({ page }) => {
    await expect(page).toHaveTitle(new RegExp(defaultLocale.profile.name));
  });

  test('meta description is set', async ({ page }) => {
    await expect(page.locator(E2E_META_DESCRIPTION_SELECTOR)).toHaveAttribute(
      HtmlAttr.Content,
      E2E_REGEX_ANY_TEXT,
    );
  });

  test('favicon is linked', async ({ page }) => {
    await expect(page.locator(E2E_FAVICON_SELECTOR)).toHaveAttribute(
      HtmlAttr.Href,
      E2E_FAVICON_PATTERN,
    );
  });
});
