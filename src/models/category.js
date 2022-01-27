const { DataTypes } = require("sequelize");

const referenceCategoryProductModel = require("./referenceCategoryProduct");
const userModel = require("./user");

const sequelize = require("./dataBase");

const category = sequelize.define("Category", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  name: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

category.hasMany(referenceCategoryProductModel, { foreignKey: "categoryId" });
category.belongsTo(userModel, { foreignKey: "userId" });

module.exports = category;
