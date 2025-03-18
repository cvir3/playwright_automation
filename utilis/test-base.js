const base = require('@playwright/test');

exports.customtest = base.test.extend({

    testDataForOrder:
    {
        username: "qaops@yopmail.com",
        password: "Test@12345",
        productName: "ZARA COAT 3"
    }
})