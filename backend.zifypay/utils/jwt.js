// utils/jwt.js
const jwt = require("jsonwebtoken");
const { TOKENS } = require("../configs/constants.config");

const USER_SECRET = process.env.JWT_USER_SECRET || TOKENS?.USER?.SECRET || "fallback-user-secret";
const BUSINESS_SECRET = process.env.JWT_BUSINESS_SECRET || TOKENS?.BUSINESS?.SECRET || "fallback-biz-secret";

function signUserJWT(payload, opts = { expiresIn: "7d" }) {
  return jwt.sign(payload, USER_SECRET, opts);
}
function verifyUserJWT(token, cb) {
  return jwt.verify(token, USER_SECRET, cb);
}

module.exports = { signUserJWT, verifyUserJWT, USER_SECRET, BUSINESS_SECRET };
