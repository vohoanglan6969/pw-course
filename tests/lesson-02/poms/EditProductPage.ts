import {Page, Locator} from '@playwright/test'
import { BasePage } from './BasePage';

export class EditProductPage extends BasePage {
    readonly productNameLocator: Locator;
    readonly regularPriceLocator: Locator;
    readonly salePriceLocator: Locator;
    readonly updateButtonLocator: Locator;
    readonly moveToTrashButtonLocator: Locator;
    readonly successMessageLocator: Locator;

    constructor(page: Page){
        super(page);
        this.productNameLocator = page.locator("#title");
        this.regularPriceLocator = page.locator("#_regular_price");
        this.salePriceLocator = page.locator("#_sale_price");
        this.updateButtonLocator = page.locator("#publish");
        this.moveToTrashButtonLocator = page.getByRole('link', {name: /Move to Trash/});
        this.successMessageLocator = page.locator("//div[@id='message']/p").first();
    }

    async getSuccessMessage(){
        return await this.successMessageLocator.innerText();
    }

    async moveProductToTrash(){
        await this.moveToTrashButtonLocator.click();
    }
}