const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { monitorEventLoopDelay } = require('perf_hooks');


class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }
}
module.exports = { POManager }