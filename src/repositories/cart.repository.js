const CurdRepository = require('./crud.repository');
const { userCart } = require('../models');


class CartRepository extends CurdRepository {
    constructor() {
        super(userCart);
    }

    async findProduct(userId, productId) {
        const product = await this.model.findOne({
            where: {
                user_id: userId,
                shoe_id: productId
            }
        });

        return product;
    }

    async getAllCartItems(userId) {
        const products = await this.model.findAll({
            where: {
                user_id: userId
            }
        });

        return products;
    }

    async bulkDeleteCartItems(userId) {
        const products = await this.model.delete({
            where: {
                user_id: userId
            }
        });

        return products;
    }
}

module.exports = CartRepository;