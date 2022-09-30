const { userModel } = require("../models/users");

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addUser = async (req, res, next) => {
  const { username, password, email } = req.body;

  const user = new userModel({
    username,
    password,
    email,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  addUser,
};
