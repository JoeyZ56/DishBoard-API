const express = require("express");
const {
  createRecipe,
  getRecipeById,
  getUserRecipes,
  getAllRecipes,
  getRecipesByCourseType,
  getRecipesByCuisineType,
  getRecipeByDifficultyLevel,
  getRecipeByTags,
  updateRecipe,
} = require("../controllers/recipeController");
const upload = require("../middlewares/multer");

const router = express.Router();

/*
 In Express, you can have multiple routes with the same path as long as 
 they use different HTTP methods. 
 So having a POST / for creating a recipe and a GET / for retrieving all recipes 
 is a common pattern and won't cause any conflicts.
*/
router.post("/", upload.single("image"), createRecipe);
router.get("/", getAllRecipes);
router.get("/user-recipes/:id", getUserRecipes);

router.get("/course/:courseType", getRecipesByCourseType);
router.get("/cuisine/:cuisineType", getRecipesByCuisineType);
router.get("/difficulty/:difficultyLevel", getRecipeByDifficultyLevel);
router.get("/tags/:tags", getRecipeByTags);

router.get("/:id", getRecipeById);

router.put("/:id", upload.single("image"), updateRecipe);

module.exports = router;
