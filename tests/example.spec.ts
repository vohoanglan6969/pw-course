import { test, expect } from '@playwright/test';

test('TC01: Verify has title', async ({ page }) => {

  await test.step('Step 1: Go to page', async () => {
    await page.goto('https://material.playwrightvn.com/');
  });

  await test.step('Step 2: Verify page title', async () => {
    await expect(page).toHaveTitle(/Tài liệu học automation test/);
  });

});

test('TC02: Verify has started link', async ({ page }) => {

  await test.step('Step 1: Go to page', async () => {
    await page.goto('https://material.playwrightvn.com/');
  });

  await test.step('Step 2: Click on link', async () => {
    await page.getByRole('link', { name: 'Bài học 1: Register Page (có đủ các element)' }).click();
  });

  await test.step('Step 3: Verify page heading', async () => {
    await expect(page.getByRole('heading', { name: 'User Registration' })).toBeVisible();
  });
  
});

