const errorWithResponse = require("./errorWithResponse");

class InvalidFields extends errorWithResponse {
  constructor() {
    super("Informações inválidas, por favor tente novamente!", 422);
  }
}

module.exports = InvalidFields;
