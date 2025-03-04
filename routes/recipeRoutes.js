const express = require("express");
const {createRecipe} = require("../controllers/recipeController");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post("/", upload.single("fileUpload"), createRecipe);

module.exports = router;
