const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");
const supertest = require("supertest");
const app = require("../../app");
const client = supertest(app);
const { expect } = require("expect");
const ReferenceManager = require("../../fixtures/ReferenceManager");

function interpolateString(str) {
  return str.replace(/\{\{\s*([^}]+)\s*\}\}/g, (match, name) => {
    return ReferenceManager.getValue(name);
  });
}
function interpolate(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = interpolateString(obj[key]);
    }
    if (typeof obj[key] === "object") {
      obj[key] = interpolate(obj[key]);
    }
  }
  return obj;
}

Given("I have a payload", function (dataTable) {
  this.payload = interpolate(dataTable.rowsHash());
});

Given("I am authenticated as {string}", function (string) {
  const user = ReferenceManager.getReference(string);
  // user => token
  this.token = "???";
});

When("I request {string} {string}", async function (method, path) {
  this.request = client[method.toLowerCase()](interpolateString(path));
  this.response = await this.request.send();
  // Write code here that turns the phrase above into concrete actions
});

When("I request {string} {string} with payload", async function (method, path) {
  this.request = client[method.toLowerCase()](interpolateString(path)).set(
    "Content-Type",
    "application/json"
  );
  this.response = await this.request.send(this.payload);
});

Then("the response code should be {int}", function (int) {
  // Write code here that turns the phrase above into concrete actions
  expect(this.response.status).toBe(int);
});

Then("I should receive an empty array", function () {
  // Write code here that turns the phrase above into concrete actions
  expect(this.request.data).toBe(undefined);
});

Then("I should receive an array with {int} elements", function (int) {
  // Write code here that turns the phrase above into concrete actions
  expect(this.response.body.length).toBe(int);
});

Then("I should have a property {string}", function (string) {
  // Write code here that turns the phrase above into concrete actions
  expect(this.response.body).toHaveProperty(string);
});

Then(
  "I should receive an element with the following attributes",
  function (dataTable) {
    const expected = interpolate(dataTable.rowsHash());
    const actual = this.response.body;
    expect(typeof actual).toBe("object");
    Object.keys(expected).forEach((key) => {
      expect(actual).toHaveProperty(key, expected[key]);
    });
  }
);
