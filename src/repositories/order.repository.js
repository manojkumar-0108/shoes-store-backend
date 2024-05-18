const CurdRepository = require('./crud.repository');
const { Order } = require('../models');


class OrderRepository extends CurdRepository {
    constructor() {
        super(Order);
    }

    async getUserOrders(userId) {
        const orders = this.model.findAll({
            where: {
                user_id: userId
            }
        });

        return orders;
    }

}

module.exports = OrderRepository;