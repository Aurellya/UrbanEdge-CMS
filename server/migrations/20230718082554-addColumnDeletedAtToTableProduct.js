"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "deletedAt", Sequelize.DATE);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "deletedAt", {});
  },
};
