const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        product_id: String,
        content: String,
        rating: {
            type: Number,
            default: 0
        },
        reply: Array
    },
    {timestamps: true}
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;