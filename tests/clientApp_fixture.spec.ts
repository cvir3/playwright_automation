import { test, expect } from '@playwright/test';
import { POManager } from '../pageObject/POManager';
import { customTest } from '../utilis_TS/test-base';




customTest(`Client App login`, async ({ page, testDataForOrder }) => {

    const poManager = new POManager(page);
    const loginpage = poManager.getLoginPage();
    await loginpage.goTo();
    await loginpage.validLogin(testDataForOrder.username, testDataForOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await page.waitForTimeout(2000);
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();
    await page.waitForLoadState('networkidle');
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.waitForTimeout(2000);
    await page.locator("[placeholder*='Country']").pressSequentially("ind");//PreeSequentially is used to type the text in the input field.
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        console.log("Dropedown Option:", text)
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(testDataForOrder.username);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
});