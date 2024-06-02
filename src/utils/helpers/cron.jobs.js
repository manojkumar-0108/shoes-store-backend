const cron = require('node-cron');

const { OrderService } = require('../../services');


function scheduleCrons() {
    //every 5 minutes
    cron.schedule('*/5 * * * *', async () => {
        await new OrderService().cancelOldOrders();
    });
}

module.exports = scheduleCrons;