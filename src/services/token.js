const jwt = require("jsonwebtoken");
require("dotenv");

const getTokenWithInformations = (informations) => {
  return jwt.sign(informations, process.env.JWT_SECRET, { expiresIn: "16h" });
};

const onVerifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { getTokenWithInformations, onVerifyToken };
