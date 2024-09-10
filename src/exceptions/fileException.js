const Exception = require("./exception");

class FileException extends Exception {
  constructor(statusCode, message) {
    super(statusCode, message);
  }
}

module.exports = { FileException };
