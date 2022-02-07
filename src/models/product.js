const { DataTypes } = require("sequelize");

const sequelize = require("./dataBase");

const product = sequelize.define("Product", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  img: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  title: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = product;
