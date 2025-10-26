import { test, expect } from './fixtures/fixture';
import { randomUUID } from 'crypto';

test.describe('API-Testing @LESSON5', () => {
  let categoryId: string;
  let productId: string;

  const categoryName = `Category-${randomUUID().slice(0, 8)}`;
  const productName = `Product-${randomUUID().slice(0, 8)}`;

  test.beforeAll('Setup: Create category and product', async ({ categoryAPI, productAPI, database }) => {
    const categoryData = {
      name: categoryName,
      description: 'Latest gadgets and electronics!',
    };
    const categoryResponse = await categoryAPI.create(categoryData);
    expect(categoryResponse?.category?.id).toBeTruthy();
    categoryId = categoryResponse.category.id;

    const resultsCategory = await database.query('SELECT * FROM category WHERE id = ?', [categoryId]);
    const categoryFromDB = resultsCategory[0];
    expect.soft(categoryFromDB.name).toEqual(categoryData.name);
    expect.soft(categoryFromDB.description).toEqual(categoryData.description);

    const productData = {
      name: productName,
      description: 'Latest Apple smartphone with advanced features',
      price: 29990000,
      quantity: 50,
      category_id: categoryId,
      is_active: true,
    };
    const productResponse = await productAPI.create(productData);
    expect(productResponse?.product?.id).toBeTruthy();
    productId = productResponse.product.id;

    const resultsProduct = await database.query('SELECT * FROM product WHERE id = ?', [productId]);
    const productFromDB = resultsProduct[0];
    expect.soft(productFromDB.name).toEqual(productData.name);
    expect.soft(productFromDB.description).toEqual(productData.description);
    expect.soft(Number(productFromDB.price)).toEqual(productData.price);
    expect.soft(productFromDB.quantity).toEqual(productData.quantity);
    expect.soft(productFromDB.category_id).toEqual(productData.category_id);
    expect.soft(productFromDB.is_active).toEqual(productData.is_active ? 1 : 0);
  });

  test.afterAll('Tear-down: Delete product and category', async ({ categoryAPI, productAPI, database }) => {
    const deleteProduct = await productAPI.delete(productId);
    expect(deleteProduct.result.message).toEqual('Product deleted successfully');

    const resultsProduct = await database.query('SELECT * FROM product WHERE id = ?', [productId]);
    expect(resultsProduct.length).toBe(0);

    const deleteCategory = await categoryAPI.delete(categoryId);
    expect(deleteCategory.result.message).toEqual('Category deleted successfully');

    const resultsCategory = await database.query('SELECT * FROM category WHERE id = ?', [categoryId]);
    expect(resultsCategory.length).toBe(0);
  });

  test('API-Update product', async ({ productAPI, database }) => {
    const productUpdateData = {
      id: productId,
      name: 'PWA102 product',
      price: 30000,
    };

    const jsonBody = await productAPI.update(productUpdateData);
    const newProductName = jsonBody.product.name;
    const newProductPrice = Number(jsonBody.product.price);

    expect.soft(newProductName).toEqual(productUpdateData.name);
    expect.soft(newProductPrice).toEqual(productUpdateData.price);

    const results = await database.query('SELECT * FROM product WHERE id = ?', [productId]);
    const productFromDB = results[0];
    expect.soft(productFromDB.name).toEqual(productUpdateData.name);
    expect.soft(Number(productFromDB.price)).toEqual(productUpdateData.price);
  });
});
