const express = require("express");
const { check } = require("express-validator");

const productControllers = require("../controllers/products");

const verifyToken = require("../middlewares/verifyToken");
const verifyIsAdmin = require("../middlewares/verifyIsAdmin");
const fileUpload = require("../middlewares/fileUpload");

const routes = express.Router();

routes.get("/", verifyToken, productControllers.getUserProducts);
routes.get("/all", productControllers.getAllproducts);
routes.get("/browser/:productId", productControllers.getProduct);

routes.post(
  "/",
  verifyToken,
  verifyIsAdmin,
  fileUpload.single("image"),
  [
    check("title").trim().notEmpty(),
    check("description").trim().notEmpty(),
    check("price").trim().notEmpty().isFloat({ locale: 'pt-BR'}),
    check("amount").trim().notEmpty().isNumeric(),
    check("categorys").notEmpty(),
  ],
  productControllers.createProduct
);

routes.patch(
  "/:productId",
  verifyToken,
  [
    check("title").trim().notEmpty().optional(),
    check("description").trim().notEmpty().optional(),
    check("price").trim().notEmpty().optional().isNumeric(),
    check("amount").trim().notEmpty().optional().isNumeric(),
  ],
  productControllers.updateProduct
);

routes.delete("/:productId", verifyToken, productControllers.deleteProduct);

module.exports = routes;
