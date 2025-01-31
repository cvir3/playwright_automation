import { test, expect } from '@playwright/test';

test('Playwright Special locators', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByPlaceholder("Password").fill("Test@1234")
    await page.getByLabel("Check me out if you Love IceCreams!");
    await page.getByLabel("Employed");
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
}); 