const { test, expect, request } = require('@playwright/test');
const loginPayLoad = { userEmail: "qaops@yopmail.com", userPassword: "Test@12345" };
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
});

test('Client App Login', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client');
    const userName = page.locator("#userEmail");
    const password = page.locator("[type='password']");
    const signIn = page.locator("[value ='Login']");
    const products = page.locator(".card-body")
    const productName = 'Banarsi Saree';
    const cartBtn = page.locator("[routerlink*='cart']");
    const email = "qaops@yopmail.com";
    const ccDetails = page.locator(".input.txt");
    const orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    const btnOrder = page.locator("button[routerlink*='myorder']");



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
    //Verify Email id
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    //Auto suggestions dropdown
    await page.locator("[placeholder*='Country']").pressSequentially("Ind", { delay: 100 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    //CC Details  
    await ccDetails.nth(1).fill('666');
    await ccDetails.nth(2).fill("Rahul");
    await ccDetails.nth(3).fill("Testcoupon");
    await page.locator(".action__submit").click();
    //Verify Thanks text
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    //Get Order id
    const getOrderId = await orderId.textContent();
    console.log(getOrderId);

    //Orders History
    await btnOrder.click();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (getOrderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(getOrderId.includes(orderIdDetails)).toBeTruthy();

});