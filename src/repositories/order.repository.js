const CurdRepository = require('./crud.repository');
const { Order } = require('../models');

const { enums } = require('../utils/common');
const { Op } = require('sequelize');


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

    async cancelOldBookings(timestamp) {

        const [affectedCount, affectedRows] = await this.model.update(
            {
                order_status: enums.ORDER_STATUS.CANCELLED,
                payment: enums.PAYMENT_STATUS.FAILED
            }, {
            where: {
                [Op.and]: [
                    {
                        createdAt: {
                            [Op.lt]: timestamp
                        }
                    },
                    {
                        payment: {
                            [Op.notIn]: [enums.PAYMENT_STATUS.PAID]
                        }
                    }
                ]
            }, returning: true
        });

        return affectedCount;
    }

}

module.exports = OrderRepository;