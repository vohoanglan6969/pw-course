import {Page, Locator} from '@playwright/test'
import { BasePage } from '../BasePage';

export class LeftMenuComponent extends BasePage {

    constructor(page: Page){
        super(page);
    }

    async slectMenuByName(menuName: string){
        await this.page.locator(`//ul/li/*/div[contains(normalize-space(),'${menuName}')]`).click();
    }

}