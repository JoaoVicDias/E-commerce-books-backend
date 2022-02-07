const userModel = require("./user");
const categoryModel = require("./category");
const productModel = require("./product");
const checkoutModel = require("./checkout");
const referenceCategoryProductModel = require("./referenceCategoryProduct");
const referenceCheckoutProductsModel = require("./referenceCheckoutProducts");

module.exports = () => {
  userModel.hasMany(categoryModel, { foreignKey: "userId" });
  userModel.hasMany(productModel, { foreignKey: "userId" });
  userModel.hasMany(checkoutModel, { foreignKey: "userId" });

  productModel.belongsTo(userModel, { foreignKey: "userId" });
  productModel.hasMany(referenceCategoryProductModel, {
    foreignKey: "productId",
    as: "categorys",
  });
  productModel.hasMany(referenceCheckoutProductsModel, {
    foreignKey: "productId",
  });

  categoryModel.hasMany(referenceCategoryProductModel, {
    foreignKey: "categoryId",
  });
  categoryModel.belongsTo(userModel, { foreignKey: "userId" });

  checkoutModel.hasMany(referenceCheckoutProductsModel, {
    foreignKey: "checkoutId",
    as: "products",
  });
  checkoutModel.belongsTo(userModel, { foreignKey: "userId" });

  referenceCheckoutProductsModel.belongsTo(productModel, {
    foreignKey: "productId",
  });
  referenceCheckoutProductsModel.belongsTo(checkoutModel, {
    foreignKey: "checkoutId",
  });

  referenceCategoryProductModel.belongsTo(categoryModel, {
    foreignKey: "categoryId",
  });
  referenceCategoryProductModel.belongsTo(productModel, {
    foreignKey: "productId",
  });
};
