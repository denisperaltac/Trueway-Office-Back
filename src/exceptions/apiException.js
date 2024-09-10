const Exception = require("./exception");

class ApiException extends Exception {
  constructor(statusCode, message) {
    super(statusCode, message);
  }
}

module.exports = ApiException;
