// This file is a Page Object Manager file. This file is used to manage all the Page Objects in the project.
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { Page } from '@playwright/test';

const { monitorEventLoopDelay } = require('perf_hooks');


export class POManager {
    loginPage: LoginPage; // LoginPage is classname in the typeScript file.
    dashboardPage: DashboardPage;
    page: Page; // This is type and it is company from the playwright/test package.

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }
}
module.exports = { POManager }