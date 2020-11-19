const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please enter a user name"],
        minlength: [3, "User name needs to be at least 3 characters"]
    },

    email:{
        type:String,
        required:[true, "Please enter an email address"],
        // email validator
        validate:{
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email address"
        },
    },

    password:{
        type:String,
        required: [true, "Password is required"],
        minlength: [8, "Password needs to be at least 8 characters"]
    },
},
{timestamps: true});

// confirm password
UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);
// middleware "pre hook" to check if confirmPasswod and password match
UserSchema.pre("validate", function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Password must match confirm password");
    }
    next();
});

UserSchema.pre("save", function(next){
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
// module.exports = UserSchema;
