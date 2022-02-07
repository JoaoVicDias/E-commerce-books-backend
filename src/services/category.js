const categoryModel = require("../models/category");

const onCreateCategory = (name, userId) => {
  return categoryModel.create({ name, userId });
};

const onGetAllCategorys = (filter, pagination) => {
  return categoryModel.findAndCountAll({
    where: { ...filter },
    attributes: ["id", "name"],
    offset: pagination.offset,
    limit: pagination.limit,
  });
};

const onGetCategoryById = (id) => {
  return categoryModel.findOne({ where: { id } });
};

const onGetCategoryByUserId = (userId, filter, pagination) => {
  return categoryModel.findAndCountAll({
    where: { userId, ...filter },
    attributes: ["id", "name"],
    offset: pagination.offset,
    limit: pagination.limit,
  });
};

const onGetCategoryByName = (name) => {
  return categoryModel.findOne({ where: { name } });
};

const onUpdateCategory = (categoryInformations, categoryId) => {
  return categoryModel.update(categoryInformations, {
    where: { id: categoryId },
  });
};

const onDeleteCategory = (categoryId) => {
  return categoryModel.destroy({ where: { id: categoryId } });
};

module.exports = {
  onCreateCategory,
  onGetAllCategorys,
  onGetCategoryById,
  onGetCategoryByUserId,
  onGetCategoryByName,
  onUpdateCategory,
  onDeleteCategory,
};
