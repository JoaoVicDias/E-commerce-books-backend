const badDevNoCoffe = require("../errors/badDevNoCoffe");
const referenceCategoryProductModel = require("../models/referenceCategoryProduct");

const onCreateReferenceCategoryProductModel = async (productId, categoryId) => {
  if (!Array.isArray(categoryId))
    return referenceCategoryProductModel.create({ productId, categoryId });

  for (let count = 0; count < categoryId.length; count++) {
    try {
      await referenceCategoryProductModel.create({
        categoryId: categoryId[count],
        productId,
      });
    } catch (error) {
      console.error(error);
      throw new badDevNoCoffe();
    }
  }
};

const onGetAllReferenceCategoryProductByProductId = (productId) => {
  return referenceCategoryProductModel.findAll({ where: { productId } });
};

const onDeleteReferenceByProductId = (productId) => {
  return referenceCategoryProductModel.destroy({ where: { productId } });
};

const onDeleteReferenceByCategoryId = (categoryId) => {
  return referenceCategoryProductModel.destroy({ where: { categoryId } });
};

module.exports = {
  onCreateReferenceCategoryProductModel,
  onGetAllReferenceCategoryProductByProductId,
  onDeleteReferenceByProductId,
  onDeleteReferenceByCategoryId,
};
