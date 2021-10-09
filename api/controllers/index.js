const { login, signup, verifyRefreshToken } = require("./auth.controller");

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("./user.controller");

module.exports = {
  login,
  signup,
  verifyRefreshToken,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
