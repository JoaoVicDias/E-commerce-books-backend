const ErrorWithResponse = require("../errors/errorWithResponse");

module.exports = (req, res, next) => {
  if (!req.user.isAdmin)
    return next(
      new ErrorWithResponse(
        "Somente usuarios administradores podem acessar essa rota!",
        403
      )
    );

  next();
};
