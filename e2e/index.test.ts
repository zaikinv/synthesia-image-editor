import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Image Gallery and Editor Tests', () => {
  test('Should load image gallery with pagination', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await expect(page).toHaveURL(/.*gallery/);

    const galleryItems = page.locator('.item');

    await expect(galleryItems).toHaveCount(12);

    // check pagination
    const paginationControls = page.locator('.paginator');
    await expect(paginationControls).toBeVisible();

    // check image and name
    const firstItem = galleryItems.nth(0);
    await expect(firstItem.locator('img')).toBeVisible();
    await expect(firstItem.locator('.item-meta__value')).toHaveText(/.+/);
  });

  test('Should navigate to edit page and load image editor', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/gallery');
    const firstItem = page.locator('.item').nth(0);

    await firstItem.click();
    await expect(page).toHaveURL(/.*edit/);

    // check that preview is loaded
    const imagePreview = page.locator('.preview');
    await expect(imagePreview).toBeVisible();

    await expect(page.locator('input[id="width"]')).toBeVisible();
    await expect(page.locator('input[id="height"]')).toBeVisible();
    await expect(page.locator('input[id="grayscale"]')).toBeVisible();
    await expect(page.locator('input[id="blur"]')).toBeVisible();
  });

  test('Should edit image and update preview', async ({ page }) => {
    await page.goto('http://localhost:5173/edit/1');

    await page.fill('input[id="width"]', '400');
    await page.fill('input[id="height"]', '300');
    await page.check('input[id="grayscale"]');
    await page.fill('input[id="blur"]', '5');

    const imagePreview = page.locator('.preview img');
    await expect(imagePreview).toHaveAttribute(
      'style',
      'width: 400px; height: 300px; filter: grayscale(1) blur(5px); object-fit: cover;',
    );
  });

  test('Should download edited image', async ({ page }) => {
    const downloadPath = path.resolve(process.cwd(), 'downloads');

    await page.goto('http://localhost:5173/edit/1');

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('.download__button'),
    ]);

    const filePath = path.join(downloadPath, download.suggestedFilename());
    await download.saveAs(filePath);

    const fileExists = await download.path();
    expect(fileExists).toBeTruthy();
  });

  test('Should persist state after page refresh', async ({ page }) => {
    await page.goto('http://localhost:5173/edit/1');

    await page.fill('input[id="blur"]', '5');
    await page.fill('input[id="width"]', '400');
    await page.fill('input[id="height"]', '300');
    await page.check('input[id="grayscale"]');

    await page.reload();

    // check that the edits persist
    await expect(page.locator('input[id="blur"]')).toHaveValue('5');
    await expect(page.locator('input[id="width"]')).toHaveValue('400');
    await expect(page.locator('input[id="height"]')).toHaveValue('300');
    await expect(page.locator('input[id="grayscale"]')).toBeChecked();
    await expect(page.locator('input[id="blur"]')).toHaveValue('5');

    const imagePreview = page.locator('.preview img');
    await expect(imagePreview).toHaveAttribute(
      'style',
      'width: 400px; height: 300px; filter: grayscale(1) blur(5px); object-fit: cover;',
    );
  });

  test('Should remember history and state', async ({ page }) => {
    await page.goto('http://localhost:5173/gallery');

    await page.locator('.item').nth(0).click();
    await expect(page).toHaveURL(/.*edit/);

    await page.goBack();
    await expect(page).toHaveURL(/.*gallery/);

    const galleryItems = page.locator('.item');
    await expect(galleryItems).toHaveCount(12);
  });
});
