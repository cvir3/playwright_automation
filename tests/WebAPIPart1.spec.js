const { test, expect, request } = require('@playwright/test');
const { API_Utilis } = require('./utilis/API_Utilis'); // This import is necessary to use the API_Utilis class

const loginPayLoad = { userEmail: "qaops@yopmail.com", userPassword: "Test@12345" };
const orderPayLoad = { "orders": [{ "country": "Cuba", "productOrderedId": "67a8dde5c0d3e6622a297cc8" }] }

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const api_Utilis = new API_Utilis(apiContext, loginPayLoad);
    response = await api_Utilis.createOrder(orderPayLoad);
});

//Create order is success
test('Client App Login', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client');
    const btnOrder = page.locator("button[routerlink*='myorder']");
    await page.waitForLoadState('networkidle');
    //Orders History
    await btnOrder.click();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});