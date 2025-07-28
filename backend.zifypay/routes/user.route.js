const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const validate = require("../middlewares/validate");
const { newUserValidation } = require("../validations/user.validation");

// POST Routes
router.post("/signup", userController.createNewUser);
router.post("/login", userController.loginUser);
router.post("/forgot-password", userController.requestPasswordReset);
router.post("/verify-otp", userController.verifyPasswordResetOTP);
router.post("/reset-password", userController.resetPassword);
router.patch("/update-profile/:userId",  userController.updateUserProfile);
router.delete("/delete-profile/:userId", userController.deleteUserProfile);
// GET Routes
router.get("/profile", userController.getUserProfile);
module.exports = router;



