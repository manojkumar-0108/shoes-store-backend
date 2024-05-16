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
}

module.exports = OrderItemRepository;