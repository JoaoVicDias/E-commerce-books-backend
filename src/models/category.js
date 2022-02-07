const { DataTypes } = require("sequelize");

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

module.exports = category;
