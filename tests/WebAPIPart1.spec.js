const { test, expect, request } = require('@playwright/test');
const loginPayLoad = { userEmail: "qaops@yopmail.com", userPassword: "Test@12345" };
const orderPayLoad = { "orders": [{ "country": "Cuba", "productOrderedId": "67a8dde5c0d3e6622a297cc8" }] }
let orderId = "67a8dde5c0d3e6622a297cc8";
let token;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayLoad
        }
    )
    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    //
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayLoad,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },

        })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0]

});

//Create order is success
test('Client App Login', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client');
    const btnOrder = page.locator("button[routerlink*='myorder']");
    await page.waitForLoadState('networkidle');
    //Orders History
    await btnOrder.click();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});