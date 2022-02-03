const express = require("express");
const { check } = require("express-validator");

const verifyToken = require("../middlewares/verifyToken");
const verifyIsAdmin = require("../middlewares/verifyIsAdmin");

const checkoutControllers = require("../controllers/checkout");

const router = express.Router();

router.get("/", verifyToken, checkoutControllers.getAllUserCategory);
router.get(
  "/all",
  verifyToken,
  verifyIsAdmin,
  checkoutControllers.getAllCategorys
);

router.post(
  "/",
  verifyToken,
  check("products").isArray().notEmpty(),
  checkoutControllers.createCheckout
);

router.delete("/:checkoutId", verifyToken, checkoutControllers.deleteCheckout);

module.exports = router;
