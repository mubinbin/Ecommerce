const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.register = async(req, res) => {
    try{
        const userExist = await User.exists({email: req.body.email});
        if(userExist){
            // unique email
            const err = {
                errors:{
                    email:{
                        message:"This email has been registered"
                    }
                }
            }
            throw err;
        }else{
            const newUser = await User.create(req.body);
            const userToken = jwt.sign({
                id: newUser._id
            }, process.env.FIRST_SECRET_KEY);

            res
            .cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json(newUser);
        }
    } catch(err){
        return res.json(err);
    }
};

module.exports.allUsers = async(req, res) => {
    try{
        const allUsers = await User.find();
        return res.json(allUsers);
    }catch(err){
        return res.json(err);
    }
};

module.exports.login = async(req, res) => {
    if(req.body.email.length === 0){
        const err = {
            errors:{
                emailLogin:{
                    message:"Invalid email or password"
                }
            }
        }
        return res.json(err);
    }
    const loggedInUser = await User.findOne({email: req.body.email});

    if(loggedInUser === null){
        const err = {
            errors:{
                emailLogin:{
                    message:"Invalid email or password"
                }
            }
        }
        return res.json(err);
    } 

    const correctPassword = await bcrypt.compare(req.body.password, loggedInUser.password);

    if(!correctPassword){
        const err = {
            errors:{
                emailLogin:{
                    message:"Invalid email or password"
                }
            }
        }
        return res.json(err);
    }

    const userToken = jwt.sign({
        id: loggedInUser._id
    }, process.env.FIRST_SECRET_KEY);

    res
    .cookie("usertoken", userToken, {
        httpOnly: true
    })
    .json({msg: "success!"});
};

module.exports.logout = async(req, res) => {
    res.clearCookie("usertoken");
    res.sendStatus(200);
};

module.exports.oneUser = async(req, res) => {
    try {
        const oneUser = await findById({_id: req.params.id})
        return res.json(oneUser);
    } catch (error) {
        return res.json(error);
    }
};