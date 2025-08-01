const request = require("supertest");
const express = require("express");
const axios = require("axios");
const characterIdRoute = require("../../routes/appmarv/routes/character.routes");
jest.mock("axios");

const app = express();
app.use(characterIdRoute);

describe("GET /character/:characterId", () => {
  it("should return mocked characterId data", async () => {
    const mockedData = {
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/4c0030bc4629e",
        extension: "jpg",
      },
      comics: [
        "5fce26fe78edeb0017c975cb",
        "5fce26e578edeb0017c97576",
        "5fce26c978edeb0017c97530",
        "5fce26c978edeb0017c97531",
        "5fce26c778edeb0017c974e3",
        "5fce26ad78edeb0017c97498",
        null,
        null,
        null,
        "5fce266e78edeb0017c9745a",
      ],
      name: "Captain Marvel (Phyla-Vell)",
      description: "Captain Marvel (Phyla-Vell)",
      _id: "123abc",
    };

    axios.get.mockResolvedValue({ data: mockedData });

    const res = await request(app).get("/character/123abc");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "Captain Marvel (Phyla-Vell)");
    expect(res.body).toHaveProperty("_id", "123abc");
    expect(axios.get).toHaveBeenCalledWith(
      `https://lereacteur-marvel-api.herokuapp.com/character/123abc?apiKey=${process.env.API_KEY_MARVEL_REACTEUR}`
    );
  });
});
