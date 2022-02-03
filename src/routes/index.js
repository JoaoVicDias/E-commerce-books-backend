const express = require("express");

const userRoutes = require("./user");
const categoryRoutes = require("./category");
const productRoutes = require("./product");
const checkoutRoutes = require("./checkout");

const app = express();

app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/checkout", checkoutRoutes)

module.exports = app;
