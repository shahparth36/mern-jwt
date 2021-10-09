var express = require("express");
var router = express.Router();

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers");

const { authenticate } = require("../middleware/authenticate");

router.get("/all-users", authenticate, getAllUsers);

router.get("/user/:id", authenticate, getUser);

router.put("/update-user/:id", authenticate, updateUser);

router.delete("/delete-user/:id", authenticate, deleteUser);

module.exports = router;
