const productModel = require("../models/product");

const onGetAllProducts = (filter, orderBy, pagination) => {
  return productModel.findAndCountAll({
    where: { ...filter },
    attributes: { exclude: ["userId"] },
    order: orderBy,
    offset: pagination.offset,
    limit: pagination.limit,
  });
};

const onGetProductsByUserId = (userId, filter, orderBy, pagination) => {
  return productModel.findAndCountAll({
    where: { userId, ...filter },
    attributes: { exclude: ["userId"] },
    order: orderBy,
    offset: pagination.offset,
    limit: pagination.limit,
  });
};

const onGetProductById = (id) => {
  return productModel.findOne({ where: { id } });
};

const onCreateProduct = (productInformations) => {
  return productModel.create({ ...productInformations });
};

const onUpdateProduct = (productInformations, id) => {
  return productModel.update(productInformations, { where: { id } });
};

const onDeleteProductById = (id) => {
  return productModel.destroy({ where: { id } });
};

module.exports = {
  onCreateProduct,
  onGetAllProducts,
  onGetProductsByUserId,
  onGetProductById,
  onUpdateProduct,
  onDeleteProductById,
};
