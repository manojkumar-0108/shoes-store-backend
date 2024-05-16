'use strict';
const { Model } = require('sequelize');

const { enums } = require('../utils/common');

const { CREATED } = enums.ORDER_STATUS;
const { PENDING } = enums.PAYMENT_STATUS;


module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(models.User, {
        as: 'UserOrderDetails',
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      this.belongsToMany(models.Shoe, { through: 'orderItems', as: 'orderedShoes' });
    }
  }
  Order.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_status: {
      type: DataTypes.STRING,
      defaultValue: CREATED
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    payment: {
      type: DataTypes.STRING,
      defaultValue: PENDING
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};