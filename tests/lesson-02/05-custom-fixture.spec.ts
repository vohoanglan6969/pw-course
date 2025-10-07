import { test, expect } from './fixtures/all-fixtures';
import { Product } from './interfaces/product';
import productDataJs from './05-custom-fixture.data.json';

test.describe('PRODUCT', () => {
  const envName = process.env.ENV_NAME!;
  const productData = ((productDataJs as any)[envName!]?.data ?? {}) as Product;
  const expectedMessage = (productDataJs as any)[envName]?.message.successMessage;

  test(
    'PRODUCT_001: Verify that product is created successfully',
    {
      annotation: [{ type: "PRODUCT", description: "PRODUCT_001" }],
      tag: ["@PRODUCT_001", "@PRODUCT"],
    },
    async ({ loginPage, newProductPage, editProductPage, homePage }) => {
      test.setTimeout(60_000);

      await test.step('Step 1: Enter product information', async () => {
        await newProductPage.navigateToNewProductPage();
        await newProductPage.createNewProduct(productData);

        const actualMessage = await editProductPage.getSuccessMessage();
        expect(actualMessage).toContain(expectedMessage.toString());
      });

      await test.step('Step 2: Verify that product is created successfully', async () => {
        await homePage.navigateToHomePage();

        const isDisplayedAtHome = await homePage.isProductDisplayedWithPaging(productData.productName);
        expect.soft(isDisplayedAtHome).toBeFalsy();
      });
    }
  );

  test.afterEach('Tear-down: Delete product', async ({ productListPage }) => {
    await productListPage.navigateToProductListPage();
    await productListPage.deleteProductByName(productData.productName);
  });
});
