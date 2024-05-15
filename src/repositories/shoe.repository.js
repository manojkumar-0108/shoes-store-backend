const CurdRepository = require('./crud.repository');
const { Shoe } = require('../models');

class ShoeRepository extends CurdRepository {
    constructor() {
        super(Shoe);
    }
}

module.exports = ShoeRepository;