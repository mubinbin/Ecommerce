const UserController = require("../controllers/user.controller");
const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    app.post("/api/users/register", UserController.register);
    app.get("/api/users", authenticate, UserController.allUsers);
    app.post("/api/login", UserController.login);
    app.get("/api/logout", UserController.logout);
    app.get("/api/users/:id", authenticate, UserController.oneUser);
};
