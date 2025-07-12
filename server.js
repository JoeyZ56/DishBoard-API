const express = require("express");
const verifyToken = require("./firebase/firebaseAuth");
const cors = require("cors");
require("dotenv").config();
const recipeRoute = require("./routes/recipeRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./lib/mongodb");

connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

const allowOrigins = [
  ...(process.env.CLIENT_URL ? [process.env.CLIENT_URL] : []), //ensures undefined doesn’t end up in the array if CLIENT_URL is missing
  "http://localhost:5002", // For OS
  "http://127.0.0.1:5002", //For Linux
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
