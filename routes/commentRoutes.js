const express = require("express");
const {
  createComment,
  getCommentById,
  getCommentsByRecipeId,
  getCommentsByUserId,
} = require("../controllers/commentController");

const router = express.Router();

router.post("/", createComment);
router.get("/:id", getCommentById);
router.get("/recipe/:rid", getCommentsByRecipeId);
router.get("/user/:uid", getCommentsByUserId);

module.exports = router;