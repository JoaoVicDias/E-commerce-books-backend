const errorWithResponse = require("./errorWithResponse");

class BadDevNoCoffe extends errorWithResponse {
  constructor() {
    super("Algo deu errado, por favor tente novamente!", 500);
  }
}

module.exports = BadDevNoCoffe;
