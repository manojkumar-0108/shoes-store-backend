'use strict';
/** @type {import('sequelize-cli').Migration} */

const { enums } = require('../utils/common');

const { CREATED } = enums.ORDER_STATUS;
const { PENDING } = enums.PAYMENT_STATUS;


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          name: 'FK_Orders_userId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Addresses',
          key: 'id',
          name: 'FK_Orders_address'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      order_status: {
        type: Sequelize.STRING,
        defaultValue: CREATED
      },
      date: {
        type: Sequelize.DATE
      },
      payment: {
        type: Sequelize.STRING,
        defaultValue: PENDING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};


