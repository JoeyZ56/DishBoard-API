const express = require("express");
require("dotenv").config();
const recipeRoute = require("./routes/recipeRoute");
const connectDB = require("./config/mongodb");

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/recipes", recipeRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
