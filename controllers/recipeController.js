const Recipe = require("../models/recipe");
const User = require("../models/user");
const mongoose = require("mongoose");

const createRecipe = async (req, res) => {
  try {
    // Debugging image upload
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
      createdBy, // this is the Firebase UID (string)
    } = req.body;

    // Look up the user by Firebase UID
    const user = await User.findOne({ uid: createdBy });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Parse strings back to arrays
    const parsedIngredients = JSON.parse(ingredientsList);
    const parsedInstructions = JSON.parse(instructions);
    const parsedTags = tags ? JSON.parse(tags) : [];

    const image = req.file;

    // Use user's Mongo `_id` as createdBy
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
      tags: parsedTags,
      createdBy: user._id, // use ObjectId
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
    const recipes = await Recipe.find()
      .sort({ createdAt: -1 }) //Sort by newest first
      .populate("createdBy", "username");
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error });
  }
};

const getUserRecipes = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ uid: id });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const userRecipes = await Recipe.find({ createdBy: user._id });
    res.status(200).json({ userRecipes });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get user recipes",
      error: error.message,
    });
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
    const recipes = await Recipe.find({ difficultyLevel }); ////query matches the schema "difficultyLevel"

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
    const recipes = await Recipe.find({ tags: tags }); //query matches the schema "tags"

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

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id).populate("createdBy", "username");

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe by id", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const update = { ...req.body };

    //Parse arrays that were sent as JSON strings
    if (update.ingredientsList) {
      update.ingredientsList = JSON.parse(update.ingredientsList);
    }

    if (update.instructions) {
      update.instructions = JSON.parse(update.instructions);
    }

    if (update.tags) {
      update.tags = JSON.parse(update.tags);
    }

    //Handle image if sent
    if (req.file) {
      update.image = req.file.buffer.toString("base64");
    }

    //Removed the createdBy from the update process, leaving the existing one untouched
    if ("createdBy" in update) {
      delete update.createdBy;
    }

    const updateRecipe = await Recipe.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updateRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(updateRecipe);
  } catch (error) {
    console.error("Error updating recipe", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// search recipes by name
module.exports = {
  createRecipe,
  getAllRecipes,
  getUserRecipes,
  getRecipesByCourseType,
  getRecipesByCuisineType,
  getRecipeByDifficultyLevel,
  getRecipeByTags,
  getRecipeById,
  updateRecipe,
};
