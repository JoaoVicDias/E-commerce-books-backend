const categoryModel = require("../models/category");

const onCreateCategory = (name, userId) => {
  return categoryModel.create({ name, userId });
};

const onGetAllCategorys = () => {
  return categoryModel.findAndCountAll({
    attributes: ["id", "name"],
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

module.exports = {
  onCreateCategory,
  onGetAllCategorys,
  onGetCategoryById,
  onGetCategoryByUserId,
  onGetCategoryByName,
  onUpdateCategory,
};
