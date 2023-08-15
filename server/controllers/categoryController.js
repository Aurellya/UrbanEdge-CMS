const { Category } = require("../models");

class CategoryController {
  static async getAllCategories(req, res, next) {
    try {
      const categories = await Category.findAll({ order: [["id", "ASC"]] });

      res.status(200).json({
        statusCode: 200,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
