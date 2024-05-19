

const CrudRepository = require('./crud.repository');
const { Op } = require('sequelize');
const { userRole } = require('../models');


class UserRoleRepository extends CrudRepository {


    constructor() {
        super(userRole);
    }

    async getUserRole(userId, rolesId) {

        const userRole = await this.model.findOne({
            where: {
                user_id: userId,
                role_id: {
                    [Op.in]: rolesId
                }
            }
        });

        return userRole;
    }

}

module.exports = UserRoleRepository;