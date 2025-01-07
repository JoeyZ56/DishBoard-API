const express = require("express");
const router = express.router();
const User = require("../models/userSchema");

//Post api/users = create new user
router.post("/", async (req, res) => {
  const { uid, username, email, password } = req.body;

  try {
    const newUser = new User({ uid, username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating new user", error });
  }
});

module.exports = router;
