const Recipe = require("../models/recipe");

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;
    const image = req.file;

    const newRecipe = new Recipe({
      name,
      ingredients,
      instructions,
      imageUrl: `/uploads/${image.filename}`,
    });

    await newRecipe.save();

    res.status(201).send("Recipe created successfully!");
  } catch (error) {
    console.error("Its burning! Its all burning!!!", error);
    res.status(500).send("Something is freaking broken in the controller!");
  }
};

module.exports = createRecipe;
