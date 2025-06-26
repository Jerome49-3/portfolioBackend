const request = require("supertest");
const express = require("express");

const airBnBed = require("../routes/backEndAirBnb/index.js");

const app = express();
app.use(express.json());
app.use("/airbnbed", airBnBed);

// decompose test in component (it)
describe("GET /airbnbed", () => {
  // start test with it
  it("test racine route", async () => {
    // simulate a request to the route
    const res = await request(app).get("/airbnbed");
    // check the returned status
    expect(res.statusCode).toBe(200);
    // check the sended message
    expect(res.body.message).toBe("Welcome on my projet airBnBed");
  });
});
