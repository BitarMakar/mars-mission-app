const request = require("supertest");
const app = require("../src/app");
const db = require("../src/lib/db");

let createdProduct = null;

afterAll(async () => {
  await db.$disconnect();
});

describe("Product API", () => {
  it("should create a new product", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Test Product",
      price: 10.99,
      quantity: 5,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Test Product");

    createdProduct = res.body;
  });

  it("should fetch all products", async () => {
    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should fetch a product by ID", async () => {
    const res = await request(app).get(`/api/products/${createdProduct.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", createdProduct.id);
    expect(res.body.name).toBe("Test Product");
  });

  it("should update the product", async () => {
    const res = await request(app)
      .patch(`/api/products/${createdProduct.id}`)
      .send({
        name: "Updated Product",
        price: 12.99,
        quantity: 10,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Product");
    expect(res.body.quantity).toBe(10);
  });

  it("should delete the product", async () => {
    const res = await request(app).delete(`/api/products/${createdProduct.id}`);
    expect(res.statusCode).toBe(204);
  });

  it("should return 404 when trying to fetch deleted product", async () => {
    const res = await request(app).get(`/api/products/${createdProduct.id}`);
    expect(res.statusCode).toBe(404);
  });
});
