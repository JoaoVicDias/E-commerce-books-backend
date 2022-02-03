const { DataTypes } = require("sequelize");

const sequelize = require("./dataBase");

const referenceCheckoutProducts = sequelize.define(
  "Reference_Checkout_Products",
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
    checkoutId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    amount: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }
);

module.exports = referenceCheckoutProducts;
