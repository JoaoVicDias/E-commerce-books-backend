const userModel = require("../models/user");

const getUserByEmail = (email) => {
  return userModel.findOne({ where: { email } });
};

const createUser = (img, name, email, cpf, password, isAdmin) => {
  return userModel.create({
    img,
    name,
    email,
    cpf,
    password,
    isAdmin: isAdmin || false,
  });
};

const getUserByCpf = (cpf) => {
  return userModel.findOne({ where: { cpf } });
};

module.exports = { getUserByEmail, createUser, getUserByCpf };
