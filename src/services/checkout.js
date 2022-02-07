const checkoutModel = require("../models/checkout");
const referenceCheckoutProductsModel = require("../models/referenceCheckoutProducts");
const productModel = require("../models/product");

const getAllCheckouts = (pagination, orderBy) => {
  return checkoutModel.findAll({
    offset: pagination.offset,
    limit: pagination.limit,
    order: orderBy,
    include: [
      {
        model: referenceCheckoutProductsModel,
        foreignKey: "checkoutId",
        as: "products",
        include: [{ model: productModel, foreignKey: "productId" }],
      },
    ],
  });
};

const getAllUserCheckouts = (pagination, orderBy, userId) => {
  return checkoutModel.findAll({
    where: { userId },
    offset: pagination.offset,
    limit: pagination.limit,
    order: orderBy,
    include: [
      {
        model: referenceCheckoutProductsModel,
        foreignKey: "checkoutId",
        as: "products",
        include: [{ model: productModel, foreignKey: "productId" }],
      },
    ],
  });
};

const getCheckoutById = (id) => {
  return checkoutModel.findOne({ where: { id } });
};

const createCheckout = (total_value, userId) => {
  return checkoutModel.create({ total_value, userId });
};

const deleteCheckoutById = (id) => {
  return checkoutModel.destroy({ where: { id } });
};

module.exports = {
  getAllCheckouts,
  createCheckout,
  getAllUserCheckouts,
  getCheckoutById,
  deleteCheckoutById,
};
