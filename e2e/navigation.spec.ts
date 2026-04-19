import { test, expect } from '@playwright/test';
import {
  E2E_SCROLL,
  E2E_SCROLL_WAIT_TIMEOUT_MS,
  E2E_VIEWPORT_RATIO,
  E2E_NAV_SCROLL_TEST_PREFIX,
  E2E_NAV_SCROLL_TEST_SUFFIX,
  REGEX_FLAG_CASE_INSENSITIVE,
  E2E_DEFAULT_LANG_PATH,
  E2E_SECTION_CONTACT,
} from '../src/config';
import { AriaRole } from '../src/types';
import { defaultLocale } from '../src/i18n/localeConfig';

test.beforeEach(async ({ page }) => {
  await page.goto(E2E_DEFAULT_LANG_PATH);
});

test.describe('Navigation bar', () => {
  test('hides when scrolling down and reappears when scrolling up', async ({ page }) => {
    const nav = page.getByRole(AriaRole.Navigation, {
      name: defaultLocale.navigation.ariaLabels.nav,
    });
    await page.evaluate(({ x, y }) => window.scrollTo(x, y), {
      x: E2E_SCROLL.X,
      y: E2E_SCROLL.DOWN_Y,
    });
    await expect(nav).not.toBeInViewport();
    await page.evaluate(({ x, y }) => window.scrollTo(x, y), {
      x: E2E_SCROLL.X,
      y: E2E_SCROLL.MID_Y,
    });
    await expect(nav).toBeInViewport();
  });

  test('scrolls to top when brand logo is clicked', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Brand logo is hidden on mobile viewports');
    await page.locator(E2E_SECTION_CONTACT).scrollIntoViewIfNeeded();
    await page.evaluate(({ x, y }) => window.scrollTo(x, y), {
      x: E2E_SCROLL.X,
      y: E2E_SCROLL.DOWN_Y,
    });
    const brandLabel = defaultLocale.navigation.ariaLabels.link.replace(
      '{{section}}',
      defaultLocale.navigation.sections.about,
    );
    const brandBtn = page.getByRole(AriaRole.Button, {
      name: new RegExp(brandLabel, REGEX_FLAG_CASE_INSENSITIVE),
    });
    await expect(brandBtn).toBeInViewport();
    // force: true — nav is position:fixed so Playwright's "scroll into view" step fires a
    // scroll event that re-triggers the nav hide/show transition, making the element unstable again
    await brandBtn.click({ force: true });
    await page.waitForFunction(
      (threshold) => window.scrollY < threshold,
      E2E_SCROLL.TOP_THRESHOLD,
      { timeout: E2E_SCROLL_WAIT_TIMEOUT_MS },
    );
  });

  for (const [section, hash] of Object.entries(defaultLocale.navigation.sections).map(
    ([key, label]): [string, string] => [label, `#${key}`],
  )) {
    test(`${E2E_NAV_SCROLL_TEST_PREFIX} ${section} ${E2E_NAV_SCROLL_TEST_SUFFIX}`, async ({
      page,
    }) => {
      await page
        .getByRole(AriaRole.MenuItem, { name: new RegExp(section, REGEX_FLAG_CASE_INSENSITIVE) })
        .click();
      await expect(page.locator(hash)).toBeInViewport({ ratio: E2E_VIEWPORT_RATIO });
    });
  }

  test('all nav links are visible and enabled', async ({ page }) => {
    const menuItems = page.getByRole(AriaRole.MenuItem);
    await expect(menuItems).toHaveCount(Object.keys(defaultLocale.navigation.sections).length);
    for (const item of await menuItems.all()) {
      await expect(item).toBeVisible();
      await expect(item).toBeEnabled();
    }
  });
});
