import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    readonly headingLocator: Locator;
    
    constructor(page: Page){
        super(page);
        this.headingLocator = page.locator("//p[@class='site-title']/a");
    }

    async navigateToHomePage(){
        await this.openUrl(process.env.BASE_URL!);
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

    async isProductDisplayedWithoutPaging(productName: string){
        const productLocator = this.page.locator(`//ul/li/a/h2[normalize-space()='${productName}']`);
        return await productLocator.isVisible();
    }

    async isProductDisplayedWithPaging(productName: string){
        let isDisplayed = false;
        const productLocator = this.page.locator(`//ul/li/a/h2[normalize-space()='${productName}']`);
        const nextPageButtonLocator = this.page.locator("//a[contains(text(),'→')]");
        while(true){
            isDisplayed = await productLocator.isVisible();
            if(!await nextPageButtonLocator.isVisible()){
                break;
            }
            await nextPageButtonLocator.click();
            await this.page.waitForLoadState('domcontentloaded');
        }
        return isDisplayed;
    }

    async getPrice(productName: string) {
        const priceLocator = this.page.locator(
            `//ul/li/a/h2[normalize-space()='${productName}']/following-sibling::span/span`
        );
        const extractPrice = async (index: number) => {
            const text = await priceLocator.nth(index).textContent();
            return Number((text?.match(/\d+(\.\d+)?/) || [0])[0]);
        };
        return {
            actualRegularPrice: await extractPrice(0),
            actualSalePrice: await extractPrice(1)
        };
    }

}