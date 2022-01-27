const bcrypt = require("bcrypt");

const onEncryptPassword = (password) => {
  return bcrypt.hash(password, 12);
};

const onComparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = { onEncryptPassword, onComparePassword };
