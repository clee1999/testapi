const supertest = require("supertest");
const db = require("./db");
const client = supertest(require("../app.js"));

beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe("test Items Api", () => {
  it("should return all items", async () => {
    const response = await client.get("/api/items");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it("should create a new item", async () => {
    const response = await client
      .post("/api/items")
      .set("Content-Type", "application/json")
      .send({
        name: "Test item",
        price: 4,
      });
    expect(response.status).toBe(201);
    // expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toBe("Test item");
    expect(response.body.price).toBe(4);
  });
});
