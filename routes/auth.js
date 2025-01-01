const express = require("express");
const {
  auth,
  signWithEmailAndPassword,
  googleProvider,
} = require("../lib/firebaseConfig");
const { signInPopup } = require("firebase/auth");
const router = express.Router();

//Login with Email and Password
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error signing in with email/password:", error.message);
    res.status(401).json({ message: error.message });
  }
});

// Google Sign-In
router.post("/google-login", async (req, res) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const token = await user.getIdToken();
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
    res.status(401).json({ message: error.message });
  }
});

module.export = router;
