const Product = require("../models/product.model");

module.exports.newProduct = async(req, res) => {
    try{
        const newProduct = await Product.create(req.body);
        return res.json(newProduct);
    }catch(err){
        return res.json(err);
    }
};

module.exports.allActiveProducts = async(req, res) => {
    try{
        const allActiveProducts = await Product.find({enddate: {$gte: Date.now()}});
        return res.json(allActiveProducts);
    }catch(err){
        return res.json(err);
    }
};

module.exports.allPastProducts = async(req, res) => {
    try{
        const allActiveProducts = await Product.find({enddate: {$lt: Date.now()}});
        return res.json(allActiveProducts);
    }catch(err){
        return res.json(err);
    }
};

module.exports.oneProduct = async(req, res) => {
    try{
        const oneProduct = await Product.findById({_id: req.params.id});
        return res.json(oneProduct);
    }catch(err){
        return res.json(err);
    }
};

module.exports.deleteProduct = async (req, res) => {
    try{
        const result = await Product.deleteOne({_id: req.params.id});
        return res.json(result);
    }catch(err){
        return res.json(err);
    }
};

module.exports.editProduct = async (req, res) => {
    try {
        const editedProduct = await Product.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true});
        return res.json(editedProduct);
    } catch (error) {
        return res.json(error);
    }
};