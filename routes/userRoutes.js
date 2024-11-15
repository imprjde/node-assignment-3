const express = require("express");
const {
  createUser,
  updateUser,
  getUsers,
} = require("../controllers/userController.js");

const router = express.Router();

// Below code defines the Routes for the API's
router.post("/", createUser);
router.put("/:id", updateUser);
router.get("/", getUsers);

module.exports = router;
