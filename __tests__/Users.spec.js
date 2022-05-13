const supertest = require("supertest");
const db = require("./db");
const client = supertest(require("../app.js"));

describe("test Users Api", () => {
  beforeAll(async () => await db.connect());
  afterEach(async () => await db.clear());
  afterAll(async () => await db.close());
  it("it should return all users", async () => {
    const response = await client.get("/api/users");
    expect(response.status).toBe(200);
  });
});
