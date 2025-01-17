const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { uid, username, email, password } = req.body;

  if (!uid || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    //Check if User exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    //Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create and save new User
    const newUser = new User({
      uid,
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    //Exclude password from response
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json({
      message: "User has been created successfully!",
      user: userWithoutPassword,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
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

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to find user", error: error.message });
  }
};

//Update User
const updateUser = async (req, res) => {
  const { uid } = req.params;
  const updateData = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate({ uid }, updateData, {
      new: true, // Return the updated document
      runValidators: true, //Ensures validation is ran for updated fields
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "Can not find user to update" });
    }

    const { password: _, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json({
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Cannot update user!", error: error.message });
  }
};

//Delete User
const deleteUser = async (req, res) => {
  const { uid } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ uid });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully!", user: deletedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

module.exports = { createUser, getUserByUid, updateUser, deleteUser };
