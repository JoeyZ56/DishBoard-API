const User = require("../models/user");

const createUser = async (req, res) => {
  const { uid, username, email } = req.body;

  if (!uid || !username || !email) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    //Check if User exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    //Create and save new User
    const newUser = new User({
      uid,
      username,
      email,
    });

    await newUser.save();

    res.status(201).json({
      message: "User has been created successfully!",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
      stack: error.stack,
    });
  }
};

//Get User by uid
const getUserByUid = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({
      message: "Failed to find user",
      error: error.message,
      stack: error.stack,
    });
  }
};

//Update User
const updateUser = async (req, res) => {
  const { uid } = req.user;
  const updateData = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate({ uid }, updateData, {
      new: true, // Return the updated document
      runValidators: true, //Ensures validation is ran for updated fields
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "Can not find user to update" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot update user!",
      error: error.message,
      stack: error.stack,
    });
  }
};

//Update Username
const updateUsername = async (req, res) => {
  console.log("[updateUsername] Endpoint hit √");
  console.log("params:", req.params);
  console.log("body:", req.body);

  const { uid } = req.params;
  const { username } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { username },
      { new: true }
    );

    if (!updatedUser) {
      console.log("User not found in UID:", uid);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Username updated:", updateUser.username);
    res.status(200).json({ message: "Username updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating username;", error.massage);
    res
      .status(500)
      .json({ message: "Error updating username", error: error.message });
  }
};

//Delete User
const deleteUser = async (req, res) => {
  const { uid } = req.user;

  try {
    const deletedUser = await User.findOneAndDelete({ uid });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully!", user: deletedUser });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user",
      error: error.message,
      stack: error.stack,
    });
  }
};

module.exports = {
  createUser,
  getUserByUid,
  updateUser,
  updateUsername,
  deleteUser,
};
