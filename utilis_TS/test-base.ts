import { test as baseTest } from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
}

export const customTest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>({

    testDataForOrder:
    {
        username: "qaops@yopmail.com",
        password: "Test@12345",
        productName: "ZARA COAT 3"
    }

})