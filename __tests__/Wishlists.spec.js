const supertest = require("supertest");
const db = require("./db");
const client = supertest(require("../app.js"));
const mongoose = require("mongoose");
const { ObjectId } = require("bson");
const Item = require("../models/items");
const Wishlist = require("../models/wishlists");

describe("test wishlist Api", () => {
  const itemMock = {
    _id: new ObjectId("0000000395bf3574aff700dc"),
    name: "Poudre",
    price: 5,
  };
  const wishlistMock = {
    _id: new ObjectId("0000000395bf3574aff700df"),
    name: "My Wishlist",
    items: [itemMock._id],
  };
  beforeEach((done) => {
    new Item(itemMock)
      .save()
      .then(() => done())
      .catch((err) => done(err));
    new Wishlist(wishlistMock)
      .save()
      .then(() => done())
      .catch((err) => done(err));
  });
  beforeAll(async () => await db.connect());
  afterEach(async () => await db.clear());
  afterAll(async () => await db.close());
  it("it should return all wishlists", async () => {
    const response = await client.get("/api/wishlists");
    expect(response.status).toBe(200);
  });
  it("should create a return code 200", async () => {
    const response = await client
      .post("/api/wishlists")
      .set("Content-Type", "application/json")
      .send({
        name: "Test wishlist",
        items: [],
      });
    expect(response.status).toBe(200);
  });
  it("should create a new wishlist", async () => {
    let objectId = new ObjectId("0000000395bf3574aff700dc");
    const item = { _id: objectId, name: "testitem", price: 4 };
    const response = await client
      .post("/api/wishlists")
      .set("Content-Type", "application/json")
      .send({
        name: "Test wishlist",
        items: [item._id],
      });
    expect(response.body.name).toBe("Test wishlist");
    expect(JSON.stringify(response.body.items[0])).toBe(
      JSON.stringify(item._id)
    );

    expect(response.status).toBe(200);
  });

  it("should not create a new wishlist if missing wishlist", async () => {
    const response = await client
      .post("/api/wishlists")
      .set("Content-Type", "application/json")
      .send({});

    expect(response.status).toBe(500);
  });

  it("should modify wishlist", async () => {
    let objectId = new ObjectId("0000000395bf3574aff700dc");
    const item = { _id: objectId, name: "testitem", price: 4 };
    const response = await client
      .put("/api/wishlists/0000000395bf3574aff700df")
      .set("Content-Type", "application/json")
      .send({
        name: "Wish",
        items: [item._id],
      });
    expect(response.status).toBe(200);
    expect(response.body.result.name).toBe("Wish");
  });
  it("should get:id", async () => {
    const response = await client
      .get("/api/wishlists/0000000395bf3574aff700df")
      .set("Content-Type", "application/json");

    expect(response.body.result.name).toBe("My Wishlist");
    expect(response.body.result.items[0]).toBe("0000000395bf3574aff700dc");
  });
  it("should return error if get invalid id", async () => {
    const response = await client.get("/api/wishlists/string");
    expect(response.status).toBe(404);
  });
  it("should return status error and error message if get invalid id", async () => {
    const response = await client.get("/api/wishlists/string");
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ msg: "wishlist not found" });
  });
  it("should delete wishlist", async () => {
    const response = await client
      .delete("/api/items/0000000395bf3574aff700df")
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.body.name).toBeUndefined;
  });
});
