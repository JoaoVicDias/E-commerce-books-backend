const userModel = require("../models/user");

const getUserByEmail = (email) => {
  return userModel.findOne({ where: { email } });
};

const createUser = (name, email, cpf, password, isAdmin) => {
  return userModel.create({
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
