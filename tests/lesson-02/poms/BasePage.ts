
import {Page} from '@playwright/test'

export class BasePage{
    public page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async openUrl(url: string){
        await this.page.goto(url);
    }

    async getPageTitle(){
        return await this.page.title();
    }
    
}