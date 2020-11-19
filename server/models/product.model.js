const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: String,
        startBid: Number,
        eachBid: Number,
        price: Number,
        image: String,
        desc: String,
        rating: Number,
        numReviews: Number,
        enddate: Date,
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {timestamps:true}
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;