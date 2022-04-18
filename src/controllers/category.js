const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

const categoryServices = require("../services/category");
const referenceCategoryProductServices = require("../services/referenceCategoryProduct");
const queryServices = require("../services/query");

const invalidFields = require("../errors/invalidFields");
const badDevNoCoffe = require("../errors/badDevNoCoffe");
const errorWithResponse = require("../errors/errorWithResponse");

const onCreateCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new invalidFields());

  const { name } = req.body;

  try {
    const existingCategory = await categoryServices.onGetCategoryByName(name);
    if (existingCategory)
      return next(new errorWithResponse("Essa categoria já existe!", 422));
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  let createdCategory;

  try {
    createdCategory = await categoryServices.onCreateCategory(
      name,
      req.user.id
    );
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  res.status(201).json(createdCategory);
};

const onGetAllCategorys = async (req, res, next) => {
  let categorys = [];
  let count = 0;

  try {
    const response = await categoryServices.onGetAllCategorys();

    categorys = response.rows;
    count = response.count;
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  res.json({ count, results: categorys });
};

const onGetUserCategorys = async (req, res, next) => {
  const { name, offset, limit } = req.query;

  const filter = {};
  const pagination = queryServices.treatesPagination(offset, limit);

  if (name) filter.name = { [Op.like]: `%${name}%` };

  let categorys = [];
  let count = 0;

  try {
    const response = await categoryServices.onGetCategoryByUserId(
      req.user.id,
      filter,
      pagination
    );

    categorys = response.rows;
    count = response.count;
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  res.json({ results: categorys, count });
};

const onUpdateCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new invalidFields());

  const { categoryId } = req.params;

  try {
    const category = await categoryServices.onGetCategoryById(categoryId);

    if (!category)
      return next(new errorWithResponse("Categoria não existe!", 404));

    if (category.userId !== req.user.id)
      return next(
        new errorWithResponse(
          "Você não tem permissão para editar esta categoria!",
          403
        )
      );
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  try {
    await categoryServices.onUpdateCategory(req.body, categoryId);
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  let editedCategory;
  try {
    editedCategory = await categoryServices.onGetCategoryById(categoryId);
  } catch (error) {
    console.error(error);
    return next(new badDevNoCoffe());
  }

  res.status(200).json(editedCategory);
};

module.exports = {
  onCreateCategory,
  onGetAllCategorys,
  onGetUserCategorys,
  onUpdateCategory,
};
