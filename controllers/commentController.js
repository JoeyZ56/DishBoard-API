const Comment = require("../models/comment");

const createComment = async (req, res) => {
    try {
        const { uid, rid, comment } = req.body;
    
        const newComment = new Comment({
            uid,
            rid,
            comment,
        });
    
        await newComment.save();
    
        res.status(201).send("Comment created successfully!");
    } catch (error) {
        console.error("Error submitting comment:", error);
        res
        .status(500)
        .send({ message: "Error submitting comment:", error: error.message });
    }
};

// get a comment by id
const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(400).json({ message: "Comment not found" });
        } else {
            res.status(200).json(comment);
        }
    } catch (error) {
        console.error("Error fetching comment by id:", error);
        res.status(500).json({ message: "Error fetching comment by id:", error });
    }
};

// get comments by recipe id
const getCommentsByRecipeId = async (req, res) => {
    try {
        const { rid } = req.params;
        const comments = await Comment.find({ rid });

        if (!comments || comments.length === 0) {
            return res.status(400).json({ message: "No comments found for this recipe" });
        } else {
            res.status(200).json(comments);
        }
    } catch (error) {
        console.error("Error fetching comments by recipe id:", error);
        res.status(500).json({ message: "Error fetching comments by recipe id:", error });
    }
};

// get comments by user id (all comments made by a user)
const getCommentsByUserId = async (req, res) => {
    try {
        const { uid } = req.params;
        const comments = await Comment.find({ uid });

        if (!comments || comments.length === 0) {
            return res.status(400).json({ message: "No comments found for this user" });
        } else {
            res.status(200).json(comments);
        }
    } catch (error) {
        console.error("Error fetching comments by user id:", error);
        res.status(500).json({ message: "Error fetching comments by user id:", error });
    }
};

module.exports = { 
    createComment, 
    getCommentById, 
    getCommentsByRecipeId, 
    getCommentsByUserId 
};
