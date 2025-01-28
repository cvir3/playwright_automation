const { test, expect } = require('@playwright/test');

test('Browser context Playwright', async ({ page }) => {
    
    await page.goto('https://rahulshettyacademy.com/client');

    // const context = await browser.newContext();
    // const page = await context.newPage();
    
    //Locators
    const userName = page.locator("#userEmail");
    const password = page.locator("[type='password']");
    const signIn =  page.locator("[value ='Login']");
    const cardTitles = page.locator(".card-body h5 b");

    //URL
    
    console.log(await page.title());

    // css
    await userName.fill("qaops@yopmail.com");
    await password.fill("Test@12345");    
    await signIn.click();
    //This is waitload
    await page.waitForLoadState('networkidle');
    /* if networkidle wait is not working we can use waitfor */
    //await page.locator(".card-body h5 b").last().waitFor();
    
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    
    console.log(await cardTitles.first().textContent());    
    console.log(await cardTitles.nth(4).textContent()) 
});