
const supertest = require("supertest");
const db = require("./db");
const client = supertest(require("../app.js"));
const mongoose = require("mongoose");


describe("test wishlist Api", () => {
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
      // .set("Content-Type", "application/json")
      .send({
        name: "Test wishlist",
        items: []
      });
    expect(response.status).toBe(200);
  });
  it("should create a new wishlist", async () => {
    let objectId = mongoose.Types.ObjectId(1)
    const item = { _id: objectId, name: "testitem", price: 4 }
    const response = await client
      .post("/api/wishlists")
      .set("Content-Type", "application/json")
      .send({
        name: "Test wishlist",
        items: [item._id]
      });

    // expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toBe("Test wishlist");
    expect(response.body.items[0]).toEqual(objectId);

    expect(response.status).toBe(200);


    //  expect(response.body.price).toBe(4);
  });
});
