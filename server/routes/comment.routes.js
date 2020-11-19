const CommentController = require("../controllers/comment.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    app.post("/api/comments/new", authenticate, CommentController.newComment);
    app.get("/api/comments/:id", CommentController.commentList);
    app.put("/api/comments/:id", authenticate, CommentController.editComment);
    app.delete("/api/comments/:id", authenticate, CommentController.deleteComment);
    app.get("/api/comments", CommentController.allComments);
};