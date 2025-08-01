const request = require("supertest");
const express = require("express");

const appMarv = require("../../routes/appmarv/index");

const app = express();
app.use(express.json());
app.use("/appMarv", appMarv);
let dbMock;

jest.mock("mongoose", () => {
  const dbMock = jest.requireActual("mongoose");
  return {
    ...dbMock,
    createConnection: jest.fn(() => ({
      model: jest.fn(),
      on: jest.fn(),
      close: jest.fn(),
    })),
  };
});

afterAll(async () => {
  await dbMock?.close?.();
});

// decompose test in component (it)
describe("GET /airbnbed", () => {
  // start test with it
  it("test racine route", async () => {
    // simulate a request to the route
    const res = await request(app).get("/appmarv");
    // check the returned status
    expect(res.statusCode).toBe(200);
    // check the sended message
    expect(res.body.message).toBe("Welcome on my projet Marvel");
  });
});
