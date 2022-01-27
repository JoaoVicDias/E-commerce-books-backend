const express = require("express");
const { check } = require("express-validator");

const verifyToken = require("../middlewares/verifyToken");

const categoryControllers = require("../controllers/category");

const routes = express.Router();

routes.get("/", verifyToken, categoryControllers.onGetUserCategorys);
routes.get("/all", categoryControllers.onGetAllCategorys);

routes.post(
  "/",
  verifyToken,
  check("name").trim().not().isEmpty(),
  categoryControllers.onCreateCategory
);

routes.patch(
  "/:categoryId",
  check("name").trim().not().isEmpty(),
  verifyToken,
  categoryControllers.onUpdateCategory
);

routes.delete(
  "/:categoryId",
  verifyToken,
  categoryControllers.onDeleteCategory
);

module.exports = routes;
