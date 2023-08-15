const { User } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { compare } = require("../helpers/bcrypt");
const { OAuth2Client } = require("google-auth-library");

class UserController {
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

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },

        defaults: {
          email: payload.email,
          password: "google-login",
          role: "Staff",
          phoneNumber: "081234567890",
          address: "terserah",
          username: payload.given_name,
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
      const { username, email, password, phoneNumber, address } = req.body;

      let created = await User.create({
        username,
        email,
        password,
        role: "Admin",
        phoneNumber,
        address,
      });

      res.status(201).json({
        statusCode: 201,
        message: "User created successfully",
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

      const data = await User.findOne({ where: { email } });
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
          username: data.username,
          role: data.role,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
