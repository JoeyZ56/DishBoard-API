const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        // the user who made the comment
        uid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        // the recipe that was commented on
        rid: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe", required: true },
        comment: { type: String, required: true },
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model("Comment", commentSchema);