// middlewares/authToken.js
const jwt = require("jsonwebtoken");
const { USER_SECRET, BUSINESS_SECRET } = require("../utils/jwt");

module.exports = {
  authenticateBusinessToken: (req, res, next) => {
    const token = (req.headers["authorization"] || "").split(" ")[1];
    if (!token) return res.status(400).json({ success: false, message: "No token provided." });

    jwt.verify(token, BUSINESS_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ success: false, message: "Invalid token." });
      req.user = decoded;
      req.userId = decoded.userId; // <-- add this for consistency
      next();
    });
  },

  authenticateUserToken: (req, res, next) => {
    const token = (req.headers["authorization"] || "").split(" ")[1];
    if (!token) return res.status(400).json({ success: false, message: "No token provided." });

    jwt.verify(token, USER_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ success: false, message: "Invalid token." });
      req.user = decoded;
      req.userId = decoded.userId; // <-- add this
      next();
    });
  },
};
