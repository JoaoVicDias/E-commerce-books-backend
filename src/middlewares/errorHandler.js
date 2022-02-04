const fs = require('fs')

module.exports = (error, req, res, next) => {
  if(req.file) {
    fs.unlink(req.file.path, err => {
      concole.error(err)
    })
  }

  console.error(error);

  if (req.sentHeader) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "Algo deu errado, por favor tente novamente!",
  });
};
