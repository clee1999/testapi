const supertest = require("supertest");
const Item = require("../models/items");
const db = require("./db");
const client = supertest(require("../app.js"));

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
  it("should not create a new item with missing price", async () => {
    const response = await client
      .post("/api/items")
      .set("Content-Type", "application/json")
      .send({
        name: "Test item",
      });
    expect(response.status).toBe(500);
  });
  it("should not create a new item with empty values", async () => {
    const response = await client
      .post("/api/items")
      .set("Content-Type", "application/json")
      .send({});
    expect(response.status).toBe(500);
  });
});

describe("GET: /:id route to get data Items Api", () => {
  let insertedData = { _id: 1, name: "Poudre", price: 5 };
  beforeEach((done) => {
    new Item(insertedData)
      .save()
      .then(() => done())
      .catch((err) => done(err));
  });
  beforeAll(async () => await db.connect());
  afterEach(async () => await db.clear());
  afterAll(async () => await db.close());

  it("should return all items", async () => {
    const response = await client.get("/api/items");
    expect(response.status).toBe(200);
  });
});
