import { test, expect } from '@playwright/test';
import {
  E2E_MOBILE_VIEWPORT_WIDTH,
  E2E_MOBILE_VIEWPORT_HEIGHT,
  E2E_MIN_TOUCH_TARGET_PX,
  E2E_CONTACT_EMAIL_SELECTOR,
  E2E_PROJECTS_IMG_SELECTOR,
  E2E_PROJECTS_BUTTON_SELECTOR,
  E2E_SKILLS_LISTITEM_SELECTOR,
  E2E_SECTION_SKILLS,
  E2E_SECTION_PROJECTS,
  E2E_SECTION_CONTACT,
  SINGLE_ITEM_COUNT,
  E2E_DEFAULT_LANG_PATH,
  E2E_GALLERY_SCROLL,
  E2E_SCROLL,
} from '../src/config';
import { HtmlTag, AriaRole, KeyCode, TestErrorMessage } from '../src/types';
import { defaultLocale } from '../src/i18n/localeConfig';

test.use({ viewport: { width: E2E_MOBILE_VIEWPORT_WIDTH, height: E2E_MOBILE_VIEWPORT_HEIGHT } });

test.beforeEach(async ({ page }) => {
  await page.goto(E2E_DEFAULT_LANG_PATH);
});

test.describe('Mobile layout', () => {
  test('navigation is visible', async ({ page }) => {
    await expect(page.getByRole(AriaRole.Navigation)).toBeVisible();
  });

  test('brand logo text is hidden on mobile', async ({ page }) => {
    const navBrand = page.locator(HtmlTag.Nav).getByText(defaultLocale.profile.name);
    await expect(navBrand).toBeHidden();
  });

  test('skill grid renders on mobile', async ({ page }) => {
    await page.locator(E2E_SECTION_SKILLS).scrollIntoViewIfNeeded();
    await expect(page.locator(E2E_SKILLS_LISTITEM_SELECTOR).first()).toBeVisible();
  });

  test('project image gallery is horizontally scrollable', async ({ page }) => {
    await page.locator(E2E_SECTION_PROJECTS).scrollIntoViewIfNeeded();
    const { initial, scrolled } = await page.evaluate(
      ({
        minCount,
        imgSelector,
        imgTag,
        scrollPx,
      }): { initial: number | null; scrolled: number | null } => {
        const galleries = Array.from(document.querySelectorAll<HTMLImageElement>(imgSelector)).map(
          (img) => img.parentElement,
        );
        const multiGallery = galleries.find(
          (el): el is HTMLElement => el !== null && el.querySelectorAll(imgTag).length > minCount,
        );
        if (!multiGallery) {
          return { initial: null, scrolled: null };
        }
        const initial = multiGallery.scrollLeft;
        multiGallery.scrollLeft = scrollPx;
        return { initial, scrolled: multiGallery.scrollLeft };
      },
      {
        minCount: SINGLE_ITEM_COUNT,
        imgSelector: E2E_PROJECTS_IMG_SELECTOR,
        imgTag: HtmlTag.Img,
        scrollPx: E2E_GALLERY_SCROLL.PX,
      },
    );
    expect(initial).toBe(E2E_SCROLL.X);
    expect(scrolled).toBeGreaterThan(E2E_SCROLL.X);
  });

  test('modal is usable on mobile', async ({ page }) => {
    await page.locator(E2E_SECTION_PROJECTS).scrollIntoViewIfNeeded();
    await page.locator(E2E_PROJECTS_BUTTON_SELECTOR).first().click();
    await expect(page.getByRole(AriaRole.Dialog)).toBeVisible();
    await page.keyboard.press(KeyCode.Escape);
    await expect(page.getByRole(AriaRole.Dialog)).not.toBeVisible();
  });

  test('contact links are tappable', async ({ page }) => {
    await page.locator(E2E_SECTION_CONTACT).scrollIntoViewIfNeeded();
    const emailLink = page.locator(E2E_CONTACT_EMAIL_SELECTOR);
    await expect(emailLink).toBeVisible();
    const box = await emailLink.boundingBox();
    if (!box) {
      throw new Error(TestErrorMessage.EmailLinkNoBoundingBox);
    }
    expect(box.height).toBeGreaterThanOrEqual(E2E_MIN_TOUCH_TARGET_PX);
  });
});
