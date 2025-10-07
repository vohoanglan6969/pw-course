import {Page, Locator} from '@playwright/test'
import { BasePage } from './BasePage';
import { Product } from '../interfaces/product';

export class NewProductPage extends BasePage {
    readonly productNameLocator: Locator;
    readonly regularPriceLocator: Locator;
    readonly salePriceLocator: Locator;
    readonly publishButtonLocator: Locator;

    constructor(page: Page){
        super(page);
        this.productNameLocator = page.locator("#title");
        this.regularPriceLocator = page.locator("#_regular_price");
        this.salePriceLocator = page.locator("#_sale_price");
        this.publishButtonLocator = page.locator("#publish");
    }

    async navigateToNewProductPage(){
        await this.openUrl(`${process.env.BASE_URL}wp-admin/post-new.php?post_type=product`);
    }

    async selectCatalogVisibility(catalog: string){
        await this.page.locator("//div[@id='catalog-visibility']/a").click();
        await this.page.locator(`//input[@name="_visibility" and @data-label="${catalog}"]`).check();
        await this.page.locator("//div[@id='catalog-visibility-select']/p").getByRole('link', {name:/OK/i}).click();
    }

    async createNewProduct(product: Product){
        await this.productNameLocator.fill(product.productName);
        console.log(product.catalogVisibility);
        if(product.catalogVisibility){
            await this.selectCatalogVisibility(product.catalogVisibility);
        }
        await this.regularPriceLocator.fill(product.regularPrice.toString());
        await this.salePriceLocator.fill(product.salePrice.toString());
        await this.publishButtonLocator.click({force: true});
    }
}