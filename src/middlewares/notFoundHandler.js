const errorWithResponse = require("../errors/errorWithResponse");

module.exports = (req, res, next) => {
  const newError = new errorWithResponse(
    "Não foi possível encontrar esta rota, por favor tente novamente!",
    404
  );

  return next(newError);
};
