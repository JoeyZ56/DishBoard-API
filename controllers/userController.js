const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { uid, username, email, password } = req.body;

  try {
    //Check if User exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //Create and save new User
    const newUser = new User({
      uid,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User has been created successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to create user", error: error.message });
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
    req.status(200).json(user);
  } catch (error) {}
};

//Update User
const updateUser = async (req, res) => {
  const update = await User.FIndAndUpdate({ email });
  
  try {

  } catch (error) {}
};

//Delete User
const deleteUser = async (req, res) => {
  const delete = await User.Delete({email});
  
}

module.exports = { createUser, getUserByUid, updateUser, deleteUser };
