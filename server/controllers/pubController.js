const { Customer, Product, Bookmark, Category } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { Op } = require("sequelize");
const axios = require("axios");

const { generateToken } = require("../helpers/jwt");
const { getPagination } = require("../helpers/getPagination");
const { compare } = require("../helpers/bcrypt");

class PubController {
  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;

      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.CLIENT_ID,
      });

      const payload = ticket.getPayload();
      // console.log(payload, 111131323131);

      const [user, created] = await Customer.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "google-login",
        },
        hooks: false,
      });

      delete user.dataValues.password;

      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        statusCode: 200,
        access_token: token,
        message: user,
      });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      let created = await Customer.create({
        email,
        password,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Customer created successfully",
        data: {
          id: created.id,
          email: created.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "LoginDataIsRequired" };
      if (!password) throw { name: "LoginDataIsRequired" };

      const data = await Customer.findOne({ where: { email } });
      if (!data) throw { name: "InvalidAccount" };

      const isValidPassword = compare(password, data.password);

      if (!isValidPassword) throw { name: "InvalidAccount" };
      else {
        const token = generateToken({
          id: data.id,
          email: data.email,
          role: data.role,
        });

        res.status(200).json({
          access_token: token,
          email: data.email,
          role: data.role,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getAllProducts(req, res, next) {
    try {
      const pageSize = 8;
      const { page, name, categoryId } = req.query;

      const { limit, offset } = page ? getPagination(page - 1, pageSize) : {};

      const condition = name ? { name: { [Op.iLike]: `%${name}%` } } : {};
      categoryId ? (condition["categoryId"] = +categoryId) : null;

      const products = await Product.findAndCountAll({
        order: [["id", "ASC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        where: condition,
        limit,
        offset,
        include: {
          model: Category,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });

      res.status(200).json({
        statusCode: 200,
        data: products.rows,
        total: products.count,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const BASE_URL = `https://urbanedgepub.web.app`;

      const API_TOKEN = process.env.API_TOKEN;
      const { id } = req.params;

      // const opt = {
      //   url: `https://api.qr-code-generator.com/v1/create?access-token=${API_TOKEN}`,
      //   method: "post",
      //   data: {
      //     frame_name: "no-frame",
      //     qr_code_text: `${BASE_URL}/products/${id}`,
      //     image_format: "SVG",
      //     qr_code_logo: "scan-me-square",
      //   },
      // };

      const product = await Product.findOne({
        where: {
          id: +id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: {
          model: Category,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });

      if (!product) throw { name: "ProductNotFound" };

      res.status(200).json({
        statusCode: 200,
        data: product,
      });

      // const response = await axios.request(opt);

      // if (response) {
      //   res.status(200).json({
      //     statusCode: 200,
      //     data: product,
      //     qrCode: response.data,
      //   });
      // } else {
      //   throw { name: BarcodeError };
      // }
    } catch (error) {
      next(error);
    }
  }

  static async getAllBookmarks(req, res, next) {
    try {
      const bookmarks = await Bookmark.findAll({
        order: [["id", "ASC"]],
        where: {
          CustomerId: req.customer.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Product,
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
          include: {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        },
      });

      res.status(200).json({
        statusCode: 200,
        data: bookmarks,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addBookmark(req, res, next) {
    try {
      const { id: CustomerId } = req.customer;
      const { ProductId } = req.params;

      console.log(ProductId, CustomerId, 23412);
      const product = await Product.findByPk(+ProductId);
      if (!product) throw { name: "ProductNotFound" };

      const created = await Bookmark.create({
        CustomerId,
        ProductId,
      });

      res.status(201).json({
        statusCode: 201,
        message: `${product.name} is added to bookmark!`,
        data: created,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBookmark(req, res, next) {
    try {
      const { id } = req.params;

      const bookmark = await Bookmark.findOne({
        where: {
          id: +id,
        },
        include: {
          model: Product,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });
      if (!bookmark) throw { name: "ProductNotFound" };

      await bookmark.destroy();

      res.status(200).json({
        statusCode: 200,
        message: `${bookmark.Product.name} is removed from bookmark!`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "ASC"]],
      });

      res.status(200).json({
        statusCode: 200,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PubController;
