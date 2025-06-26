// Mock de crypto-js avant les imports qui l'utilisent
jest.mock("crypto-js", () => {
  return {
    SHA256: jest.fn(() => ({
      toString: jest.fn(() => "mockedHash"),
    })),
    encBase64: "mockedEncBase64",
  };
});
// import supertest and express
const request = require("supertest");
const express = require("express");
// import routes and models
const login = require("../../routes/backEndAirBnb/routes/auth/login.routes");
const signup = require("../../routes/backEndAirBnb/routes/auth/signup.routes");
const User = require("../../routes/backEndAirBnb/models/User");

const app = express();
app.use(express.json());

app.use("/airBnBed/auth", signup);
app.use("/airBnBed/auth", login);

// preparing mock for remplacing model user (simulates) before used
jest.mock("../../routes/backEndAirBnb/models/User.js");

// decompose test in component (it)
describe("Auth routes with mocks", () => {
  // before each it: clean all mocks (reset)
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /airBnBed/auth/signup", () => {
    // start test with it
    it("create user if email not exists", async () => {
      // simulates method findOne who returned null value
      User.findOne.mockResolvedValue(null);
      // simulates successful new user backup
      User.prototype.save = jest.fn().mockResolvedValue();
      // simulates request post with data to the body in there
      const res = await request(app).post("/airBnBed/auth/signup").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
        description: "Test user",
      });
      //findOne method called with correct argument (email),
      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      //save method of User model been called
      expect(User.prototype.save).toHaveBeenCalled();
      // response HTTP has returned the good code
      expect(res.statusCode).toBe(201);
      // response contains expected message
      expect(res.body.message).toBe("user created");
    });

    it("should return 400 if user exists", async () => {
      // in first place, i simulate a user search who find a user
      User.findOne.mockResolvedValue({ email: "test@example.com" });
      // simulates request post with data to the body in there
      const res = await request(app).post("/airBnBed/auth/signup").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
        description: "Test user",
      });
      //findOne method called with correct argument (email),
      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("account already exist");
    });

    it("should return 400 if passwords don't match", async () => {
      // in first place, i simulate a research of user who return null (user not exist)
      User.findOne.mockResolvedValue(null);

      const res = await request(app).post("/airBnBed/auth/signup").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password456",
        description: "Test user",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("password does not match");
    });
  });

  describe("POST /auth/login", () => {
    it("should login successfully with correct credentials", async () => {
      const fakeUser = {
        email: "test@example.com",
        salt: "salt",
        hash: "mockedHash", // doit matcher le hash mocké dans crypto-js
        token: "token123",
        account: { username: "testuser" },
        id: "userId",
      };

      User.findOne.mockResolvedValue(fakeUser);

      const res = await request(app).post("/airBnBed/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(res.statusCode).toBe(200);
      // response.body.message need to be the same (contains a regex allows case sensitivity (uppercase or lowercase:no matter))
      // expect(res.body.message).toMatch(/login succesfully/i);
      // response.body.message need to be exactly the same (no regex)
      expect(res.body.message).toBe("login succesfully");
      // response.body need to have the token property
      expect(res.body).toHaveProperty("token");
    });

    //simulates test if user not found
    it("return 400 if user not found", async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app).post("/airBnBed/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });
      expect(res.body.message).toBe("bad request: have you an account ?");
      expect(res.statusCode).toBe(400);
    });

    //simulates test if password does not match
    it("should return 400 if password incorrect", async () => {
      const fakeUser = {
        email: "test@example.com",
        salt: "salt",
        hash: "otherHash", // ne match pas le hash mocké
      };
      User.findOne.mockResolvedValue(fakeUser);

      const res = await request(app).post("/airBnBed/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });
      expect(res.body.message).toBe("password does not match");
      expect(res.statusCode).toBe(400);
    });
  });
});
