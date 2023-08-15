const modifyAuthorization = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "Admin") throw { name: "NotAuthorized" };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = modifyAuthorization;
