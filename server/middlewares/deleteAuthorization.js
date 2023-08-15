const { Product } = require("../models");

const deleteAuthorization = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;
    const { id: productId } = req.params;

    if (role !== "Admin") {
      const product = await Product.findByPk(+productId);
      if (product.authorId !== +userId) {
        throw { name: "NotAuthorized" };
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = deleteAuthorization;
