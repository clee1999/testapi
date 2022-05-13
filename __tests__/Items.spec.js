const supertest = require("supertest");
const Item = require("../models/items");
const db = require("./db");
const { ObjectId } = require("bson");
const client = supertest(require("../app.js"));
const mongoose = require("mongoose");
const request = require("supertest");
const { app } = require("../app");
process.env.NODE_ENV = "test";

describe("test Items Api", () => {
  const insertedData = {
    _id: new ObjectId("0000000395bf3574aff700dc"),
    name: "Poudre",
    price: 5,
  };
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
    const response = await request(app).get("/api/items");
    expect(response.status).toBe(200);
  });
  it("should be able to create a item and receive good code", async () => {
    const response = await request(app).post("/api/items").send({
      name: "Test item",
      price: 4,
    });

    expect(response.status).toBe(201);
  });
  it("should create a new item with good propeties", async () => {
    const response = await request(app)
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
    const response = await request(app)
      .post("/api/items")
      .set("Content-Type", "application/json")
      .send({
        name: "Test item",
      });
    expect(response.status).toBe(500);
  });
  it("should not create a new item with empty values", async () => {
    const response = await request(app)
      .post("/api/items")
      .set("Content-Type", "application/json")
      .send({});
    expect(response.status).toBe(500);
  });
  it("should modify item", async () => {
    const response = await request(app)
      .put("/api/items/0000000395bf3574aff700dc")
      .set("Content-Type", "application/json")
      .send({
        name: "Test item",
        price: 4,
      });
    expect(response.body.name).toBe("Test item");
    expect(response.body.price).toBe(4);
  });

  it("should get:id", async () => {
    const response = await request(app)
      .get("/api/items/0000000395bf3574aff700dc")
      .set("Content-Type", "application/json");

    expect(response.body.result.name).toBe("Poudre");
    expect(response.body.result.price).toBe(5);
  });

  it("should return error if get invalid id", async () => {
    const response = await request(app).get("/api/items/string");
    expect(response.status).toBe(404);
  });

  it("should return get response 200", async () => {
    const response = await request(app).get(
      "/api/items/627e135500bae649f538558e"
    );
    expect(response.status).toBe(200);
  });

  it("should return status error and error message if get invalid id", async () => {
    const response = await request(app).get("/api/items/string");
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ msg: "item not found" });
  });

  it("should delete item", async () => {
    const response = await request(app)
      .delete("/api/items/0000000395bf3574aff700dc")
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body.name).toBeUndefined;
  });

  it("should not delete item if no existing", async () => {
    const response = await request(app)
      .delete("/api/items/string")
      .set("Content-Type", "application/json");
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ msg: "item not found" });
  });
});
