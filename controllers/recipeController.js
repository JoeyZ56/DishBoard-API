const Recipe = require("../models/recipe");

const createRecipe = async (req, res) => {
  try {
    //debugging
    console.log("Received Files:", req.file);
    if (!req.file) {
      return res.status(400).json({ error: "Image file is missing!" });
    }

    const {
      recipeName,
      courseType,
      cuisineType,
      difficultyLevel,
      estimatedTime,
      servingSize,
      ingredientsList,
      instructions,
      tags,
      createdBy,
    } = req.body;

    // Parse strings back to arrays
    const parsedIngredients = JSON.parse(ingredientsList);
    const parsedInstructions = JSON.parse(instructions);

    const image = req.file;

    const newRecipe = new Recipe({
      recipeName,
      courseType,
      cuisineType,
      difficultyLevel,
      estimatedTime,
      servingSize,
      ingredientsList: parsedIngredients,
      instructions: parsedInstructions,
      image: image.buffer.toString("base64"),
      tags,
      createdBy,
    });

    await newRecipe.save();

    res.status(201).send("Recipe created successfully!");
  } catch (error) {
    console.error("Error Submitting Recipe:", error);
    res
      .status(500)
      .send({ message: "Error Submitting Recipe:", error: error.message });
  }
};

//GET all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error });
  }
};

//get recipes by course Type
const getRecipesByCourseType = async (req, res) => {
  try {
    const { courseType } = req.params;
    const recipes = await Recipe.find({ courseType });

    // Check if recipes are found
    if (!recipes || recipes.length === 0) {
      return res
        .status(400)
        .json({ message: "No recipes found under course type category" });
    } else {
      res.status(200).json(recipes);
    }
  } catch (error) {
    console.error("error fetching recipes by course type:", error);
    res
      .status(500)
      .json({ message: "Error fetching recipes by course type:", error });
  }
};

//GET recipes by cuisine Type
const getRecipesByCuisineType = async (req, res) => {
  try {
    const { cuisineType } = req.params;
    const recipes = await Recipe.find({ cuisineType });

    // Check if recipes are found
    if (!recipes || recipes.length === 0) {
      return res
        .status(400)
        .json({ message: "No recipes found under the cuisine type category" });
    } else {
      res.status(200).json(recipes);
    }
  } catch (error) {
    console.log("Error fetching recipe under cuisine type:", error);
    res
      .status(500)
      .json({ message: "Error fetching recipe under cuisine type:", error });
  }
};

const getRecipeByDifficultyLevel = async (req, res) => {
  try {
    const { difficultyLevel } = req.params;
    const recipes = await Recipe.find({ category: difficultyLevel });

    if (!recipes || recipes.length === 0) {
      return res
        .status(400)
        .json({ message: "No recipes found under this difficulty level" });
    } else {
      res.status(200).json(recipes);
    }
  } catch (error) {
    console.log("Error fetching recipe under this difficulty level:", error);
    res.status(500).json({
      message: "Error fetching recipe under this difficulty level:",
      error,
    });
  }
};
const getRecipeByTags = async (req, res) => {
  try {
    const { tags } = req.params;
    const recipes = await Recipe.find({ category: tags });

    if (!recipes || recipes.length === 0) {
      return res
        .status(400)
        .json({ message: "No recipes found under this tag" });
    } else {
      res.status(200).json(recipes);
    }
  } catch (error) {
    console.log("Error fetching recipe under this tag:", error);
    res.status(500).json({
      message: "Error fetching recipe under this tag:",
      error,
    });
  }
};

// search recipes by name
module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipesByCourseType,
  getRecipesByCuisineType,
  getRecipeByDifficultyLevel,
  getRecipeByTags,
};
