"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Products",
      "totalReviews",
      Sequelize.INTEGER
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "totalReviews", {});
  },
};
