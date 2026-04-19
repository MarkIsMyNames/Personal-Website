import { test, expect } from '@playwright/test';
import {
  E2E_REGEX_ANY_TEXT,
  E2E_NOOPENER_PATTERN,
  E2E_ARIA_HIDDEN_TRUE,
  E2E_PROJECTS_BUTTON_SELECTOR,
  E2E_DEFAULT_LANG_PATH,
  E2E_INTERACTIVE_SELECTORS,
  E2E_SELECTOR_EXTERNAL_LINK,
  E2E_SECTION_PROJECTS,
  E2E_SKILLS_SVG_SELECTOR,
} from '../src/config';
import { HtmlTag, HtmlAttr, AriaRole } from '../src/types';
import { defaultLocale } from '../src/i18n/localeConfig';

test.beforeEach(async ({ page }) => {
  await page.goto(E2E_DEFAULT_LANG_PATH);
});

test.describe('Accessibility', () => {
  test('all images have alt text', async ({ page }) => {
    for (const img of await page.locator(HtmlTag.Img).all()) {
      await expect(img).toHaveAttribute(HtmlAttr.Alt);
    }
  });

  test('all interactive elements are keyboard focusable', async ({ page }) => {
    for (const selector of E2E_INTERACTIVE_SELECTORS) {
      for (const element of await page.locator(selector).all()) {
        await expect(element).toBeEnabled();
      }
    }
  });

  test('navigation has correct aria-label', async ({ page }) => {
    await expect(
      page.getByRole(AriaRole.Navigation, { name: defaultLocale.navigation.ariaLabels.nav }),
    ).toBeVisible();
  });

  test('all sections have aria-labels', async ({ page }) => {
    const sectionTemplate = defaultLocale.common.ariaLabels.section;
    for (const title of Object.values(defaultLocale.navigation.sections)) {
      const label = sectionTemplate.replace('{{title}}', title);
      await expect(page.getByLabel(label).first()).toBeVisible();
    }
  });

  test('external links open in new tab with noopener', async ({ page }) => {
    const externalLinks = page.locator(E2E_SELECTOR_EXTERNAL_LINK);
    for (const link of await externalLinks.all()) {
      await expect(link).toHaveAttribute(HtmlAttr.Rel, E2E_NOOPENER_PATTERN);
    }
  });

  test('modal has aria-modal attribute when open', async ({ page }) => {
    await page.locator(E2E_SECTION_PROJECTS).scrollIntoViewIfNeeded();
    await page.locator(E2E_PROJECTS_BUTTON_SELECTOR).first().click();
    const dialog = page.getByRole(AriaRole.Dialog);
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute(HtmlAttr.AriaModal);
    await expect(dialog).toHaveAttribute(HtmlAttr.AriaLabel, E2E_REGEX_ANY_TEXT);
  });

  test('skill icons are hidden from screen readers', async ({ page }) => {
    const skillIcons = page.locator(E2E_SKILLS_SVG_SELECTOR);
    for (const icon of await skillIcons.all()) {
      await expect(icon).toHaveAttribute(HtmlAttr.AriaHidden, E2E_ARIA_HIDDEN_TRUE);
    }
  });
});
