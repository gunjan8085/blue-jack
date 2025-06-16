class ApiError extends Error {
  /**
   *
   * @param {number} status HTTP status code (e.g., 400, 500)
   * @param {string} message A human-readable error message
   * @param {Array|Object} [errors] Additional error details (optional)
   * @param {string} [stack] Custom stack trace (optional)
   */
  constructor(
    status = 500,
    message = "Something went wrong",
    errors = null,
    stack = ""
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = status; // More accurate than 'status'
    this.success = false;
    this.errors = errors || null;
    this.data = null; // Reserved for adding structured data if needed later
    this.message = message;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
