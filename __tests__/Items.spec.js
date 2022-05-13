const supertest = require("supertest");
const db = require("./db");
const client = supertest(require("../app.js"));
const app = require("../app.js");

describe("test Items Api", () => {
  beforeAll(async () => await db.connect());
  afterEach(async () => await db.clear());
  afterAll(async () => await db.close());

  it("should return all items", async () => {
    const response = await client.get("/api/items");
    expect(response.status).toBe(200);
  });
  it("should be able to create a item and receive good code", async () => {
    const response = await client.post("/api/items").send({
      name: "Test item",
      price: 4,
    });

    expect(response.status).toBe(201);
  });
  it("should create a new item with good propeties", async () => {
    const response = await client
      .post("/api/items")
      .set("Content-Type", "application/json")
      .send({
        name: "Test item",
        price: 4,
      });
    expect(response.status).toBe(201);
    expect(response.body.result.name).toBe("Test item");
    expect(response.body.result.price).toBe(4);
  });
  it("should not create a new item with bad propeties", async () => {
    const response = await client
      .post("/api/items")
      .set("Content-Type", "application/json")
      .send({
        name: "Test item",
      });
    expect(response.status).toBe(500);
  });
});
