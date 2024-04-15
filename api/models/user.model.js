import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'username must be provided'],
        unique: true
    },
    email: {
        type: String,
        require: [true, 'email must be provided'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'password must be provided']
    },
    profilePic: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }

}, { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User