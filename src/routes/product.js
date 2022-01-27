const express = require("express");
const { check } = require("express-validator");

const productControllers = require("../controllers/products");

const verifyToken = require("../middlewares/verifyToken");

const routes = express.Router();

routes.get("/", verifyToken, productControllers.getUserProducts);
routes.get("/all", productControllers.getAllproducts);
routes.get("/browser/:productId", productControllers.getProduct);

routes.post(
  "/",
  verifyToken,
  [
    check("img").notEmpty(),
    check("title").trim().notEmpty(),
    check("description").trim().notEmpty(),
    check("price").trim().notEmpty().isNumeric(),
    check("amount").trim().notEmpty().isNumeric(),
    check("categorys").isArray().notEmpty(),
  ],
  productControllers.createProduct
);

routes.patch(
  "/:productId",
  verifyToken,
  [
    check("title").trim().notEmpty(),
    check("description").trim().notEmpty(),
    check("price").trim().notEmpty().isNumeric(),
    check("amount").trim().notEmpty().isNumeric(),
  ],
  productControllers.updateProduct
);

routes.delete("/:productId", verifyToken, productControllers.deleteProduct);

module.exports = routes;
