const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    // cek access token availability
    const { access_token } = req.headers;
    if (!access_token) throw { name: "InvalidToken" };

    // validasi access token
    const payload = verifyToken(access_token);
    if (!payload) throw { name: "InvalidToken" };

    // cek user di db
    const result = await User.findByPk(payload.id);
    if (!result) throw { name: "InvalidAccount" };

    req.user = {
      id: result.id,
      email: result.email,
      role: result.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
