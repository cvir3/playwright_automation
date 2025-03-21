import { test, expect, Locator, Page } from '@playwright/test';
export class LoginPage {


    login: Locator;
    userName: Locator;
    password: Locator;
    signInButton: Locator;
    page: Page

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator("[value ='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username: string, password: string) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();

    }

}
module.exports = { LoginPage };
