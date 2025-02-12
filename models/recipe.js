const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fileUpload: { type: Buffer, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Dessert",
        "Appetizer",
        "Side-Dish",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
