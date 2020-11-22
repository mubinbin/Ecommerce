const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const port = 8000;
const options = {
    cors:true,
    origin:["*:*"]
};
const Comment = require("./server/models/comment.model");
const Product = require("./server/models/product.model");
require('dotenv').config();

require("./server/config/mongoose.config")
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://3.136.155.200'}));
app.use(express.json(), express.urlencoded({extended: true}));
// routes
require("./server/routes/user.routes")(app);
require("./server/routes/product.routes")(app);
require("./server/routes/comment.routes")(app);

const server = app.listen(port, console.log(`connecting at port ${port}`));

const io = require("socket.io")(server, options);

io.on("connection", socket=> {
    console.log(socket.id);
    // console.log(msg);
    socket.on("createComment", msg=>{
        const comment = new Comment(msg);
        io.emit("sendCommentToClient", comment);
    })
    socket.on("updateProductReview", msg=>{
        const product = new Product(msg);
        io.emit("sendUpdatedProductToClient", product);
    })

});
