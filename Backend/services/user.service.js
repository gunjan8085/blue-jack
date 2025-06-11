const User = require("../models/user.model");
const ApiError = require("../utils/apiError.util");
const { comparePassword } = require("../utils/bcrypt.util");

module.exports = {
  createNewUser: async (userData, role) => {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new ApiError(409, "Email already exists.");
      }
      let newUser = new User(userData);

      return await newUser.save();
    } catch (error) {
      throw new ApiError(500, error.message, error);
    }
  },

  loginUser: async (email, password) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        //throw new ApiError(401, "Invalid email or password.");
        return null;
      }
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password.");
      }
      return user;
    } catch (error) {
      throw new ApiError(500, error.message, error);
    }
  },
};
