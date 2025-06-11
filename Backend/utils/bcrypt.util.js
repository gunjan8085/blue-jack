const bcrypt = require("bcryptjs");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { securePassword, comparePassword };
