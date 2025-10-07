import { test, expect } from '@playwright/test';
import { LoginPage } from './poms/LoginPage';
import { NewProductPage } from './poms/NewProductPage';
import { EditProductPage } from './poms/EditProductPage';
import { ProductListPage } from './poms/ProductListPage';
import { HomePage } from './poms/HomePage';
import { Product } from './interfaces/product';
import productDataJs from './01-built-in-page.data.json';

test.describe('PRODUCT', () => {
  let loginPage: LoginPage;
  let newProductPage: NewProductPage;
  let editProductPage: EditProductPage;
  let homePage: HomePage;
  let productListPage: ProductListPage;

  const envName = process.env.ENV_NAME!;
  const userName = process.env.ACCOUNT!;
  const password = process.env.PASSWORD!;
  const productData = ((productDataJs as any)[envName!]?.data ?? {}) as Product;
  const expectedMessage = (productDataJs as any)[envName]?.message.successMessage;

  test.beforeEach('Pre-condition: Login to system', async ({ page }) => {
    loginPage = new LoginPage(page);
    newProductPage = new NewProductPage(page);
    editProductPage = new EditProductPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login(userName, password);
    await newProductPage.navigateToNewProductPage();
  });

  test(
    'PRODUCT_001: Verify that product is created successfully',
    { tag: ['@PRODUCT_001', '@PRODUCT'] },
    async ({ browser }) => {
      await test.step('Step 1: Enter product information', async () => {
        await newProductPage.createNewProduct(productData);
        const actualMessage = await editProductPage.getSuccessMessage();
        expect(actualMessage).toContain(expectedMessage.toString());
      });

      await test.step('Step 2: Verify that product is created successfully', async () => {
        const newPage = await browser.newPage();
        homePage = new HomePage(newPage);

        await homePage.navigateToHomePage();
        const { productName, regularPrice, salePrice } = productData;

        const isDisplayed = await homePage.isProductDisplayedWithoutPaging(productName);
        const { actualRegularPrice, actualSalePrice } = await homePage.getPrice(productName);

        expect.soft(isDisplayed).toBeTruthy();
        expect.soft(actualRegularPrice).toEqual(regularPrice);
        expect.soft(actualSalePrice).toEqual(salePrice);

        await newPage.close();
      });
    }
  );

  test.afterEach('Tear-down: Delete product', async ({ page }) => {
    productListPage = new ProductListPage(page);
    await productListPage.navigateToProductListPage();
    await productListPage.deleteProductByName(productData.productName);
  });
});
