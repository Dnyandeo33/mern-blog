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
    }
}, { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User