const { DataTypes } = require("sequelize");

const referenceCheckoutProducts = require('./referenceCheckoutProducts')

const sequelize = require("./dataBase");

const checkout = sequelize.define("Checkout", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  total_value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  }
});

checkout.hasMany(referenceCheckoutProducts, { foreignKey: "checkoutId" });

module.exports = checkout;
