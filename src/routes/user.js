const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/user");

const fileUpload = require("../middlewares/fileUpload");

const routes = express.Router();

routes.post(
  "/sign-up",
  fileUpload.single("img"),
  [
    check("name").trim().not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("cpf").trim().isNumeric().isLength({ min: 11, max: 11 }),
    check("password").trim().isLength({ min: 8 }),
  ],
  userControllers.signUpController
);
routes.post(
  "/sign-in",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").trim().isLength({ min: 8 }),
  ],
  userControllers.signInController
);

module.exports = routes;
