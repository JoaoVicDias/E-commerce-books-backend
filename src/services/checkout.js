const checkoutModel = require("../models/checkout");

const getAllCheckouts = (pagination, orderBy) => {
  return checkoutModel.findAndCountAll({
    offset: pagination.offset,
    limit: pagination.limit,
    order: orderBy,
  });
};

const getAllUserCheckouts = (pagination, orderBy, userId) => {
  return checkoutModel.findAndCountAll({
    where: { userId },
    offset: pagination.offset,
    limit: pagination.limit,
    order: orderBy,
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
