import { test, expect } from '@playwright/test';
import { HomePage } from './poms/HomePage';
import homePageData from './03-home.data.json';

test.describe('Verify home page', () => {
  let homePage: HomePage;
  const envName = process.env.ENV_NAME!;
  const data = (homePageData as any)[envName];

  test.beforeEach(async ({ page }) => {
    await test.step('Precondition: Go to home page', async () => {
      homePage = new HomePage(page);
      await homePage.openUrl(process.env.BASE_URL!);
    });
  });

  test(
    'HOME_001: Verify the home page displays correctly',
    { tag: ['@ui'] },
    async ({ page }) => {
      await test.step('Step 1: Verify page title', async () => {
        const actualPageTitle = await homePage.getPageTitle();
        expect(actualPageTitle).toEqual(data.title);
      });

      await test.step('Step 2: Verify page heading', async () => {
        const actualPageHeading = await homePage.getPageHeading();
        expect(actualPageHeading).toEqual(data.heading);
      });

      await test.step('Step 3: Verify product quantity', async () => {
        const actualProductCount = await homePage.getProductCount();
        expect(actualProductCount).toEqual(data.productCount);
      });
    }
  );
});
