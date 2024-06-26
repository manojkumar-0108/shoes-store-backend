'use strict';
const { Model } = require('sequelize');

const bcrypt = require('bcrypt');
const { serverConfig } = require('../config');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Role,
        {
          through: 'userRoles',
          as: 'role'
        });

      this.belongsToMany(models.Shoe,
        { through: 'userCarts', as: 'cart' }
      );

      this.hasMany(models.Order, {
        foreignKey: 'user_id'
      });

    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 50]
      }
    }

  }, {
    sequelize,
    modelName: 'User',
  });


  //Hooks to encrypt password
  User.beforeCreate(function encrypt(user) {
    const encryptedPassword = bcrypt.hashSync(user.password, +serverConfig.SALT_ROUNDS);//type casting through +
    user.password = encryptedPassword;
  });
  return User;
};