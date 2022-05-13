const supertest = require("supertest");
const db = require("./db");
const client = supertest(require("../app.js"));

describe("test wishlist Api", () => {
  beforeAll(async () => await db.connect());
  afterEach(async () => await db.clear());
  afterAll(async () => await db.close());
  it("it should return all wishlists", async () => {
    const response = await client.get("/api/wishlists");
    expect(response.status).toBe(200);
  });
  it("should create a new wishlist", async () => {
    const response = await client
      .post("/api/wishlists")
      .set("Content-Type", "application/json")
      .send({
        name: "Test wishlist",
      });
    expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty("_id");
    expect(response.req.data).toEqual({ name: "Test wishlist", items: [] });

    //  expect(response.body.price).toBe(4);
  });
});
