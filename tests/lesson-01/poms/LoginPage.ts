import {Page, Locator} from '@playwright/test'
import { BasePage } from './BasePage';

export class LoginPage extends BasePage{
    readonly userNameLocator: Locator;
    readonly passwordLocator: Locator;
    readonly loginButtonLocator: Locator;
    readonly errorMessageLocator: Locator;
    
    constructor(page: Page){
        super(page);
        this.userNameLocator = page.locator("#user_login");
        this.passwordLocator = page.locator("#user_pass");
        this.loginButtonLocator = page.locator("#wp-submit");
        this.errorMessageLocator = page.locator("//div[@id='login_error']/p");
    }

    async navigateToLoginPage(){
        await this.openUrl(process.env.ADMIN_URL!);
    }

    async login(userName: string, password: string){
        await this.userNameLocator.fill(userName);
        await this.passwordLocator.fill(password);
        await this.loginButtonLocator.click();
    }

    async getErrorMessage(){
        return await this.errorMessageLocator.textContent();
    }
}