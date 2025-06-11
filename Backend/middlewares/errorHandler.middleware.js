const logger = require("../utils/logger.util");
/**
 * Global error handler middleware
 */
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal Server Error";

  logger.error("Global Error Handler:", err);

  res.status(statusCode).json({
    success: false,
    message,
    // errors: err.errors || null,
    // stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}

module.exports = errorHandler;
