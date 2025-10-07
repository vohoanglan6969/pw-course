import {test as base} from "@playwright/test"
import { LoginPage } from "../poms/LoginPage"
import { NewProductPage } from "../poms/NewProductPage";
import { EditProductPage } from "../poms/EditProductPage";
import { ProductListPage } from "../poms/ProductListPage";

type AdminFixture = {
    loginPage: LoginPage;
    newProductPage: NewProductPage;
    editProductPage: EditProductPage;
    productListPage: ProductListPage;
}

export const test = base.extend<AdminFixture>({
    loginPage: async({page}, use) => {
        const loginPage = new LoginPage(page); 
        const userName = process.env.ACCOUNT!;
        const password = process.env.PASSWORD!;
        await loginPage.navigateToLoginPage();
        await loginPage.login(userName, password);
        await use(loginPage);
    },
    newProductPage: async({page}, use) => {
        await use(new NewProductPage(page));
    },
    editProductPage: async({page}, use) => {
        await use(new EditProductPage(page));
    },
     productListPage: async({page}, use) => {
        await use(new ProductListPage(page));
    },

})

export { expect } from '@playwright/test';

