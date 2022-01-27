const productModel = require("../models/product");

const onGetAllProducts = () => {
  return productModel.findAll({ attributes: { exclude: ["userId"] }});
};

const onGetProductsByUserId = (userId) => {
  return productModel.findAll({
    where: { userId },
    attributes: { exclude: ["userId"] },
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
