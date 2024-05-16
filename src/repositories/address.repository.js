const CurdRepository = require('./crud.repository');
const { Address } = require('../models');


class AddressRepository extends CurdRepository {
    constructor() {
        super(Address);
    }

    async findAddress(query) {
        const address = await this.model.findOne(query);
        return address;
    }

}

module.exports = AddressRepository;