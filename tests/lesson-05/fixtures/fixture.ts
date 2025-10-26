import { test as base, expect } from '@playwright/test';
import { DataSource } from 'typeorm';
import { ProductAPI } from '../poms-api/product-api';
import { CategoryAPI } from '../poms-api/category-api';

type MyFixtures = {
  database: DataSource;
  productAPI: ProductAPI;
  categoryAPI: CategoryAPI;
};

export const test = base.extend<MyFixtures>({
  database: async ({}, use) => {
    const db = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    try {
      await db.initialize();
      await use(db);
    } catch (error) {
      console.error('Database initialization error:', error);
    } finally {
      await db.destroy();
    }
  },
  productAPI: async({request}, use) => {
    use(new ProductAPI(request));
  },
  categoryAPI: async({request}, use) => {
    use(new CategoryAPI(request));
  }
});

export { expect };
