const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validate = require("../middlewares/validate");
const { newUserValidation } = require("../validations/user.validation");

// POST Routes
router.post("/", validate(newUserValidation), userController.createNewUser);
router.post("/login", userController.loginUser);

module.exports = router;
