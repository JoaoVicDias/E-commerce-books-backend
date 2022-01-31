const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

const productServices = require("../services/product");
const referenceCategoryProductServices = require("../services/referenceCategoryProduct");
const categoryServices = require("../services/category");
const queryServices = require("../services/query");

const badDevNoCoffe = require("../errors/badDevNoCoffe");
const invalidFields = require("../errors/invalidFields");
const errorWithResponse = require("../errors/errorWithResponse");

const getAllproducts = async (req, res, next) => {
  const { title, priceLt, priceGt, category, orderBy, offset, limit } =
    req.query;

  const filter = {};
  const pagination = queryServices.treatesPagination(offset, limit);

  const orderByFilter = queryServices.treatsOrderBy(orderBy);

  if (title) filter.title = { [Op.like]: `%${title}%` };
  if (priceLt) filter.price = { ...filter.price, [Op.lte]: priceLt };
  if (priceGt) filter.price = { ...filter.price, [Op.gte]: priceGt };

  let products = [];
  let count = 0;

  try {
    const response = await productServices.onGetAllProducts(
      filter,
      orderByFilter,
      pagination
    );
    products = response.rows;
    count = response.count;
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  for (let loopCount = 0; loopCount < products.length; loopCount++) {
    const productId = products[loopCount].id;

    let categorys = [];

    try {
      categorys = await categoryServices.onGetAllCategorysFromOneProduct(
        productId
      );
      products[loopCount] = { ...products[loopCount].dataValues, categorys };
    } catch (error) {
      console.error(error);
      return next(new badDevNoCoffe());
    }
  }

  if (category)
    products = products.filter((product) =>
      product.categorys.find((categoryParam) => categoryParam.id === category)
    );

  res.status(200).json({ results: products, count });
};

const getUserProducts = async (req, res, next) => {
  const { title, priceLt, priceGt, category, orderBy, offset, limit } =
    req.query;

  const filter = {};
  const pagination = queryServices.treatesPagination(offset, limit);
  const orderByFilter = queryServices.treatsOrderBy(orderBy);

  if (title) filter.title = { [Op.like]: `%${title}%` };
  if (priceLt) filter.price = { ...filter.price, [Op.lte]: priceLt };
  if (priceGt) filter.price = { ...filter.price, [Op.gte]: priceGt };

  let products = [];
  let count = 0;

  try {
    const response = await productServices.onGetProductsByUserId(
      req.user.id,
      filter,
      orderByFilter,
      pagination
    );
    products = response.rows;
    count = response.count;
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  for (let loopCount = 0; loopCount < products.length; loopCount++) {
    const productId = products[loopCount].id;

    try {
      const productsCategorys =
        await categoryServices.onGetAllCategorysFromOneProduct(productId);

      products[loopCount] = {
        ...products[loopCount].dataValues,
        categorys: productsCategorys,
      };
    } catch (error) {
      console.error(error);
      return next(new badDevNoCoffe());
    }
  }

  if (category)
    products = products.filter((product) =>
      product.categorys.find((categoryParam) => categoryParam.id === category)
    );

  res.status(200).json({ results: products, count });
};

const getProduct = async (req, res, next) => {
  const { productId } = req.params;

  let existingProduct;
  try {
    existingProduct = await productServices.onGetProductById(productId);

    if (!existingProduct)
      return next(new errorWithResponse("Esse produto não existe", 404));
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  let productsCategorys = [];

  try {
    productsCategorys = await categoryServices.onGetAllCategorysFromOneProduct(
      productId
    );
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  res
    .status(200)
    .json({ ...existingProduct.dataValues, categorys: productsCategorys });
};

const createProduct = async (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return next(new invalidFields());

  if (!req.user.isAdmin)
    return next(new errorWithResponse("Você não pode criar um produto!", 403));

  const { img, title, description, amount, price, categorys } = req.body;

  let createdProduct;

  try {
    createdProduct = await productServices.onCreateProduct({
      img,
      title,
      description,
      amount,
      price,
      userId: req.user.id,
    });
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  try {
    await referenceCategoryProductServices.onCreateReferenceCategoryProductModel(
      createdProduct.id,
      categorys
    );
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  let productCategorys = [];

  try {
    productCategorys = await categoryServices.onGetAllCategorysFromOneProduct(
      createdProduct.id
    );
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  res
    .status(201)
    .json({ ...createdProduct.dataValues, categorys: productCategorys });
};

const updateProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new invalidFields());

  const { productId } = req.params;

  try {
    const existingProduct = await productServices.onGetProductById(productId);

    if (!existingProduct)
      return next(new errorWithResponse("Esse produto não existe!", 404));

    if (existingProduct.userId !== req.user.id)
      return next(
        new errorWithResponse("Você não pode editar esse produto!", 403)
      );
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  try {
    await productServices.onUpdateProduct(req.body, productId);
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  let updatedProduct;
  try {
    updatedProduct = await productServices.onGetProductById(productId);
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  let categorys = [];

  try {
    categorys = await categoryServices.onGetAllCategorysFromOneProduct(
      productId
    );
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  res.status(200).json({ ...updatedProduct.dataValues, categorys });
};

const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const existingProduct = await productServices.onGetProductById(productId);
    if (!existingProduct)
      return next(new errorWithResponse("Esse produto não existe!", 404));

    if (req.user.id !== existingProduct.userId)
      return next(
        new errorWithResponse("Você não pode editar esse produto!", 403)
      );
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  try {
    await productServices.onDeleteProductById(productId);
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  try {
    await referenceCategoryProductServices.onDeleteReferenceByProductId(
      productId
    );
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  res.status(200).json({ message: "Produto deletado com sucesso!" });
};

module.exports = {
  getAllproducts,
  getUserProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
