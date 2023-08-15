"use strict";
const { hash } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Bookmark, { foreignKey: "CustomerId" });
    }
  }
  Customer.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email must be unique",
        },
        validate: {
          notNull: {
            msg: "Email can not be null",
          },
          notEmpty: {
            msg: "Email can not be empty",
          },
          isEmail: {
            msg: "Email is not valid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password can not be null",
          },
          notEmpty: {
            msg: "Password can not be empty",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "customer",
        validate: {
          notNull: {
            msg: "Role can not be null",
          },
          notEmpty: {
            msg: "Role can not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  Customer.beforeCreate((customer, options) => {
    customer.password = hash(customer.password);
  });
  return Customer;
};
