const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        content: String,
        rating: {
            type: Number,
            default: 0
        },
        _creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {timestamps: true}
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;