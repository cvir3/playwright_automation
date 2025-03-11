const { test, expect } = require('@playwright/test');


test('Capture Screenshots', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({ path: 'screenshot/ElementScreenshot.png' });
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: 'screenshot/FullPageScreenshot.png' });
    await expect(page.locator("#displayed-text")).toBeHidden();
});