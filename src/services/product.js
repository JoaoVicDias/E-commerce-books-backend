const productModel = require("../models/product");

const onGetAllProducts = (filter, orderBy) => {
  return productModel.findAll({
    where: { ...filter },
    attributes: { exclude: ["userId"] },
    order: orderBy,
  });
};

const onGetProductsByUserId = (userId, filter, orderBy) => {
  return productModel.findAll({
    where: { userId, ...filter },
    attributes: { exclude: ["userId"] },
    order: orderBy,
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
