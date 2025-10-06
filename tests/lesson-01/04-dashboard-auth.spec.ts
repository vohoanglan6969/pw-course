import {test, expect} from '@playwright/test'
import { LoginPage } from './poms/LoginPage'
import dashboarData from './04-dashboard-auth.data.json'
import { DashboardPage } from './poms/DashboardPage';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
const envName = process.env.ENV_NAME;
const data = (dashboarData as any)[envName!];
const validUserName = process.env.ACCOUNT!;
const validPassword = process.env.PASSWORD!;

test.beforeEach('Preconditon: Go to login page', async({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
})

test.describe('Login is successful', () => {

  test('DB_AUTH_001: Verify login successful with valid username and password',{
    annotation: {
      type: "DB_AUTH",
      description: "DB_AUTH_001"
    },
    tag: ["@DB_AUTH_001", "@DB_AUTH", "@UI", "@SMOKE"]
  },
    async ({ page }) => {

      await test.step('Step 1: Go to login page', async () => {
        const actualTitle = await loginPage.getPageTitle();
        expect(actualTitle).toEqual(data.login_title);
      });

      await test.step('Step 2: Enter username and password', async () => {
        await loginPage.login(validUserName, validPassword);
        dashboardPage = new DashboardPage(page);
        expect(await dashboardPage.getHeading()).toEqual(data.dashboard_heading);
      });

    }
  );

});

test.describe('Login failed', () => {

  test('DB_AUTH_002: Verify login failed with incorrect username and password', {
    annotation: {
      type: "DB_AUTH",
      description: "DB_AUTH_002"
    },
    tag: ["@DB_AUTH_002", "@DB_AUTH", "@UI"]
  },
    async ({ page }) => {

      await test.step('Step 1: Go to login page', async () => {
        const actualTitle = await loginPage.getPageTitle();
        expect(actualTitle).toEqual(data.login_title);
      });

      await test.step('Step 2: Enter username and password', async () => {
        await loginPage.login(data.invalid_username, validPassword);
        const expectedError = data.error_message.replace('${userName}', data.invalid_username);
        expect(await loginPage.getErrorMessage()).toEqual(expectedError);
      });

    }
  );

});
