const Recipe = require("../models/recipe");

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, instructions, category } = req.body;
    const image = req.file;

    const newRecipe = new Recipe({
      name,
      ingredients,
      instructions,
      imageUrl: image.buffer,
      category,
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
}

//get recipes by category
const getRecipesByCategory = async (req, res) => {
  try {
    const {category} = req.params;
    const recipes = await Recipe.find({ category: category });

    // Check if recipes are found
    if (!recipes || recipes.length === 0) {
      return res.status(400).json({ message: "No recipes found under this category"})
    } else {
      res.status(200).json(recipes);
    }
  } catch (error) {
    console.error("error fetching recipes by category:", error);
    res.status(500).json({ message: "Error fetching recipes by category", error });S
  }
}

// search recipes by name
module.exports = {createRecipe, getAllRecipes, getRecipesByCategory};
