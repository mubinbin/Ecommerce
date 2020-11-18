const ProductController = require("../controllers/product.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    app.post("/api/products/new", authenticate, ProductController.newProduct);
    app.get("/api/products", ProductController.allProducts);
    app.get("/api/products/:id", ProductController.oneProduct);
    app.delete("/api/products/:id", authenticate, ProductController.deleteProduct);
    app.put("/api/products/:id", authenticate, ProductController.editProduct);
};
