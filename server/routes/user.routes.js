const UserController = require("../controllers/user.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    app.post("/api/users/register", UserController.register);
    app.get("/api/users", UserController.allUsers);
    app.post("/api/login", UserController.login);
    app.get("/api/logout", UserController.logout);
    app.get("/api/users/:id", UserController.oneUser);
    app.delete("/api/users/:id", UserController.deleteUser);
};
