const jwt = require("jsonwebtoken");
const { TOKENS } = require("../configs/constants.config");

module.exports = {
  generateToken: (userId, role, extraPayload = {}) => {
    let tokenSecret, tokenExpiry;

    switch (role) {
      case "Business":
        tokenSecret = TOKENS.BUSINESS.SECRET;
        tokenExpiry = TOKENS.BUSINESS.EXPIRY;
        break;

      case "User":
        tokenSecret = TOKENS.USER.SECRET;
        tokenExpiry = TOKENS.USER.EXPIRY;
        break;

      default:
        throw new Error("Invalid role provided for token generation");
    }

    const payload = {
      userId,
      role,
      issuedAt: Date.now(),
      ...extraPayload, // Optional custom data
    };

    return jwt.sign(payload, tokenSecret, { expiresIn: tokenExpiry });
  },
};
