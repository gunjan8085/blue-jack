const Joi = require("joi");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/apiError.util");

/**
 * Middleware to validate request using Joi schemas
 */
const validate = (schema) => (req, res, next) => {
  const isJsonContentType = req.is("application/json");
  const isFormDataContentType = req.is("multipart/form-data");

  if (
    Object.keys(req.body).length !== 0 &&
    !isJsonContentType &&
    !isFormDataContentType
  ) {
    return next(
      new ApiError(
        httpStatus.UNSUPPORTED_MEDIA_TYPE,
        "Unsupported content type. Only JSON and form-data are supported."
      )
    );
  }

  const validSchema = pick(schema, [
    "params",
    "query",
    "body",
    "file",
    "files",
  ]);
  const object = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    // Clear memory buffers if validation fails (file uploads)
    if (req.file) req.file.buffer = null;
    if (Array.isArray(req.files)) {
      req.files.forEach((file) => (file.buffer = null));
    } else if (typeof req.files === "object" && req.files !== null) {
      Object.keys(req.files).forEach((key) =>
        req.files[key].forEach((file) => {
          file.buffer = null;
        })
      );
    }

    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
