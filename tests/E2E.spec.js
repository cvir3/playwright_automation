import { test, expect } from '@playwright/test';

test('E2E flow', async ({ page }) => {

   await page.goto('https://rahulshettyacademy.com/client');
   const userName = page.locator("#userEmail");
   const password = page.locator("[type='password']");
   const signIn = page.locator("[value ='Login']");
   const products = page.locator(".card-body")
   const productName = 'Banarsi Saree';
   const cartBtn = page.locator("[routerlink*='cart']");


   await userName.fill("qaops@yopmail.com");
   await password.fill("Test@12345");
   await signIn.click();
   await page.waitForLoadState('networkidle');

   const count = await products.count();
   /* This logic checks if I want to add a Banarasi saree whenever it finds one on the card, it will add it to the cart. */
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator(" h5 b").textContent() === productName) {
         //This is chain tec
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }

   await cartBtn.click();
   //This is for check the item is added into cart
   await page.locator("div li").first().waitFor();
   //Find to locator based upon text and with the tag
   const bool = await page.locator("h3:has-text('Banarsi Saree')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
   //Auto suggestions dropdown
   await page.locator("[placeholder*='Country']").pressSequentially("Ind", { delay: 100 });
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   // await page.pause();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text.trim() === "India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }

});

