const request = require("supertest");
const express = require("express");

const appMarv = require("../../routes/appmarv/index");

const app = express();
app.use(express.json());
app.use("/appMarv", appMarv);

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
