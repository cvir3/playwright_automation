const { test, expect } = require('@playwright/test');

test('Browser context Playwright', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //Locators
    const userName = page.locator("#userEmail");
    const password = page.locator("[type='password']");
    const signIn =  page.locator("#login");
    const cardTitles = page.locator(".card-body h5 b");

    //URL
    await page.goto('https://rahulshettyacademy.com/client');
    console.log(await page.title());

    // css
    await userName.fill("qaops@yopmail.com");
    await password.fill("Test@12345");    
    await signIn.click();
    console.log(await cardTitles.first().textContent());    
    console.log(await cardTitles.nth(0).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    
});

