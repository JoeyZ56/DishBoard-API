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

module.exports = createRecipe;
