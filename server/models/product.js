"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
      Product.belongsTo(models.User, { foreignKey: "authorId" });
      Product.hasMany(models.Bookmark, { foreignKey: "ProductId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name can not be null",
          },
          notEmpty: {
            msg: "Name can not be empty",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description can not be null",
          },
          notEmpty: {
            msg: "Description can not be empty",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price can not be null",
          },
          notEmpty: {
            msg: "Price can not be empty",
          },
          min: {
            args: 1000,
            msg: "Minimal Price is 1.000",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Stock can not be null",
          },
          notEmpty: {
            msg: "Stock can not be empty",
          },
          min: {
            args: 1,
            msg: "Minimal Stock is 0",
          },
        },
      },
      imgUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image URL can not be null",
          },
          notEmpty: {
            msg: "Image URL can not be empty",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category can not be null",
          },
          notEmpty: {
            msg: "Category can not be empty",
          },
          min: {
            args: 1,
            msg: "Category can not be empty",
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Author can not be null",
          },
          notEmpty: {
            msg: "Author can not be empty",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "Active",
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Rating can not be null",
          },
          notEmpty: {
            msg: "Rating can not be empty",
          },
        },
      },
      totalReviews: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "TotalReviews can not be null",
          },
          notEmpty: {
            msg: "TotalReviews can not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
      paranoid: true,
    }
  );
  return Product;
};
