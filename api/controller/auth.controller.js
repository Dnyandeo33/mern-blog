import bcryptjs from 'bcryptjs';
import jsw from 'jsonwebtoken';
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

    signIn: async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) return next(errorHandler(400, 'All fields required...'));

        try {
            const isValidUser = await User.findOne({ email });
            if (!isValidUser) return next(errorHandler(400, 'User not found'));

            const { password: pass, ...rest } = isValidUser._doc;

            const isValidPassword = bcryptjs.compareSync(password, isValidUser.password);
            if (!isValidPassword) return next(errorHandler(400, 'Invalid password'));

            const token = jsw.sign({ id: isValidUser._id }, process.env.JWT_SECRET);
            res.status(200).cookie('access_token', token, { httpOnly: true }).json({ success: true, rest });

        } catch (error) {
            next(error);
        }
    },
    signOut: async (req, res) => {
    }
}

export default authController;