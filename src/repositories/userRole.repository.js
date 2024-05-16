

const CrudRepository = require('./crud.repository');
const { Op } = require('sequelize');
const { userRole } = require('../models');


class UserRoleRepository extends CrudRepository {


    constructor() {
        super(userRole);
    }

    async getUserRole(userId, adminRoleId, sellerRoleId) {

        const userRole = await this.model.findOne({
            where: {
                user_id: userId,
                role_id: {
                    [Op.in]: [adminRoleId, sellerRoleId]
                }
            }
        });

        return userRole;
    }

}

module.exports = UserRoleRepository;