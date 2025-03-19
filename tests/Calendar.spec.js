const { test, expect } = require("@playwright/test");


test("Calendar validation", async ({ page }) => {

    const months = "2";
    const date = "28";
    const year = "2027";
    const expectedList = [months, date, year]; //<= this is for assertion

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    console.log(await page.title());

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__tile.react-calendar__year-view__months__month").nth(Number(months) - 1).click();
    // await page.locator("//abbr[text()='"+date+"']").click(); <= if you dont want to print we can use this code line.
    await page.locator(`//abbr[text()='${date}']`).click();
    console.log(`Month: ${months}, Date: ${date}, Year: ${year}`);

    //assertion for calendar
    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index < inputs.length; index++) {
        const value = inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }
});