const { test, expect } = require("@playwright/test");

test("Popup Validation", async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com');
    // await page.goBack();
    // await page.evaluate(() => window.scrollBy(0,100));
    // await expect(page.locator("#displayed-text")).toBeVisible();
    // await page.locator("#hide-textbox").click();
    // await expect(page.locator("#displayed-text")).toBeHidden();

    await page.locator("#confirmbtn").click();

    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    // await page.pause();
    const textCheck = await framesPage.locator(".text h2").textContent();
    textCheck.split(" ")[1];
    console.log(textCheck.split(" ")[1]);

});