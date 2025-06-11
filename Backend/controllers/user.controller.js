const userService = require("../services/user.service");
const { generateToken } = require("../utils/token.util");
const { securePassword } = require("../utils/bcrypt.util");

module.exports = {
  createNewUser: async (req, res) => {
    try {
      req.body.password = await securePassword(req.body.password);

      const newUser = await userService.createNewUser(req.body);

      if (newUser) {
        const token = generateToken(newUser._id, "User");

        return res.status(201).json({
          data: {
            user: newUser,
            token: token,
          },
          success: true,
          message: "Added new user",
        });
      }
    } catch (error) {
      console.error(error);
      const message = error.message || "Internal Server Error";
      res.status(500).json({ message: message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email, password);
      if (result === null) {
        return res.status(201).json({
          success: true,
          message: "User not found",
        });
      }
      const token = generateToken(result._id, "User");
      return res.status(200).json({
        data: { user: result, token: token },
        success: true,
        message: "Logged in successfully",
      });
    } catch (error) {
      console.error(error);
      const message = error.message || "Internal Server Error";
      res.status(500).json({ message: message });
    }
  },
};
