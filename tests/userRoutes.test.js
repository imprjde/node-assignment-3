const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index.js");
const User = require("../models/user.model.js");

beforeEach(async () => {
  await User.deleteMany();
});
afterAll(async () => {
  await mongoose.connection.close();
});

describe("User API", () => {
  test("Should create a new user", async () => {
    const response = await request(app).post("/api/users").send({
      name: "John Doe",
      email: "johndoe@example.com",
      age: 30,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("John Doe");
  });

  test("Should update a user", async () => {
    const user = new User({
      name: "Jane Doe",
      email: "janedoe@example.com",
      age: 25,
    });
    await user.save();

    const response = await request(app)
      .put(`/api/users/${user._id}`)
      .send({ age: 26 });
    expect(response.statusCode).toBe(200);
    expect(response.body.age).toBe(26);
  });

  test("Should get a list of users", async () => {
    await new User({
      name: "Alice",
      email: "alice@example.com",
      age: 28,
    }).save();
    await new User({ name: "Bob", email: "bob@example.com", age: 32 }).save();

    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });
});
