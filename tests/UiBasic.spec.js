const { test, expect } = require('@playwright/test');

test('Browser context Playwright', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    // css
    await page.locator("#username").fill("Viren");
    await page.locator("[type='password']").fill("Test@1234");    
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
});

/* This is for only run this test case */
// test.only('Page playwright test', async ({ page }) => {
//     await page.goto('https://www.google.com');
//     console.log(await page.title());
//     await expect(page).toHaveTitle("Google")
// });