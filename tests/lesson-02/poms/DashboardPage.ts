import {Page, Locator} from '@playwright/test'
import { BasePage } from './BasePage';
import { LeftMenuComponent } from './components/LeftMenuComponent';

export class DashboardPage extends BasePage {
    readonly headingLocator: Locator;
    private leftMenu: LeftMenuComponent;
    
    constructor(page: Page){
        super(page);
        this.headingLocator = page.getByRole('heading', {name: "Dashboard"});
        this.leftMenu = new LeftMenuComponent(page);
    }

    async getHeading(){
        return await this.headingLocator.textContent();
    }

    getLeftMenu(){
        return this.leftMenu;
    }
}