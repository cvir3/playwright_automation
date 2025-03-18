const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObject/LoginPage');
const { DashboardPage } = require('../pageObject/DashboardPage');




test('@Client App login', async ({ page }) => {

    const username = "qaops@yopmail.com";
    const password = "Test@12345"
    const productName = 'ZARA COAT 3';
    const loginpage = new LoginPage(page);
    await loginpage.goTo();
    await loginpage.validLogin(username, password);
    const dashboardPage = new DashboardPage(page);
    await page.waitForTimeout(2000);
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
    await page.waitForLoadState('networkidle');
    const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

});