import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    readonly headingLocator: Locator;
    
    constructor(page: Page){
        super(page);
        this.headingLocator = page.locator("//p[@class='site-title']/a");
    }

    async getPageHeading(){
        return this.headingLocator.textContent();
    }

    async getProductCount(){
        let quantity = 0;
        const productLocator = this.page.locator('//ul/li/a/h2');
        const nextPageButtonLocator = this.page.locator("//a[contains(text(),'→')]");
        while(true){
            quantity = quantity + await productLocator.count();
            if(!await nextPageButtonLocator.isVisible()){
                break;
            }
            await nextPageButtonLocator.click();
            await this.page.waitForLoadState('domcontentloaded');
        }
        return quantity;
    }

}