const errorWithResponse = require("../errors/errorWithResponse");

const productModel = require("../models/product");
const categoryModel = require("../models/category");
const referenceCategoryProductModel = require("../models/referenceCategoryProduct");

const onGetAllProducts = (filter, orderBy, pagination, categoryFilter) => {
  return productModel.findAndCountAll({
    where: { ...filter },
    order: orderBy,
    offset: pagination.offset,
    limit: pagination.limit,
    include: [
      {
        model: referenceCategoryProductModel,
        foreignKey: "productId",
        as: "categorys",
        where: { ...categoryFilter },
        include: [
          {
            model: categoryModel,
            foreignKey: "categoryId",
          },
        ],
      },
    ],
  });
};

const onGetProductsByUserId = (
  userId,
  filter,
  orderBy,
  pagination,
  categoryFilter
) => {
  return productModel.findAndCountAll({
    where: { userId, ...filter },
    attributes: { exclude: ["userId"] },
    order: orderBy,
    offset: pagination.offset,
    limit: pagination.limit,
    include: [
      {
        model: referenceCategoryProductModel,
        foreignKey: "productId",
        as: "categorys",
        where: { ...categoryFilter },
        include: [
          {
            model: categoryModel,
            foreignKey: "categoryId",
          },
        ],
      },
    ],
  });
};

const onGetProductById = (id) => {
  return productModel.findOne({
    where: { id },
    include: [
      {
        model: referenceCategoryProductModel,
        foreignKey: "productId",
        as: "categorys",
        include: [
          {
            model: categoryModel,
            foreignKey: "categoryId",
          },
        ],
      },
    ],
  });
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

const getProductsfromCheckoutByIds = async (products) => {
  let productsList = [...new Set(products)];

  for (let count = 0; count < productsList.length; count++) {
    try {
      const product = await onGetProductById(productsList[count].id);

      if (product.amount <= 0)
        throw new errorWithResponse("Esse produto esta esgotado!", 422);

      if (product.amount < productsList[count].amount)
        throw new errorWithResponse(
          product.amount > 1
            ? `S?? existem ${product.amount} unidades!`
            : `S?? existe ${product.amount} unidade!`,
          422
        );

      productsList[count] = { ...productsList[count], price: product.price };

      await onUpdateProduct(
        { amount: product.amount - productsList[count].amount },
        productsList[count].id
      );
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
