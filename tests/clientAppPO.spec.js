const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObject/POManager');


test('@Client App login', async ({ page }) => {

    const poManager = new POManager(page);
    const username = "qaops@yopmail.com";
    const password = "Test@12345"
    const productName = 'ZARA COAT 3';
    const loginpage = poManager.getLoginPage();
    await loginpage.goTo();
    await loginpage.validLogin(username, password);
    const dashboardPage = poManager.getDashboardPage();
    await page.waitForTimeout(2000);
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
    await page.waitForLoadState('networkidle');
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").fill("ind");
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