const Exception = require("./exception");

class UnauthorizedException extends Exception {
  constructor(statusCode, message) {
    super(statusCode, message);
  }
}

module.exports = { UnauthorizedException };
