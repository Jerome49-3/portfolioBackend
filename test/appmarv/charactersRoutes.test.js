// tests/charactersRoute.test.js
const request = require("supertest");
const express = require("express");
const axios = require("axios");
const charactersRoute = require("../../routes/appmarv/routes/characters.routes");
jest.mock("axios");

const app = express();
app.use(charactersRoute);

describe("GET /characters", () => {
  it("should return mocked characters data", async () => {
    const mockedData = {
      results: [
        { _id: "1", name: "Iron Man" },
        { _id: "2", name: "Spider-Man" },
      ],
      count: 2,
    };

    axios.get.mockResolvedValue({
      data: mockedData,
    });

    const res = await request(app).get("/characters?name=man&limit=2&skip=0");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("dataMarv");
    expect(res.body.dataMarv).toHaveProperty("data");
    expect(res.body.dataMarv).toHaveProperty("count", 2);
    expect(res.body.dataMarv.data.length).toBe(2);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("name=man"));
  });
});
