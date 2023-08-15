const { verifyToken } = require("../helpers/jwt");
const { Customer } = require("../models");

const customAuthentication = async (req, res, next) => {
  try {
    // cek access token availability
    const { access_token } = req.headers;
    if (!access_token) throw { name: "InvalidToken" };

    // validasi access token
    const payload = verifyToken(access_token);
    if (!payload) throw { name: "InvalidToken" };

    // cek user di db
    const result = await Customer.findByPk(payload.id);
    if (!result) throw { name: "InvalidAccount" };

    req.customer = {
      id: result.id,
      email: result.email,
      role: result.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = customAuthentication;
