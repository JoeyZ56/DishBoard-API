const express = require("express");
const { auth } = require("./lib/firebaseConfig");
const cors = require("cors");
require("dotenv").config();
const recipeRoute = require("./routes/recipeRoute");
const connectDB = require("./config/mongodb");

connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5002");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Middleware to verify Firebase tokens
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify Firebase token
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Protected route
app.get("/protected", verifyToken, (req, res) => {
  res.send(`Hello, ${req.user.email}!`);
});

app.use("/api/recipes", recipeRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
