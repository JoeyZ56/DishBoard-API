const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    fileUpload: Buffer,
    ingridients: { type: String, required: true },
    instructions: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
