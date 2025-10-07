import {test as base} from "@playwright/test"
import { HomePage } from "../poms/HomePage"

type UserFixture = {
    homePage: HomePage;
}

export const test = base.extend<UserFixture>({
    homePage: async({page}, use) => {
        use(new HomePage(page));
    }
})

export { expect } from '@playwright/test';