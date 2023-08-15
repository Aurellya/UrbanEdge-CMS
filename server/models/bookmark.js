"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    static associate(models) {
      Bookmark.belongsTo(models.Customer, { foreignKey: "CustomerId" });
      Bookmark.belongsTo(models.Product, { foreignKey: "ProductId" });
    }
  }
  Bookmark.init(
    {
      CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "CustomerId can not be null",
          },
          notEmpty: {
            msg: "CustomerId can not be empty",
          },
        },
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "ProductId can not be null",
          },
          notEmpty: {
            msg: "ProductId can not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Bookmark",
    }
  );
  return Bookmark;
};
