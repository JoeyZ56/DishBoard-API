const express = require("express");
const { auth } = require("./firebase/firebaseConfig");
const cors = require("cors");
require("dotenv").config();
const recipeRoute = require("./routes/recipeRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./lib/mongodb");

connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

const allowOrigins = [
  process.env.CLIENT_URL || "http://localhost:5002",
  "http://127.0.0.1:5002", // Keep both in case your client is using either format
];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//Handle preflight requests
app.options("*", cors());

//Middleware to parse JSON
app.use(express.json());

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

app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

//API route url "/api/___"
app.use("/api/recipes", recipeRoute);

app.use("/api/users", userRoutes);

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running on 127.0.0.1:${PORT}`);
});
