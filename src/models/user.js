const { DataTypes } = require("sequelize");

const sequelize = require("./dataBase");

const user = sequelize.define("User", {
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
  name: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  email: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  password: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = user;
