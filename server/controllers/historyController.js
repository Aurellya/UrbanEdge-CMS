const { History, User } = require("../models");

class HistoryController {
  static async getAllHistories(req, res, next) {
    try {
      let histories = await History.findAll({
        order: [["createdAt", "DESC"]],
      });

      histories = await Promise.all(
        histories.map(async (history) => {
          const user = await User.findByPk(history.dataValues.updatedBy);
          const email = await user.dataValues.email;
          history.dataValues.email = await email;
          return history;
        })
      );

      res.status(200).json({
        statusCode: 200,
        data: histories,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HistoryController;
