const ErrorWithResponse = require("../errors/errorWithResponse");
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

const updateProduct = (productInformations, id) => {
  return productModel.update(productInformations, {
    where: { id },
  });
};

const getProductsfromCheckoutByIds = async (products) => {
  let productsList = products;

  for (let count = 0; count < productsList.length; count++) {
    try {
      const product = await onGetProductById(productsList[count].id);

      if (product.amount <= 0)
        throw new ErrorWithResponse("Esse produto esta esgotado!", 422);

      productsList[count] = { ...productsList[count], price: product.price };

      await updateProduct({ amount: product.amount - productsList[count].amount }, productsList[count].id)
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return productsList;
};

module.exports = {
  onCreateProduct,
  onGetAllProducts,
  onGetProductsByUserId,
  onGetProductById,
  onUpdateProduct,
  onDeleteProductById,
  getProductsfromCheckoutByIds,
};
