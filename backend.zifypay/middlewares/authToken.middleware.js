const jwt = require("jsonwebtoken");
require("dotenv").config();
const { TOKENS } = require("../configs/constants.config");

module.exports = {
  authenticateBusinessToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "No token provided." });
    }

    jwt.verify(token, TOKENS.BUSINESS.SECRET, (err, decoded) => {
      if (err) {
        console.error(err);
        return res
          .status(401)
          .json({ success: false, message: "Invalid token." });
      }

      req.user = decoded;
      // console.log(decoded);
      next();
    });
  },

  authenticateUserToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "No token provided." });
    }

    jwt.verify(token, TOKENS.USER.SECRET, (err, decoded) => {
      if (err) {
        console.error(err);
        return res
          .status(401)
          .json({ success: false, message: "Invalid token." });
      }

      req.user = decoded;
      // console.log(decoded);
      next();
    });
  },
};
