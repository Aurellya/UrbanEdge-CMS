const request = require("supertest");
const app = require("../app");
const { Category, Bookmark, Customer, User, Product } = require("../models");
const { generateToken } = require("../helpers/jwt");

const categories = require("./testData/categories.json");
const users = require("./testData/users.json");
const customers = require("./testData/customers.json");
const products = require("./testData/products.json");
const bookmarks = require("./testData/bookmarks.json");

describe("Bookmark: GET /pub/products", () => {
  let customer;
  beforeAll(async () => {
    await Category.bulkCreate(categories);
    await User.bulkCreate(users);
    await Customer.bulkCreate(customers);
    await Product.bulkCreate(products);
    await Bookmark.bulkCreate(bookmarks);

    customer = await Customer.findAll();
    customer = customer[0];
  });

  afterAll(async () => {
    await Bookmark.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Product.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Customer.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Category.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    // await Bookmark.sync({ force: true });
  });

  it("200 Success get bookmarks that belong to logged in user", async function () {
    console.log("bookmark test");

    const token = generateToken({
      id: customer?.id,
      email: customer?.email,
      role: customer?.role,
    });

    const response = await request(app)
      .get("/pub/bookmarks")
      .set("Accept", "application/json")
      .set("access_token", token);

    const responseBody = response.body;
    expect(response.status).toEqual(200);
    expect(responseBody.data[0]).toHaveProperty("CustomerId", 1);
  });

  it("201 Success adding bookmark by logged in user", async function () {
    console.log("bookmark test");

    const token = generateToken({
      id: customer?.id,
      email: customer?.email,
      role: customer?.role,
    });

    const response = await request(app)
      .post("/pub/bookmarks/1")
      .set("Accept", "application/json")
      .set("access_token", token);

    const responseBody = response.body;
    expect(response.status).toEqual(201);
    expect(responseBody).toHaveProperty(
      "message",
      "Janinge is added to bookmark!"
    );
  });

  it("404 Failed adding bookmark with product id that is not in database - should return error message 'Error Product Not Found'", async function () {
    console.log("bookmark test");

    const token = generateToken({
      id: customer?.id,
      email: customer?.email,
      role: customer?.role,
    });

    const response = await request(app)
      .post("/pub/bookmarks/300")
      .set("Accept", "application/json")
      .set("access_token", token);

    const responseBody = response.body;
    expect(response.status).toEqual(404);
    expect(responseBody).toHaveProperty("message", "Error Product Not Found");
  });

  it("401 Failed get bookmarks without token", async function () {
    console.log("bookmark test");

    const response = await request(app)
      .get("/pub/bookmarks")
      .set("Accept", "application/json")
      .set("access_token", "");

    const responseBody = response.body;
    expect(response.status).toEqual(401);
    expect(responseBody).toHaveProperty(
      "message",
      "Invalid Token or Invalid Login"
    );
  });

  it("401 Failed get bookmarks with invalid token", async function () {
    console.log("bookmark test");

    const response = await request(app)
      .get("/pub/bookmarks")
      .set("Accept", "application/json")
      .set("access_token", "asldkjn293e2ejodw02");

    const responseBody = response.body;
    expect(response.status).toEqual(401);
    expect(responseBody).toHaveProperty(
      "message",
      "Invalid Token or Invalid Login"
    );
  });
});
