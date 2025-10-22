import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductListPage extends BasePage {
    readonly addNewProductLink: Locator;

    constructor(page: Page) {
        super(page);
        this.addNewProductLink = page.getByRole("link", { name: /Add new product/i });
    }

    async navigateToProductListPage() {
        await this.openUrl(`${process.env.BASE_URL}wp-admin/edit.php?post_type=product`);
    }

    async clickOnNewProductLink() {
        await this.addNewProductLink.click();
    }

    private getProductPriceLocator(productName: string): Locator {
        return this.page.locator(
            `//a[normalize-space()='${productName}']/ancestor::td/following-sibling::td[@data-colname='Price']/span`
        );
    }

    async getRegularPriceByName(productName: string) {
        return await this.getProductPriceLocator(productName).nth(0).textContent();
    }

    async getSalePriceByName(productName: string) {
        return await this.getProductPriceLocator(productName).nth(1).textContent();
    }

    async isProductDisplayed(productName: string) {
        const productLocator = this.page.locator(`//strong/a[normalize-space()='${productName}']`).first();
        return await productLocator.isVisible();
    }

    private getTrashButtonLocator(productName: string): Locator {
        return this.page.locator(
            `//a[normalize-space()='${productName}']/parent::strong/following-sibling::div//span[contains(@class,'trash')]/a[contains(.,'Trash')]`
        ).first();
    }

    async deleteProductByName(productName: string) {
        const productLocator = this.page.locator(`//strong/a[normalize-space()='${productName}']`).first();
        await productLocator.hover();
        const trashButton = this.getTrashButtonLocator(productName);
        await trashButton.waitFor({ state: "visible" });
        await trashButton.click();
    }
}
