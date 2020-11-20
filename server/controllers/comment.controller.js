const Comment = require("../models/comment.model");

module.exports.newComment = async(req, res) => {
    try {
        const newComment = await Comment.create(req.body);
        return res.json(newComment);
    } catch (error) {
        return res.json(error);
    }
};

module.exports.deleteComment = async(req, res) => {
    try{
        const result = await Comment.deleteOne({_id:req.params.id});
        return res.json(result);
    }catch(err){
        return res.json(err);
    }
};

module.exports.editComment = async (req, res) => {
    try {
        const editedComment = await Comment.findOneAndUpdate({_id: req.params.id}, req.body, {new:true});
        return res.json(editedComment);
    } catch (error) {
        return res.json(error);
    }
};

module.exports.commentList = async (req, res) => {
    try {
        const someComments = await Comment.find({product_id: req.params.id}).sort({createdAt: 1});
        return res.json(someComments);
    } catch (error) {
        return res.json(error);
    }
};

module.exports.allComments = async (req, res) => {
    try {
        const allComments = await Comment.find();
        return res.json(allComments);
    } catch (error) {
        return res.json(error);
    }
};