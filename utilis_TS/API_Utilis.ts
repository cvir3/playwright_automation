const { get } = require("http");

class API_Utilis {
    apiContext: any;
    loginPayLoad: String;

    constructor(apiContext: any, loginPayLoad: String) {
        this.loginPayLoad = loginPayLoad;
        this.apiContext = apiContext;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad
            }
        )


        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }


    async createOrder(orderPayLoad: String) {

        let response = { token: String, orderId: String };
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                },

            })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0]
        response.orderId = orderId;
        return response;
    }

}

module.exports = { API_Utilis };