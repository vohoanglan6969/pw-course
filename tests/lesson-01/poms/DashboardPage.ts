import {Page, Locator} from '@playwright/test'
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
    readonly headingLocator: Locator;
    constructor(page: Page){
        super(page);
        this.headingLocator = page.getByRole('heading', {name: "Dashboard"});
    }

    async getHeading(){
        return await this.headingLocator.textContent();
    }
}