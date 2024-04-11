import bcryptjs from 'bcryptjs';
import validator from "validator";
import User from "../models/user.model.js";
import { errorHandler } from '../utils/error.js';

const authController = {
    signUp: async (req, res, next) => {
        try {
            const { username, email, password } = req.body
            const existUsername = await User.findOne({ username })
            const existEmail = await User.findOne({ email });

            if (existUsername) next(errorHandler(403, 'Username already exist, please try different'));
            if (existEmail) next(errorHandler(403, 'Email already exist...'));

            if (!username || !email || !password) next(errorHandler(400, 'All fields required'));
            if (!validator.isEmail(email)) next(errorHandler(400, 'Email must be valid'));

            if (!validator.isStrongPassword(password)) {
                next(errorHandler(400, 'Password must be strong'));
            } else {
                const hashPassword = await bcryptjs.hash(password, 10);
                const newUser = await User.create({
                    username,
                    email,
                    password: hashPassword
                })
                return res.status(201).json({ success: true, message: 'user created successfully..' });
            }
        } catch (error) {
            next(error);
        }
    },

    signIn: async (req, res) => {
    },
    signOut: async (req, res) => {
    }
}

export default authController;