'use strict';

const bcrypt = require('bcrypt');
const { serverConfig } = require('../config');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', +serverConfig.SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Seller',
        email: 'seller@gmail.com',
        password: bcrypt.hashSync('123456', +serverConfig.SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Demo',
        email: 'demo@gmail.com',
        password: bcrypt.hashSync('123456', +serverConfig.SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users', null, {});
  }
};
