import { test, expect } from '@playwright/test';
import {
  STORYBOOK_INDEX_PATH,
  STORYBOOK_LOAD_STATE,
  STORYBOOK_IFRAME_PREFIX,
  STORYBOOK_IFRAME_SUFFIX,
  STORYBOOK_SNAPSHOT_EXT,
} from '../src/config';
import { Typeof } from '../src/types';

type Story = {
  id: string;
  title: string;
  name: string;
  type?: string;
};

type StoriesIndex = {
  entries: Record<string, Story>;
};

test('Visual regression — all stories', async ({ page, request }) => {
  const response = await request.get(STORYBOOK_INDEX_PATH);
  const index = (await response.json()) as StoriesIndex;
  const stories = Object.values(index.entries).filter((s) => s.type === Typeof.Story);

  for (const story of stories) {
    await test.step(`${story.title} / ${story.name}`, async () => {
      await page.goto(`${STORYBOOK_IFRAME_PREFIX}${story.id}${STORYBOOK_IFRAME_SUFFIX}`);
      await page.waitForLoadState(STORYBOOK_LOAD_STATE);
      await expect.soft(page).toHaveScreenshot(`${story.id}${STORYBOOK_SNAPSHOT_EXT}`);
    });
  }
});
