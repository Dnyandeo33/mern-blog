import bcryptjs from 'bcryptjs';
import validator from 'validator';
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

const userController = {
    getUser: async (req, res) => {
        const users = await User.find({});
        res.status(200).json({ users })
    },

    // update user 
    updateUser: async (req, res, next) => {
        // get userId from params
        const { userId } = req.params;
        // get user info from body
        const { username, email, profilePic } = req.body;
        // get user from verify token middleware
        const { id } = req.user;

        // compare verify if and params id is the same
        if (id !== userId) return next(errorHandler(400, "Unauthorized"));

        // check user want to update password
        // if yes, then hash the password
        if (req.body.password) {
            // password validation
            if (!validator.isStrongPassword(req.body.password)) return next(errorHandler(400, 'password must be a strong'))
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        // check username validation
        if (username) {
            if (username.length < 7 || username.length > 20) return next(errorHandler(400, 'username must be 7 to 20 character'));
            if (username.includes(' ')) return next(errorHandler(400, 'username cannot contain spaces'));
            if (username !== req.body.username.toLowerCase()) return next(errorHandler(400, 'username must be lowercase'));
            if (!username.match(/^[a-zA-Z0-9]+$/)) return next(errorHandler(400, 'username only contains letters and numbers'));
        }
        // update user
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                // use set for if user want to update only one info
                $set: {
                    username,
                    password: req.body.password,
                    email,
                    profilePic
                }
            }, { new: true });
            const { password, ...rest } = updatedUser._doc;
            res.status(200).json({ success: true, rest })
        } catch (error) {
            next(errorHandler(error))
        }
    }
}
export default userController;