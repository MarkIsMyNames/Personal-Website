import { test, expect, type Page } from '@playwright/test';
import {
  E2E_PROJECTS_BUTTON_SELECTOR,
  E2E_PROJECTS_LISTITEM_SELECTOR,
  E2E_LISTITEM_BUTTON_SELECTOR,
  E2E_LISTITEM_BUTTON_NTH_SELECTOR,
  E2E_DEFAULT_LANG_PATH,
  E2E_SECTION_PROJECTS,
  REGEX_FLAG_CASE_INSENSITIVE,
  E2E_MODAL_OUTSIDE_CLICK_X,
  E2E_MODAL_OUTSIDE_CLICK_Y,
  E2E_SWIPE_START_X,
  E2E_SWIPE_END_X,
  E2E_SWIPE_Y,
} from '../src/config';
import { OverflowValue, HtmlTag, HtmlAttr, AriaRole, KeyCode } from '../src/types';
import { defaultLocale } from '../src/i18n/localeConfig';

test.beforeEach(async ({ page }) => {
  await page.goto(E2E_DEFAULT_LANG_PATH);
  await page.locator(E2E_SECTION_PROJECTS).scrollIntoViewIfNeeded();
});

const openModal = async (page: Page) => {
  await page.locator(E2E_PROJECTS_BUTTON_SELECTOR).first().click();
  await expect(page.getByRole(AriaRole.Dialog)).toBeVisible();
};

const openMultiImageModal = async (page: Page) => {
  const multiImageProject = page
    .locator(E2E_PROJECTS_LISTITEM_SELECTOR)
    .filter({ has: page.locator(E2E_LISTITEM_BUTTON_NTH_SELECTOR) })
    .first();
  await multiImageProject.locator(E2E_LISTITEM_BUTTON_SELECTOR).first().click();
  await expect(page.getByRole(AriaRole.Dialog)).toBeVisible();
};

const getModalImageAlt = async (page: Page) =>
  page.getByRole(AriaRole.Dialog).locator(HtmlTag.Img).getAttribute(HtmlAttr.Alt);

test.describe('Image modal', () => {
  test('closes when close button is clicked', async ({ page }) => {
    await openModal(page);
    await page.getByLabel(defaultLocale.imageModal.ariaLabels.close).click();
    await expect(page.getByRole(AriaRole.Dialog)).not.toBeVisible();
  });

  test('closes when Escape key is pressed', async ({ page }) => {
    await openModal(page);
    await page.keyboard.press(KeyCode.Escape);
    await expect(page.getByRole(AriaRole.Dialog)).not.toBeVisible();
  });

  test('closes when clicking outside the image', async ({ page }) => {
    await openModal(page);
    await page
      .getByRole(AriaRole.Dialog)
      .click({ position: { x: E2E_MODAL_OUTSIDE_CLICK_X, y: E2E_MODAL_OUTSIDE_CLICK_Y } });
    await expect(page.getByRole(AriaRole.Dialog)).not.toBeVisible();
  });

  test('navigates to next image with next button', async ({ page }) => {
    await openMultiImageModal(page);
    const firstAlt = await getModalImageAlt(page);
    await page
      .getByLabel(new RegExp(defaultLocale.imageModal.ariaLabels.next, REGEX_FLAG_CASE_INSENSITIVE))
      .click();
    const secondAlt = await getModalImageAlt(page);
    expect(secondAlt).not.toBe(firstAlt);
  });

  test('navigates to previous image with previous button', async ({ page }) => {
    await openMultiImageModal(page);
    const firstAlt = await getModalImageAlt(page);
    await page
      .getByLabel(new RegExp(defaultLocale.imageModal.ariaLabels.next, REGEX_FLAG_CASE_INSENSITIVE))
      .click();
    expect(await getModalImageAlt(page)).not.toBe(firstAlt);
    await page
      .getByLabel(
        new RegExp(defaultLocale.imageModal.ariaLabels.previous, REGEX_FLAG_CASE_INSENSITIVE),
      )
      .click();
    expect(await getModalImageAlt(page)).toBe(firstAlt);
  });

  test('navigates with arrow keys', async ({ page }) => {
    await openMultiImageModal(page);
    const firstAlt = await getModalImageAlt(page);
    await page.keyboard.press(KeyCode.ArrowRight);
    expect(await getModalImageAlt(page)).not.toBe(firstAlt);
    await page.keyboard.press(KeyCode.ArrowLeft);
    expect(await getModalImageAlt(page)).toBe(firstAlt);
  });

  test('navigates with swipe gesture', async ({ page }) => {
    await openMultiImageModal(page);
    const firstAlt = await getModalImageAlt(page);
    await page.mouse.move(E2E_SWIPE_START_X, E2E_SWIPE_Y);
    await page.mouse.down();
    await page.mouse.move(E2E_SWIPE_END_X, E2E_SWIPE_Y);
    await page.mouse.up();
    expect(await getModalImageAlt(page)).not.toBe(firstAlt);
  });

  test('single-image project has no prev/next buttons', async ({ page }) => {
    const singleImageProject = page
      .locator(E2E_PROJECTS_LISTITEM_SELECTOR)
      .filter({ hasNot: page.locator(E2E_LISTITEM_BUTTON_NTH_SELECTOR) })
      .first();
    await singleImageProject.locator(E2E_LISTITEM_BUTTON_SELECTOR).first().click();
    await expect(page.getByRole(AriaRole.Dialog)).toBeVisible();
    await expect(
      page.getByLabel(
        new RegExp(defaultLocale.imageModal.ariaLabels.next, REGEX_FLAG_CASE_INSENSITIVE),
      ),
    ).not.toBeVisible();
    await expect(
      page.getByLabel(
        new RegExp(defaultLocale.imageModal.ariaLabels.previous, REGEX_FLAG_CASE_INSENSITIVE),
      ),
    ).not.toBeVisible();
  });

  test('locks body scroll when open', async ({ page }) => {
    await openModal(page);
    expect(await page.evaluate(() => document.body.style.overflow)).toBe(OverflowValue.Locked);
  });

  test('restores body scroll when closed', async ({ page }) => {
    await openModal(page);
    await page.keyboard.press(KeyCode.Escape);
    await expect(page.getByRole(AriaRole.Dialog)).not.toBeVisible();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe(OverflowValue.Restored);
  });

  test('is keyboard accessible — opens with Enter key', async ({ page }) => {
    await page.locator(E2E_PROJECTS_BUTTON_SELECTOR).first().focus();
    await page.keyboard.press(KeyCode.Enter);
    await expect(page.getByRole(AriaRole.Dialog)).toBeVisible();
  });

  test('is keyboard accessible — opens with Space key', async ({ page }) => {
    await page.locator(E2E_PROJECTS_BUTTON_SELECTOR).first().focus();
    await page.keyboard.press(KeyCode.Space);
    await expect(page.getByRole(AriaRole.Dialog)).toBeVisible();
  });
});
