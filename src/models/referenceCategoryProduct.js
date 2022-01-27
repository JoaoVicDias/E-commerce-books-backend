const { DataTypes } = require("sequelize");

const sequelize = require("./dataBase");

const referenceCategoryProduct = sequelize.define(
  "Reference_Category_Product",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }
);

module.exports = referenceCategoryProduct;
