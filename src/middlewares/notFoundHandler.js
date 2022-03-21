const errorWithResponse = require("../errors/errorWithResponse");

module.exports = (req, res, next) => {
  return next(new errorWithResponse(
    "Não foi possível encontrar esta rota, por favor tente novamente!",
    404
  ));
};
