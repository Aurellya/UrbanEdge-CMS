"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bookmarks = require("../data/bookmarks.json");
    bookmarks.forEach((bookmark) => {
      bookmark.createdAt = new Date();
      bookmark.updatedAt = new Date();
      return bookmark;
    });
    await queryInterface.bulkInsert("Bookmarks", bookmarks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookmarks", null, {});
  },
};
