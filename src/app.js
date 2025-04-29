const express = require("express");
const db = require("./lib/db");
const {
  isUndefinedOrNullOrEmpty,
  isUndefinedOrNull,
} = require("./utils/validate");
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/api/products", async (req, res) => {
  const { name, price, quantity } = req.body;

  if (isUndefinedOrNullOrEmpty(name) || isUndefinedOrNull(price, quantity))
    return res.status(400).json({ error: "Invalid body provided." });

  try {
    const product = await db.product.create({
      data: { name, price, quantity },
    });
    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "A server error has occured" });
  }
});

app.get("/api/products", async (req, res) => {
  const products = await db.product.findMany();
  return res.json(products || []);
});

app.get("/api/products/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await db.product.findUnique({ where: { id } });
  if (!product) return res.status(404).json({ error: "Product not found" });
  return res.json(product);
});

app.patch("/api/products/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, quantity } = req.body;

  try {
    const product = await db.product.update({
      where: { id },
      data: { name, price, quantity },
    });
    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "A server error has occured" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await db.product.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "A server error has occured" });
  }
});

module.exports = app;
