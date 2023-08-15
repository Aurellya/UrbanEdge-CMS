const request = require("supertest");
const app = require("../app");
const { Customer } = require("../models");
const { generateToken } = require("../helpers/jwt");

describe("Login: POST /pub/login - customer login", () => {
  let customer;

  beforeAll(async () => {
    customer = await Customer.create({
      email: "test99@gmail.com",
      password: "123456",
    });
  });

  afterAll(async () => {
    await Customer.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });

  it("200 Success login - should return access_token", async function () {
    const response = await request(app)
      .post("/pub/login")
      .send({ email: "test99@gmail.com", password: "123456" })
      .set("Accept", "application/json");

    const token = generateToken({
      id: customer.id,
      email: customer.email,
      role: customer.role,
    });

    const responseBody = response.body;

    expect(response.status).toEqual(200);
    expect(responseBody).toHaveProperty("access_token", token);
  });

  it("401 Failed login - should return error when password is invalid", async function () {
    const response = await request(app)
      .post("/pub/login")
      .send({ email: "test99@gmail.com", password: "1234567" })
      .set("Accept", "application/json");

    const responseBody = response.body;

    expect(response.status).toEqual(401);
    expect(responseBody).toHaveProperty("message", "Invalid email or password");
  });

  it("401 Failed login - should return error when email is not in database", async function () {
    const response = await request(app)
      .post("/login")
      .send({ email: "test990@gmail.com", password: "123456" })
      .set("Accept", "application/json");

    const responseBody = response.body;

    expect(response.status).toEqual(401);
    expect(responseBody).toHaveProperty("message", "Invalid email or password");
  });
});

describe("Register: POST /pub/register - create new user", () => {
  afterAll(async () => {
    await Customer.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  });

  it("201 Success register - should create new Customer", async function () {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "test99@gmail.com", password: "123456" })
      .set("Accept", "application/json");

    const responseBody = response.body;

    expect(response.status).toEqual(201);
    expect(responseBody).toHaveProperty(
      "message",
      "Customer created successfully"
    );
  });

  it("400 Failed register - should return error message 'Email can not be null' if email is null", async function () {
    const response = await request(app)
      .post("/pub/register")
      .send({ password: "123456" })
      .set("Accept", "application/json");

    const responseBody = response.body;

    expect(response.status).toEqual(400);
    expect(responseBody.message).toHaveProperty(
      "email",
      "Email can not be null"
    );
  });

  it("400 Failed register - should return error message 'Password can not be null' if password is null", async function () {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "test99@gmail.com" })
      .set("Accept", "application/json");

    const responseBody = response.body;

    expect(response.status).toEqual(400);
    expect(responseBody.message).toHaveProperty(
      "password",
      "Password can not be null"
    );
  });

  it("400 Failed register - should return error message 'Email can not be empty' if email is empty", async function () {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "", password: "123456" })
      .set("Accept", "application/json");

    const responseBody = response.body;

    expect(response.status).toEqual(400);
    expect(responseBody.message).toHaveProperty(
      "email",
      "Email can not be empty"
    );
  });

  it("400 Failed register - should return error message 'Password can not be empty' if password is empty", async function () {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "test99@gmail.com", password: "" })
      .set("Accept", "application/json");

    const responseBody = response.body;

    expect(response.status).toEqual(400);
    expect(responseBody.message).toHaveProperty(
      "password",
      "Password can not be empty"
    );
  });

  it("400 Failed register - should return error message 'Email must be unique' if email is already exists", async function () {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "test99@gmail.com", password: "123456" })
      .set("Accept", "application/json");

    const responseBody = response.body;

    expect(response.status).toEqual(400);
    expect(responseBody.message).toHaveProperty(
      "email",
      "Email must be unique"
    );
  });

  it("400 Failed register - should return error message 'Email is not valid' if email is in invalid format", async function () {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "test99", password: "123456" })
      .set("Accept", "application/json");

    const responseBody = response.body;

    expect(response.status).toEqual(400);
    expect(responseBody.message).toHaveProperty("email", "Email is not valid");
  });
});
