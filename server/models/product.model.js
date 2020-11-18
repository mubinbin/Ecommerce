const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: String,
        price: Number,
        image: String,
        desc: String,
        rating: Number,
        numReviews: Number
    },
    {timestamps:true}
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;