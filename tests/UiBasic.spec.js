const { test, expect } = require('@playwright/test');

test('Browser context Playwright', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //Locators
    const userName = page.locator("#userEmail");
    const password = page.locator("[type='password']");
    const signIn =  page.locator("[value ='Login']");
    const cardTitles = page.locator(".card-body h5 b");

    //URL
    await page.goto('https://rahulshettyacademy.com/client');
    console.log(await page.title());

    // css
    await userName.fill("qaops@yopmail.com");
    await password.fill("Test@12345");    
    await signIn.click();
    
    await page.waitForLoadState('networkidle');
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    
    console.log(await cardTitles.first().textContent());    
    console.log(await cardTitles.nth(0).textContent()) 
});

test.only('UI Controls_DropDown_RadioBTN', async ({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const dropdown = page.locator("select.form-control");

    await dropdown.selectOption("Teacher");    

    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click()
    console.log(await page.locator(".radiotextsty").last().isChecked());
    //This is assertions
    expect(page.locator(".radiotextsty").last()).toBeChecked();

    await page.locator(".radiotextsty").first().click();    

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    // await page.pause();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();


    

});