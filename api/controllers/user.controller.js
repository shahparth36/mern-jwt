const { User } = require("../models");

function getAllUsers(req, res, next) {
  User.find({}, (err, users) => {
    if (err)
      next({
        type: "Internal Server Error",
        message: err.message,
        statusCode: 500,
      });
    else return res.status(200).json(users);
  });
}

function getUser(req, res, next) {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err)
      next({
        type: "Internal Server Error",
        message: err.message,
        statusCode: 500,
      });
    else return res.status(200).json(user);
  });
}

// can perform functionality of editnotes and editmeet controllers
function updateUser(req, res, next) {
  const { id } = req.params;
  const updateUserDetails = req.body;
  User.findByIdAndUpdate(id, updateUserDetails, (err, updatedUser) => {
    if (err)
      next({
        type: "Internal Server Error",
        message: err.message,
        statusCode: 500,
      });
    else {
      req.user = updatedUser;
      return res.status(200).json(updatedUser);
    }
  });
}

function deleteUser(req, res, next) {
  const { id } = req.params;
  User.findByIdAndDelete(id, (err, deletedUser) => {
    if (err)
      next({
        type: "Internal Server Error",
        message: err.message,
        statusCode: 500,
      });
    else return res.status(200).json(deletedUser);
  });
}

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
