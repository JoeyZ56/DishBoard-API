const express = require("express");
const {
  createRecipe,
  getRecipeById,
} = require("../controllers/recipeController");
const upload = require("../middlewares/multer");
const Recipe = require("../models/recipe");

const router = express.Router();

router.post("/", upload.single("image"), createRecipe);

router.get("/", async (req, res) => {
  const recipe = await Recipe.find();
  res.json(recipe);
});

router.get("/:id", getRecipeById);

module.exports = router;
