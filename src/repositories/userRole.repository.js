

const CrudRepository = require('./crud.repository');

const { userRole } = require('../models');


class UserRoleRepository extends CrudRepository {


    constructor() {
        super(userRole);
    }

    async getUserRole(userId, roleId) {

        const userRole = await this.model.findOne({
            where: {
                user_id: userId,
                role_id: roleId
            }
        });

        return userRole;
    }

}

module.exports = UserRoleRepository;