const express = require("express");
const { check } = require("express-validator");

const verifyToken = require("../middlewares/verifyToken");
const verifyIsAdmin = require("../middlewares/verifyIsAdmin");

const categoryControllers = require("../controllers/category");

const routes = express.Router();

routes.get("/", verifyToken, categoryControllers.onGetUserCategorys);
routes.get("/all", categoryControllers.onGetAllCategorys);

routes.post(
  "/",
  verifyToken,
  verifyIsAdmin,
  check("name").trim().notEmpty(),
  categoryControllers.onCreateCategory
);

routes.patch(
  "/:categoryId",
  check("name").trim().notEmpty(),
  verifyToken,
  categoryControllers.onUpdateCategory
);

module.exports = routes;
