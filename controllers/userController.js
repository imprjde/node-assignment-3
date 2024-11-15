const User = require("../models/user.model.js");
const logger = require("../utils/logger");

//API to Create a new user
const createUser = async (req, res) => {
  logger.info("Create User API called", {
    method: req.method,
    path: req.originalUrl,
    requestBody: req.body,
  });

  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//API to Update an existing user by ID
const updateUser = async (req, res) => {
  logger.info("Update User API called", {
    method: req.method,
    path: req.originalUrl,
    userId: req.params.id,
    requestBody: req.body,
  });

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//API to Get a list of all users
const getUsers = async (req, res) => {
  logger.info("Get Users API called", {
    method: req.method,
    path: req.originalUrl,
  });
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  getUsers,
};
