const CurdRepository = require('./crud.repository');
const { orderItem } = require('../models');


class OrderItemRepository extends CurdRepository {
    constructor() {
        super(orderItem);
    }

    async bulkInsertData(data) {
        const response = await this.model.bulkCreate(data);
        return response;
    }

    async getItemsByOrderId(orderId) {
        const response = await this.model.findAll({
            where: {
                order_id: orderId
            }
        });
        return response;
    }
}

module.exports = OrderItemRepository;