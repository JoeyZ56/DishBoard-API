const express = require("express");
const { auth, signInWithEmailAndPassword } = require("../lib/firebaseConfig");
const { adminAuth } = require("../lib/firebaseConfig");
const User = require("../models/user");
const router = express.Router();

//Create a new user in MongoDB
router.post("/", async (req, res) => {
  const { uid, username, email } = req.body;

  if (!uid || !username || !email) {
    return res.status(400).json({ message: "All feilds are required!" });
  }

  try {
    // Checks if User exists already
    let existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Save User to mongoDB
    const newUser = new User({ uid, username, email });
    await newUser.save();

    res
      .status(200)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log("Error creating User", error.message);
    res
      .status(500)
      .json({ message: "Failed to create new User", error: error.message });
  }
});

//Verify Firebase Tokens on Protected Routes
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided!" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token!" });
  }
};

//Protect sensitive Routes
router.get("/profile", verifyToken, async (req, res) => {
  const { uid } = req.user;
  const user = await User.findOne({ uid });

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  res.status(200).json(user);
});

//Login with Email and Password
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();
    res.status(200).json({ token, user: user.uid, email: user.email });
  } catch (error) {
    console.error("Failed to process request:", error.message);
    res.status(400).json({ message: error.message || "Invalid credentials" });
  }
});

// Google Sign-In
router.post("/google-login", async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({ uid, email });
      await user.save();
      return res
        .status(201)
        .json({ message: "Google sign-in successful", user });
    }
    res.status(200).json({ message: "User already exists!", user });
  } catch (error) {
    console.error("Error verifying Google sign-in:", error.message);
    res
      .status(404)
      .json({ message: "Invalid Google sign-in", error: error.message });
  }
});

module.exports = router;
