const { validationResult } = require("express-validator");

const queryServices = require("../services/query");
const referenceCheckoutProductsServices = require("../services/referenceCheckoutProducts");
const checkoutServices = require("../services/checkout");
const productsServices = require("../services/product");

const badDevNoCoffe = require("../errors/badDevNoCoffe");
const invalidFiels = require("../errors/invalidFields");
const errorWithResponse = require("../errors/errorWithResponse");

const getAllCheckouts = async (req, res, next) => {
  const { offset, limit, orderBy } = req.query;

  const pagination = queryServices.treatesPagination(offset, limit);
  const treatedOrderBy = queryServices.treatsOrderBy(orderBy);

  let checkouts = [];
  let count = 0;

  try {
    const response = await checkoutServices.getAllCheckouts(
      pagination,
      treatedOrderBy
    );
    checkouts = response.rows;
    count = response.count;
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  res.json({ results: checkouts, count });
};

const getAllUserCheckout = async (req, res, next) => {
  const { offset, limit, orderBy } = req.query;

  const pagination = queryServices.treatesPagination(offset, limit);
  const treatedOrderBy = queryServices.treatsOrderBy(orderBy);

  let checkouts = [];
  let count = 0;

  try {
    const response = await checkoutServices.getAllUserCheckouts(
      pagination,
      treatedOrderBy,
      req.user.id
    );
    checkouts = response.rows;
    count = response.count;
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  res.json({ results: checkouts, count });
};

const createCheckout = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return next(new invalidFiels());

  const { products } = req.body;

  let productsList = [];

  try {
    productsList = await productsServices.getProductsfromCheckoutByIds(
      products
    );
  } catch (error) {
    console.error(error);
    return next(error || new badDevNoCoffe());
  }

  const totalValue = productsList
    .map((product) => product.amount * product.price)
    .reduce((sum, number) => (sum += number), 0);

  let createdCheckout;
  try {
    createdCheckout = await checkoutServices.createCheckout(
      totalValue,
      req.user.id
    );
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  try {
    await referenceCheckoutProductsServices.createReference(
      productsList,
      createdCheckout.id
    );
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  res.status(201).json(createdCheckout);
};

const deleteCheckout = async (req, res, next) => {
  const { checkoutId } = req.params;

  let existingCheckout;
  try {
    existingCheckout = await checkoutServices.getCheckoutById(checkoutId);

    if (!existingCheckout)
      return next(new errorWithResponse("Checkout não encontrado!", 404));

    if (req.user.id !== existingCheckout.userId)
      return next(new errorWithResponse("Você não pode deletar!", 403));
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  try {
    await checkoutServices.deleteCheckoutById(checkoutId);
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  try {
    await referenceCheckoutProductsServices.deleteReference(checkoutId);
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  res.json({ message: "Checkout deletado com sucesso!" });
};

module.exports = {
  getAllCheckouts,
  getAllUserCheckout,
  createCheckout,
  deleteCheckout,
};
