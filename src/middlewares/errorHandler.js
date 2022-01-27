module.exports = (error, req, res, next) => {
  console.error(error);

  if (req.sentHeader) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "Algo deu errado, por favor tente novamente!",
  });
};
