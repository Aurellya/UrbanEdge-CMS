"use strict";
const { hash } = require("../helpers/bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const customers = require("../data/customers.json");
    customers.forEach((customer) => {
      customer.password = hash(customer.password);
      customer.createdAt = new Date();
      customer.updatedAt = new Date();
      return customer;
    });
    await queryInterface.bulkInsert("Customers", customers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Customers", null, {});
  },
};
