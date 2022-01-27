const express = require("express");

const userRoutes = require("./user");
const categoryRoutes = require("./category");
const productRoutes = require("./product");

const app = express();

app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);

module.exports = app;
