const categoryModel = require("../models/category");

const referenceCategoryProductServices = require("../services/referenceCategoryProduct");

const badDevNoCoffe = require("../errors/badDevNoCoffe");

const onCreateCategory = (name, userId) => {
  return categoryModel.create({ name, userId });
};

const onGetAllCategorys = () => {
  return categoryModel.findAll({ attributes: ["id", "name"] });
};

const onGetCategoryById = (id) => {
  return categoryModel.findOne({ where: { id } });
};

const onGetCategoryByUserId = (userId) => {
  return categoryModel.findAll({
    where: { userId },
    attributes: ["id", "name"],
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

const onGetAllCategorysFromOneProduct = async (productId) => {
  let categorysReferences = [];
  try {
    categorysReferences =
      await referenceCategoryProductServices.onGetAllReferenceCategoryProductByProductId(
        productId
      );
  } catch (error) {
    console.error(error);
    throw new badDevNoCoffe();
  }

  let categorys = [];

  for (let count = 0; count < categorysReferences.length; count++) {
    const categoryId = categorysReferences[count].categoryId;

    try {
      const category = await onGetCategoryById(categoryId);
      categorys.push(category);
    } catch (error) {
      console.error(error);
      throw new badDevNoCoffe();
    }
  }

  return categorys;
};

module.exports = {
  onCreateCategory,
  onGetAllCategorys,
  onGetCategoryById,
  onGetCategoryByUserId,
  onGetCategoryByName,
  onUpdateCategory,
  onDeleteCategory,
  onGetAllCategorysFromOneProduct,
};
