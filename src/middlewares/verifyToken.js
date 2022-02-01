const errorWithResponse = require("../errors/errorWithResponse");

const tokenServices = require("../services/token");

module.exports = (req, res, next) => {

  const headers = req.headers.authorization

  if (!headers)
    return next(
      new errorWithResponse(
        "Precisa estar autenticado para acessar esta rota!",
        401
      )
    );

  const token = headers.split(" ")[1]

  if (!token)
    return next(
      new errorWithResponse(
        "Precisa estar autenticado para acessar esta rota!",
        401
      )
    );

  try {
    const decodedToken = tokenServices.onVerifyToken(token);

    req.user = { ...decodedToken };
    next();
  } catch (error) {
    console.error(error);
    throw new errorWithResponse(
      "Token inválido, faça a autenticação novamente!",
      403
    );
  }
};
