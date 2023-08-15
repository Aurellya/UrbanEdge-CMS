const { Product, User, History } = require("../models");

class ProductController {
  static async createProduct(req, res, next) {
    try {
      const { id: userId } = req.user;
      const {
        name,
        description,
        price,
        stock,
        imgUrl,
        categoryId,
        rating,
        totalReviews,
      } = req.body;

      const created = await Product.create({
        name,
        description,
        price: +price,
        stock: +stock,
        imgUrl,
        categoryId: +categoryId,
        authorId: userId,
        rating: rating ? rating : 1,
        totalReviews: totalReviews ? totalReviews : 1,
      });

      await History.create({
        title: name,
        description: `new product with id ${created.id} created`,
        updatedBy: +userId,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Product created successfully",
        data: created,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllProducts(req, res, next) {
    try {
      const products = await Product.findAll({
        order: [["id", "ASC"]],
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      });

      res.status(200).json({
        statusCode: 200,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(+id);

      if (!product) throw { name: "ProductNotFound" };

      res.status(200).json({
        statusCode: 200,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(+id);

      if (!product) throw { name: "ProductNotFound" };

      await product.destroy();

      res.status(200).json({
        statusCode: 200,
        message: `Product ${product.name} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async replaceProduct(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { id: productId } = req.params;

      const product = await Product.findByPk(+productId);
      if (!product) throw { name: "ProductNotFound" };

      const { name, description, price, stock, imgUrl, categoryId, status } =
        req.body;

      product.name = name;
      product.description = description;
      product.price = +price;
      product.stock = +stock;
      product.imgUrl = imgUrl;
      product.categoryId = +categoryId;
      product.authorId = userId;
      product.status = status;

      await product.save();

      await History.create({
        title: name,
        description: `Product with id ${product.id} updated`,
        updatedBy: +userId,
      });

      res.status(200).json({
        statusCode: 200,
        message: `Success to replace Product ${product.name}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async modifyProduct(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { id: productId } = req.params;

      const product = await Product.findByPk(+productId);
      if (!product) throw { name: "ProductNotFound" };

      const prevStatus = product.status;

      const { status } = req.body;
      product.status = status;
      await product.save();

      await History.create({
        title: product.name,
        description: `Product with id ${product.id} status has been updated from ${prevStatus} into ${status}`,
        updatedBy: +userId,
      });

      res.status(200).json({
        statusCode: 200,
        message: `Success to modify Product ${product.name} `,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
